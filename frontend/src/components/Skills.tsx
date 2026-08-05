import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Braces, Code2, Database, Terminal, Wrench } from "lucide-react";
import { skillGroups, type SkillCategory } from "@/data/content";
import { Reveal, motion } from "@/components/Motion";

const icons = [Code2, Braces, Terminal, Database, Wrench];
const categories = Object.keys(skillGroups) as SkillCategory[];

function Ring({ level }: { level: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (level / 100) * c;
  return (
    <svg width="48" height="48" className="-rotate-90">
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="4" />
      <motion.circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </svg>
  );
}

export function Skills() {
  const [active, setActive] = useState<SkillCategory>("Languages");
  const skills = skillGroups[active];

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
            Technical Proficiency
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Core <span className="text-gradient">Skills & Stack</span>
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Languages, frameworks, and tools I use to build secure, modern applications.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap justify-center gap-2" delay={0.1}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === cat
                  ? "bg-cyan text-ink cyan-glow"
                  : "border border-line bg-panel text-slate-300 hover:border-cyan/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {skills.map((skill, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.4)" }}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-panel/80 p-4"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-white">{skill.name}</h4>
                    <p className="mt-1 text-xs text-muted">Proficiency: {skill.level}%</p>
                  </div>
                  <div className="relative shrink-0">
                    <Ring level={skill.level} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-cyan">
                      {skill.level}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
