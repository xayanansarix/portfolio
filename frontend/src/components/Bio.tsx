import { CheckCircle2 } from "lucide-react";
import { milestones as fallbackMilestones } from "@/data/content";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/Motion";
import { useStrapiData } from "@/hooks/use-strapi-data";
import {
  formatEducationScore,
  formatMonthYearRange,
  formatYearRange,
  getEducation,
  getExperiences,
} from "@/lib/strapi";

interface Milestone {
  period: string;
  title: string;
  org: string;
  description: string;
}

export function Bio() {
  const { data: education } = useStrapiData(getEducation, []);
  const { data: experiences } = useStrapiData(getExperiences, []);

  const fromStrapi: Milestone[] = [];

  if (education?.length) {
    for (const edu of education) {
      fromStrapi.push({
        period: formatYearRange(edu.startDate, edu.endDate),
        title: edu.degree,
        org: (() => {
          const score = formatEducationScore(edu);
          return score ? `${edu.institution} (${score})` : edu.institution;
        })(),
        description:
          edu.coursework
            ? `Coursework includes ${edu.coursework}.`
            : "Academic foundation in computer science and engineering.",
      });
    }
  }

  if (experiences?.length) {
    for (const exp of experiences) {
      fromStrapi.push({
        period: formatMonthYearRange(exp.startDate, exp.endDate, exp.isCurrent),
        title: exp.role,
        org: exp.company,
        description:
          exp.description ??
          "Hands-on engineering work across modern web technologies.",
      });
    }
  }

  const items = fromStrapi.length ? fromStrapi : fallbackMilestones;

  return (
    <section id="bio" className="py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-medium text-violet">
            Academic & Journey
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Education & <span className="text-gradient">Experience</span>
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            My academic path and engineering milestones so far.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <StaggerItem key={`${item.title}-${i}`} index={i}>
              <motion.article
                whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.4)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex h-full flex-col rounded-2xl border border-line bg-panel/80 p-6"
              >
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex w-fit rounded-full bg-cyan/15 px-2.5 py-1 text-[11px] font-semibold text-cyan"
                >
                  {item.period}
                </motion.span>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <h4 className="mt-2 text-sm font-medium text-violet">{item.org}</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
                  <span>Milestone #{i + 1}</span>
                  <span className="inline-flex items-center gap-1 text-cyan">
                    <CheckCircle2 className="size-3.5" /> Verified
                  </span>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
