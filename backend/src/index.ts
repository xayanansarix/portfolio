import type { Core } from '@strapi/strapi';
import { seedContent } from './bootstrap-seed';

/**
 * Grants the given actions to the public role for each API, without
 * duplicating permissions that already exist. Safe to run on every boot.
 */
async function setPublicPermissions(
  strapi: Core.Strapi,
  permissionsByApi: Record<string, string[]>
) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const existing = await strapi.query('plugin::users-permissions.permission').findMany({
    where: { role: publicRole.id },
  });
  const existingActions = new Set(existing.map((p: { action: string }) => p.action));

  const toCreate: Array<Promise<unknown>> = [];
  for (const [api, actions] of Object.entries(permissionsByApi)) {
    for (const action of actions) {
      const fullAction = `api::${api}.${api}.${action}`;
      if (existingActions.has(fullAction)) continue;
      toCreate.push(
        strapi.query('plugin::users-permissions.permission').create({
          data: { action: fullAction, role: publicRole.id },
        })
      );
    }
  }

  await Promise.all(toCreate);
}

type LeetCodeCache = {
  at: number;
  body: Record<string, unknown>;
};

const leetcodeCache = new Map<string, LeetCodeCache>();
const LEETCODE_TTL_MS = 10 * 60 * 1000;

async function fetchLeetCodeStats(username: string) {
  const query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        topPercentage
        attendedContestsCount
      }
    }
  `;

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
    },
    body: JSON.stringify({
      query,
      variables: { username },
      operationName: 'userProblemsSolved',
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode responded with ${response.status}`);
  }

  const json = (await response.json()) as {
    data?: {
      matchedUser?: {
        username: string;
        profile?: { ranking?: number | null; reputation?: number | null };
        submitStatsGlobal?: {
          acSubmissionNum?: Array<{ difficulty: string; count: number }>;
        };
      } | null;
      userContestRanking?: {
        rating?: number | null;
        globalRanking?: number | null;
        topPercentage?: number | null;
        attendedContestsCount?: number | null;
      } | null;
    };
    errors?: unknown;
  };

  const user = json.data?.matchedUser;
  if (!user) {
    return { found: false as const, username };
  }

  const counts = Object.fromEntries(
    (user.submitStatsGlobal?.acSubmissionNum ?? []).map((row) => [
      row.difficulty.toLowerCase(),
      row.count,
    ])
  );

  return {
    found: true as const,
    username: user.username,
    ranking: user.profile?.ranking ?? null,
    reputation: user.profile?.reputation ?? null,
    totalSolved: counts.all ?? 0,
    easySolved: counts.easy ?? 0,
    mediumSolved: counts.medium ?? 0,
    hardSolved: counts.hard ?? 0,
    contestRating: json.data?.userContestRanking?.rating ?? null,
    contestRanking: json.data?.userContestRanking?.globalRanking ?? null,
    contestTopPercentage: json.data?.userContestRanking?.topPercentage ?? null,
    contestsAttended: json.data?.userContestRanking?.attendedContestsCount ?? null,
    profileUrl: `https://leetcode.com/u/${user.username}/`,
    fetchedAt: new Date().toISOString(),
  };
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.routes([
      {
        method: 'GET',
        path: '/api/leetcode/:username',
        handler: async (ctx) => {
          const username = String(ctx.params.username ?? '')
            .trim()
            .replace(/^@/, '');

          if (!username || !/^[a-zA-Z0-9_-]{1,40}$/.test(username)) {
            ctx.status = 400;
            ctx.body = { error: 'Invalid LeetCode username' };
            return;
          }

          const cached = leetcodeCache.get(username.toLowerCase());
          if (cached && Date.now() - cached.at < LEETCODE_TTL_MS) {
            ctx.body = cached.body;
            return;
          }

          try {
            const body = await fetchLeetCodeStats(username);
            leetcodeCache.set(username.toLowerCase(), { at: Date.now(), body });
            ctx.body = body;
          } catch (error) {
            strapi.log.warn(
              `LeetCode fetch failed for ${username}: ${
                error instanceof Error ? error.message : String(error)
              }`
            );
            ctx.status = 502;
            ctx.body = { error: 'Unable to fetch LeetCode stats right now' };
          }
        },
        config: { auth: false },
      },
    ]);
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi, {
      about: ['find'],
      skill: ['find', 'findOne'],
      experience: ['find', 'findOne'],
      project: ['find', 'findOne'],
      education: ['find', 'findOne'],
      certification: ['find', 'findOne'],
      message: ['create'],
    });

    await seedContent(strapi);
  },
};
