import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/data/content";
import { Reveal, motion } from "@/components/Motion";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { submitMessage, type About } from "@/lib/strapi";

interface ContactProps {
  about: About | null;
}

type Errors = { name?: string; email?: string; subject?: string; message?: string };

export function Contact({ about }: ContactProps) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const email = about?.email ?? profile.email;
  const phone = about?.phone ?? profile.phone;
  const location = about?.location ?? profile.location;
  const githubUrl = about?.githubUrl || profile.githubUrl;
  const linkedinUrl = about?.linkedinUrl || profile.linkedinUrl;

  const handleSubmit = async (event: FormEvent) => {
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

    setSubmitting(true);
    setSubmitError(null);
    try {
      const body = `Subject: ${values.subject.trim()}\n\n${values.message.trim()}`;
      await submitMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: body,
      });
      setSent(true);
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitError("Something went wrong sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
              { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
              { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s+/g, "")}` },
              { icon: MapPin, label: "Location", value: location, href: null as string | null },
              ...(githubUrl
                ? [{ icon: GithubIcon, label: "GitHub", value: "xayanansarix", href: githubUrl }]
                : []),
              ...(linkedinUrl
                ? [{ icon: LinkedinIcon, label: "LinkedIn", value: "ayan-ansari1865", href: linkedinUrl }]
                : []),
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
                  Message sent — I'll reply soon.
                </motion.p>
              )}
              {submitError && (
                <p className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
                  {submitError}
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 text-sm">
                  <span className="text-muted">Your Name</span>
                  <input
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    placeholder="e.g. Sarah Connor"
                    className="w-full rounded-xl border border-line bg-ink-soft px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-cyan/50"
                  />
                  {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
                </label>
                <label className="block space-y-2 text-sm">
                  <span className="text-muted">Email Address</span>
                  <input
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    placeholder="e.g. sarah@company.com"
                    className="w-full rounded-xl border border-line bg-ink-soft px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-cyan/50"
                  />
                  {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                </label>
              </div>

              <label className="mt-4 block space-y-2 text-sm">
                <span className="text-muted">Subject</span>
                <input
                  value={values.subject}
                  onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
                  placeholder="Summer 2026 Internship / Project Discussion"
                  className="w-full rounded-xl border border-line bg-ink-soft px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-cyan/50"
                />
                {errors.subject && <span className="text-xs text-red-400">{errors.subject}</span>}
              </label>

              <label className="mt-4 block space-y-2 text-sm">
                <span className="text-muted">Message</span>
                <textarea
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  placeholder="Hi Ayan, I saw your TCIL project and wanted to discuss..."
                  className="w-full resize-y rounded-xl border border-line bg-ink-soft px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-cyan/50"
                />
                {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
              </label>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.03 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-3 text-sm font-semibold text-ink cyan-glow disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Sending…" : (
                  <>
                    Send Message <Send className="size-4" />
                  </>
                )}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
