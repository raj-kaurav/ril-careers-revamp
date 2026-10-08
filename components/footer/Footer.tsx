import Link from "next/link";
import { UserRound } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/layout/Container";
import { footerColumns, legalLinks, routes, socialLinks, type SocialPlatform } from "@/data/navigation";
import { site } from "@/data/site";

const socialPaths: Record<SocialPlatform, string> = {
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75Z",
  x: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z",
  instagram:
    "M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.2 12 2.2Zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.08a3.18 3.18 0 1 1 0-6.36 3.18 3.18 0 0 1 0 6.36Zm5.1-9.43a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Z",
  youtube:
    "M23 7.2a3 3 0 0 0-2.1-2.12C19.03 4.5 12 4.5 12 4.5s-7.03 0-8.9.58A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.12c1.87.58 8.9.58 8.9.58s7.03 0 8.9-.58A3 3 0 0 0 23 16.8a31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z",
};

export function Footer() {
  return (
    <footer data-surface="dark" className="bg-background-dark text-white" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <Container className="pt-16 pb-10 md:pt-20">
        <div className="layout-grid gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Link href={routes.home} aria-label="RIL Careers — home" className="inline-block rounded-sm">
              <Wordmark tone="light" layout="stacked" />
            </Link>
            <p className="mt-6 max-w-xs text-body-lg text-text-inverse-muted">One Reliance. Many possibilities.</p>
            <Link
              href={routes.myCareers}
              className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-md border border-white/20 px-4 text-label font-semibold text-white transition-colors hover:border-white/50"
            >
              <UserRound className="size-5" aria-hidden="true" />
              My Careers
            </Link>
            <ul className="mt-8 flex gap-2" aria-label="Social media (placeholder links)">
              {socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    aria-label={`${social.label} (placeholder)`}
                    className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1.125rem]" fill="currentColor">
                      <path d={socialPaths[social.platform]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-8 md:grid-cols-3 lg:col-span-7 lg:col-start-6"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="eyebrow text-accent">{column.title}</h3>
                <ul className="mt-5 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-body text-text-inverse-muted transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border-dark pt-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-2 text-body-sm text-text-inverse-muted">
            <p>
              © {site.copyrightYear} {site.legalEntity}. All rights reserved.
            </p>
            <p className="text-white/60">{site.prototypeNotice}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Legal">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-body-sm text-text-inverse-muted transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
