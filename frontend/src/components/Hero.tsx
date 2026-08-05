import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/content";
import { motion } from "@/components/Motion";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-24 size-72 rounded-full bg-cyan/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -right-10 top-40 size-80 rounded-full bg-violet/20 blur-3xl"
      />

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan"
          >
            <Sparkles className="size-3.5" />
            {profile.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {profile.heroHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-3 text-sm font-semibold text-ink cyan-glow"
            >
              Explore Projects <ArrowRight className="size-4" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-full border border-cyan/40 bg-panel/60 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan/10"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="GitHub profile"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-panel/60 text-white hover:border-cyan/40 hover:text-cyan"
            >
              <GithubIcon className="size-5" />
            </motion.a>
            <motion.a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="LinkedIn profile"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-panel/60 text-white hover:border-cyan/40 hover:text-cyan"
            >
              <LinkedinIcon className="size-5" />
            </motion.a>
          </motion.div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {profile.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 + i * 0.07 }}
                whileHover={{ y: -3, borderColor: "rgba(34,211,238,0.45)" }}
                className="rounded-xl border border-line bg-panel/70 px-3 py-3 text-center"
              >
                <p className="text-lg font-bold text-cyan sm:text-xl">{stat.value}</p>
                <p className="mt-1 text-[11px] text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            aria-hidden
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 4.5, repeat: Infinity }}
            className="absolute -inset-6 rounded-[2rem] bg-cyan/20 blur-2xl"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[1.5rem] border border-cyan/30 bg-panel shadow-[0_0_60px_rgba(34,211,238,0.25)]"
          >
            <div className="flex aspect-[4/5] flex-col justify-end bg-gradient-to-br from-panel-2 via-ink-soft to-ink p-6">
              <div className="mb-auto flex justify-center pt-10">
                <motion.img
                  src={profile.photoUrl}
                  alt={`Portrait of ${profile.name}`}
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(34,211,238,0.1)",
                      "0 0 30px rgba(34,211,238,0.45)",
                      "0 0 0 rgba(34,211,238,0.1)",
                    ],
                  }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                  className="size-40 rounded-full border-2 border-cyan/50 object-cover"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-black/35 p-4 backdrop-blur">
                <span className="inline-flex items-center rounded-full bg-cyan/15 px-2.5 py-1 text-[11px] font-medium text-cyan">
                  Active Status: Building
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">{profile.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-3.5 text-cyan" />
                  {profile.location}
                </p>
              </div>
            </div>

            <div className="border-t border-line bg-ink-soft p-4 font-mono text-xs">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-[10px] text-muted">ayan_terminal.py</span>
              </div>
              <p className="text-slate-300">
                <span className="text-cyan">$</span> python3 -c "
                <span className="text-violet">{profile.terminalLine}</span>"
              </p>
              <p className="mt-1 text-emerald-300">{profile.terminalOutput}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
