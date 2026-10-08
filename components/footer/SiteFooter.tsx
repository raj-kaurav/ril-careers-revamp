import { Masthead } from "@/components/brand/Masthead";
import { footerLinks, legalLinks, socialLinks } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer data-tone="dark" aria-labelledby="footer-title" className="bg-ink text-ivory">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <div className="page-x mx-auto max-w-page pt-20 pb-10 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div id="about" className="scroll-mt-24 lg:col-span-6">
            <a href="#top" aria-label="Reliance Careers — back to the start" className="inline-block">
              <Masthead tone="dark" size="lg" />
            </a>
            <p className="display mt-10 max-w-lg text-[1.75rem] leading-[1.15] text-ivory/90 md:text-[2.25rem]">
              One group spanning energy, technology, retail, new energy and media — and the people who move between them.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 lg:col-span-5 lg:col-start-8">
            <div>
              <p className="caption text-saffron">Careers</p>
              <ul className="mt-5">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="inline-flex min-h-11 items-center text-body text-ivory/75 transition-colors hover:text-ivory">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="caption text-saffron">Follow</p>
              <ul className="mt-5" aria-label="Social media (placeholder links)">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-label={`${link.label} (placeholder)`}
                      className="inline-flex min-h-11 items-center text-body text-ivory/75 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-line-inverse pt-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-2 text-small text-ivory/60">
            <p>
              © {site.copyrightYear} {site.legalEntity}. All rights reserved.
            </p>
            <p>{site.prototypeNotice}</p>
            <p>{site.photoCredit}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6" aria-label="Legal">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="inline-flex min-h-11 items-center text-small text-ivory/60 transition-colors hover:text-ivory">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
