import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/data/content";
import { Reveal, motion } from "@/components/Motion";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

type Errors = { name?: string; email?: string; subject?: string; message?: string };

export function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email.";
    if (!values.subject.trim()) next.subject = "Please add a subject.";
    if (values.message.trim().length < 10)
      next.message = "Tell me a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const body = encodeURIComponent(
      `From: ${values.name.trim()} <${values.email.trim()}>\n\n${values.message.trim()}`,
    );
    const subject = encodeURIComponent(values.subject.trim());
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setValues({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-medium text-violet">
            Let's Connect
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to Collaborate <span className="text-gradient">?</span>
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Open to internships, entry-level roles, and collaborations. Share a few lines and I'll
            get back to you.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              {
                icon: Phone,
                label: "Phone",
                value: profile.phone,
                href: `tel:${profile.phone.replace(/\s+/g, "")}`,
              },
              { icon: MapPin, label: "Location", value: profile.location, href: null as string | null },
              { icon: GithubIcon, label: "GitHub", value: "xayanansarix", href: profile.githubUrl },
              {
                icon: LinkedinIcon,
                label: "LinkedIn",
                value: "ayan-ansari1865",
                href: profile.linkedinUrl,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 4, borderColor: "rgba(34,211,238,0.4)" }}
                className="flex items-center gap-3 rounded-2xl border border-line bg-panel/80 p-4"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <item.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-muted">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="truncate text-sm font-medium text-white hover:text-cyan"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-line bg-panel/80 p-6 sm:p-8"
            >
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 rounded-xl border border-cyan/30 bg-cyan/10 px-3 py-2 text-sm text-cyan"
                >
                  Opening your email app — send when ready.
                </motion.p>
              )}

              {(
                [
                  ["name", "Name", "text"],
                  ["email", "Email", "email"],
                  ["subject", "Subject", "text"],
                ] as const
              ).map(([key, label, type]) => (
                <label key={key} className="mb-4 block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
                  <input
                    type={type}
                    value={values[key]}
                    onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                    className="w-full rounded-xl border border-line bg-ink-soft px-3 py-2.5 text-sm text-white outline-none focus:border-cyan/50"
                  />
                  {errors[key] && <span className="mt-1 block text-xs text-rose-400">{errors[key]}</span>}
                </label>
              ))}

              <label className="mb-5 block">
                <span className="mb-1.5 block text-xs font-medium text-muted">Message</span>
                <textarea
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  className="w-full resize-y rounded-xl border border-line bg-ink-soft px-3 py-2.5 text-sm text-white outline-none focus:border-cyan/50"
                />
                {errors.message && (
                  <span className="mt-1 block text-xs text-rose-400">{errors.message}</span>
                )}
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-3 text-sm font-semibold text-ink cyan-glow"
              >
                <Send className="size-4" />
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
