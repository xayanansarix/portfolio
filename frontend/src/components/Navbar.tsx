import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/data/content";

const links = [
  { href: "#home", label: "Home" },
  { href: "#bio", label: "Bio" },
  { href: "#skills", label: "Skills" },
  { href: "#leetcode", label: "LeetCode" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg border border-cyan/40 text-xs font-bold text-cyan">
            {profile.initials}
          </span>
          <span className="text-sm font-semibold text-white">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? "bg-panel text-cyan" : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={profile.resumeUrl}
            download="Ayan_Ansari_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan/40 px-4 py-2 text-sm font-medium text-cyan transition hover:bg-cyan/10"
          >
            <Download className="size-4" />
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-ink cyan-glow"
          >
            Hire / Connect
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg border border-line p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-panel hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download="Ayan_Ansari_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-cyan hover:bg-panel"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
