export interface LeetCodeStats {
  found: boolean;
  username: string;
  ranking: number | null;
  reputation: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  contestRating: number | null;
  contestRanking: number | null;
  contestTopPercentage: number | null;
  contestsAttended: number | null;
  profileUrl: string;
  fetchedAt: string;
}

const ALFA_API = "https://alfa-leetcode-api.onrender.com";

export async function getLeetCodeStats(
  username: string,
): Promise<LeetCodeStats | null> {
  const clean = username.trim().replace(/^@/, "");
  if (!clean) return null;

  const [profileRes, solvedRes] = await Promise.all([
    fetch(`${ALFA_API}/${encodeURIComponent(clean)}`),
    fetch(`${ALFA_API}/${encodeURIComponent(clean)}/solved`),
  ]);

  if (!profileRes.ok || !solvedRes.ok) return null;

  const profile = (await profileRes.json()) as {
    username?: string;
    ranking?: number;
    reputation?: number;
  };
  const solved = (await solvedRes.json()) as {
    solvedProblem?: number;
    easySolved?: number;
    mediumSolved?: number;
    hardSolved?: number;
  };

  if (!profile.username && solved.solvedProblem == null) return null;

  return {
    found: true,
    username: profile.username ?? clean,
    ranking: profile.ranking ?? null,
    reputation: profile.reputation ?? null,
    totalSolved: solved.solvedProblem ?? 0,
    easySolved: solved.easySolved ?? 0,
    mediumSolved: solved.mediumSolved ?? 0,
    hardSolved: solved.hardSolved ?? 0,
    contestRating: null,
    contestRanking: null,
    contestTopPercentage: null,
    contestsAttended: null,
    profileUrl: `https://leetcode.com/u/${profile.username ?? clean}/`,
    fetchedAt: new Date().toISOString(),
  };
}
