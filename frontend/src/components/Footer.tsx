import { profile } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import type { About } from "@/lib/strapi";

interface FooterProps {
  about?: About | null;
}

export function Footer({ about }: FooterProps) {
  const name = about?.name ?? profile.name;
  const initials =
    name
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || profile.initials;
  const githubUrl = about?.githubUrl || profile.githubUrl;
  const linkedinUrl = about?.linkedinUrl || profile.linkedinUrl;

  return (
    <footer className="border-t border-line py-10">
      <div className="section-shell flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg border border-cyan/40 text-xs font-bold text-cyan">
            {initials}
          </span>
          <span className="text-sm font-semibold text-white">{name}</span>
        </div>
        {(githubUrl || linkedinUrl) && (
          <div className="flex items-center gap-3">
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-line p-2 text-muted transition hover:border-cyan/40 hover:text-cyan"
              >
                <GithubIcon className="size-4" />
              </a>
            ) : null}
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-line p-2 text-muted transition hover:border-cyan/40 hover:text-cyan"
              >
                <LinkedinIcon className="size-4" />
              </a>
            ) : null}
          </div>
        )}
        <p className="text-xs text-muted">Designed with Navy Blue & Neon Cyan Aesthetics</p>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
