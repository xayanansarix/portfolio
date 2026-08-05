import { profile } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="section-shell flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg border border-cyan/40 text-xs font-bold text-cyan">
            {profile.initials}
          </span>
          <span className="text-sm font-semibold text-white">{profile.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg border border-line p-2 text-muted transition hover:border-cyan/40 hover:text-cyan"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg border border-line p-2 text-muted transition hover:border-cyan/40 hover:text-cyan"
          >
            <LinkedinIcon className="size-4" />
          </a>
        </div>
        <p className="text-xs text-muted">Designed with Navy Blue & Neon Cyan Aesthetics</p>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
