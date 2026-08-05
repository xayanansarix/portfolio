import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/data/content";
import { getMediaUrl, type About } from "@/lib/strapi";

const links = [
  { href: "#home", label: "Home" },
  { href: "#bio", label: "Bio" },
  { href: "#skills", label: "Skills" },
  { href: "#leetcode", label: "LeetCode" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  about?: About | null;
}

export function Navbar({ about }: NavbarProps) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const name = about?.name ?? profile.name;
  const initials =
    name
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || profile.initials;
  const subtitle = about?.title ?? profile.subtitle;
  const resumeUrl = getMediaUrl(about?.resume) ?? profile.resumeUrl;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = links.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4 sm:h-18">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg border border-cyan/40 bg-panel text-sm font-bold text-cyan cyan-glow">
            {initials}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">{name}</span>
            <span className="block text-[11px] text-muted">{subtitle}</span>
          </span>
        </a>

        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-all ${
                  isActive
                    ? "bg-cyan text-ink font-semibold cyan-glow"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={resumeUrl}
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
              href={resumeUrl}
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
