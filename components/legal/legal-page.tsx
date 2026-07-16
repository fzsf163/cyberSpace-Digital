import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export type LegalSection = {
  /** Stable id used for the in-page anchor + table of contents. */
  id: string;
  heading: string;
  /** Each string is a paragraph; render in order. */
  body: string[];
};

export type LegalPageProps = {
  /** Page kind label shown in the eyebrow, e.g. "Legal — Privacy". */
  eyebrow: string;
  title: string;
  /** Human-readable effective date, e.g. "July 16, 2026". */
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/**
 * Shared shell for the standalone legal pages (`/privacy`, `/terms`).
 * Both are structurally identical — only the copy differs — so they share
 * this one component rather than forking the layout twice.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-section">
      <Navigation />

      {/* Header */}
      <section className="relative pt-40 pb-12 lg:pt-52 lg:pb-16">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            {eyebrow}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] mb-6">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-4">
            {intro}
          </p>
          <p className="text-sm font-mono text-muted-foreground">
            Last updated: {updated}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="relative pb-32 lg:pb-40">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Table of contents */}
            <aside className="lg:col-span-4">
              <nav className="lg:sticky lg:top-32">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
                  On this page
                </p>
                <ol className="space-y-3">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="font-mono text-xs text-foreground/30 pt-0.5">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {section.heading}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-8">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 pt-10 pb-2 first:pt-0 border-t border-foreground/10 first:border-t-0"
                >
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-mono text-sm text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-display leading-tight">
                      {section.heading}
                    </h2>
                  </div>
                  <div className="space-y-4 lg:pl-9">
                    {section.body.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
