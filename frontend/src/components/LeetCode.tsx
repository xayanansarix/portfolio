import { ArrowUpRight, Code2 } from "lucide-react";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/Motion";
import { useStrapiData } from "@/hooks/use-strapi-data";
import { getLeetCodeStats } from "@/lib/leetcode";
import type { About } from "@/lib/strapi";

interface LeetCodeProps {
  about?: About | null;
}

function formatNumber(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "—";
  return value.toLocaleString("en-IN");
}

export function LeetCode({ about }: LeetCodeProps) {
  const username =
    about?.leetcodeUsername?.trim() ||
    import.meta.env.VITE_LEETCODE_USERNAME?.trim() ||
    "";

  const { data, loading, error } = useStrapiData(
    () => (username ? getLeetCodeStats(username) : Promise.resolve(null)),
    [username],
  );

  if (!username) return null;

  const difficulties = [
    { label: "Easy", value: data?.easySolved, color: "text-emerald-400" },
    { label: "Medium", value: data?.mediumSolved, color: "text-amber-300" },
    { label: "Hard", value: data?.hardSolved, color: "text-rose-400" },
  ];

  return (
    <section id="leetcode" className="py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
            <Code2 className="size-3.5" />
            Live LeetCode
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Problem Solving <span className="text-gradient">Stats</span>
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Pulled live from LeetCode for @{username}.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border border-line bg-panel/80 p-6 sm:p-8">
            {loading && (
              <p className="text-center text-sm text-muted">Loading live stats…</p>
            )}

            {!loading && (error || !data) && (
              <div className="text-center">
                <p className="text-sm text-muted">
                  Couldn’t load live stats right now. You can still open the profile.
                </p>
                <a
                  href={`https://leetcode.com/u/${username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-cyan-bright"
                >
                  View on LeetCode
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            )}

            {!loading && data && (
              <>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      Total Solved
                    </p>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-2 text-5xl font-bold text-white"
                    >
                      {formatNumber(data.totalSolved)}
                    </motion.p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-muted">Global ranking</p>
                    <p className="mt-1 text-lg font-semibold text-cyan">
                      #{formatNumber(data.ranking)}
                    </p>
                    {data.contestRating != null && (
                      <p className="mt-1 text-xs text-muted">
                        Contest rating {Math.round(data.contestRating)}
                      </p>
                    )}
                  </div>
                </div>

                <Stagger className="mt-8 grid grid-cols-3 gap-3">
                  {difficulties.map((item, i) => (
                    <StaggerItem key={item.label} index={i}>
                      <div className="rounded-xl border border-line bg-ink-soft/60 px-3 py-4 text-center">
                        <p className={`text-2xl font-bold ${item.color}`}>
                          {formatNumber(item.value)}
                        </p>
                        <p className="mt-1 text-xs text-muted">{item.label}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <p className="text-xs text-muted">
                    Updates automatically · cached ~10 min
                  </p>
                  <a
                    href={data.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-2 text-sm font-medium text-cyan transition hover:bg-cyan/20"
                  >
                    Open profile
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
