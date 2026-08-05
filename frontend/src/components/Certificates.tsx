import { ArrowUpRight, Award } from "lucide-react";
import { certificates } from "@/data/content";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/Motion";

export function Certificates() {
  return (
    <section id="certificates" className="py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
            Credentials
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Licenses & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Formal learning across web development, machine learning, and professional ethics.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => {
            const body = (
              <>
                <motion.span
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(34,211,238,0)",
                      "0 0 18px rgba(34,211,238,0.35)",
                      "0 0 0 rgba(34,211,238,0)",
                    ],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.2 }}
                  className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-violet text-ink"
                >
                  <Award className="size-5" />
                </motion.span>
                <h3 className="mt-4 text-sm font-semibold leading-snug text-white">{cert.title}</h3>
                <p className="mt-2 text-sm text-violet">{cert.provider}</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="text-xs text-muted">{cert.issued}</p>
                  {cert.href ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan">
                      View <ArrowUpRight className="size-3.5" />
                    </span>
                  ) : null}
                </div>
              </>
            );

            return (
              <StaggerItem key={cert.title} index={i}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="h-full rounded-2xl border border-line bg-panel/80 p-5"
                >
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block h-full outline-none"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </motion.article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
