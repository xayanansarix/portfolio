import { FolderGit2 } from "lucide-react";
import { projects as fallbackProjects } from "@/data/content";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/Motion";
import { useStrapiData } from "@/hooks/use-strapi-data";
import { getMediaUrl, getProjects, techList } from "@/lib/strapi";

const fallbackImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
];

export function Projects() {
  const { data: fetched } = useStrapiData(getProjects, []);

  const projects =
    fetched?.length
      ? fetched.map((project, i) => {
          const tags = techList(project.technologies);
          return {
            title: project.title,
            blurb: project.description ?? "",
            tags,
            badge: project.featured ? "Featured" : "Project",
            metric: project.impact?.split(/[.!]/)[0] ?? (project.featured ? "Featured work" : "Case study"),
            image: getMediaUrl(project.coverImage) ?? fallbackImages[i % fallbackImages.length],
            details: project.demoUrl || project.repoUrl || "#contact",
            repoUrl: project.repoUrl,
            key: project.documentId,
          };
        })
      : fallbackProjects.map((p, i) => ({ ...p, key: `fallback-${i}`, repoUrl: null as string | null }));

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-medium text-violet">
            Featured Work
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Projects <span className="text-gradient">Showcase</span>
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Internship and personal systems work — click any card for details.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const visibleTags = project.tags.slice(0, 3);
            const extra = project.tags.length - visibleTags.length;

            return (
              <StaggerItem key={project.key} index={i}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-panel/80 shadow-[0_0_0_1px_rgba(34,211,238,0.04)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan/30 via-transparent to-violet/30 blur-sm" />
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

                    <span className="absolute left-3 top-3 rounded-full border border-cyan/40 bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-cyan backdrop-blur">
                      {project.badge}
                    </span>

                    <span className="absolute right-3 top-3 max-w-[55%] truncate rounded-full border border-cyan/35 bg-ink/70 px-2.5 py-1 text-[11px] font-medium text-cyan-bright backdrop-blur cyan-glow">
                      {project.metric}
                    </span>
                  </div>

                  <div className="relative p-5 sm:p-6">
                    <h3 className="text-lg font-semibold text-white transition group-hover:text-cyan-bright">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                      {project.blurb}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {visibleTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-cyan/25 bg-cyan/5 px-2 py-1 text-xs font-medium text-cyan"
                        >
                          {tag}
                        </span>
                      ))}
                      {extra > 0 && (
                        <span className="rounded-md border border-line px-2 py-1 text-xs text-muted">
                          +{extra}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <a
                        href={project.details}
                        target={project.details.startsWith("http") ? "_blank" : undefined}
                        rel={project.details.startsWith("http") ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-1 text-sm font-medium text-cyan transition group-hover:gap-2"
                      >
                        View Full Details
                        <motion.span
                          aria-hidden
                          animate={{ x: [0, 3, 0] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          ›
                        </motion.span>
                      </a>
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-line p-2 text-muted transition hover:border-cyan/40 hover:text-cyan"
                          aria-label="Source repository"
                        >
                          <FolderGit2 className="size-4" />
                        </a>
                      ) : (
                        <span className="rounded-lg border border-line p-2 text-muted transition group-hover:border-cyan/40 group-hover:text-cyan">
                          <FolderGit2 className="size-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
