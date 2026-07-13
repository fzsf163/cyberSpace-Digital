"use client";

import { useEffect, useRef, useState } from "react";

// Editorial listing only — there is no blog yet, so rows are deliberately
// static (no links to pages that don't exist).
const articles = [
  {
    category: "Brand",
    date: "12 June, 2026",
    title: "Positioning before pixels: why strategy leads every rebrand.",
  },
  {
    category: "Web",
    date: "28 May, 2026",
    title: "Static-first Next.js: shipping marketing sites that stay fast.",
  },
  {
    category: "Product",
    date: "09 April, 2026",
    title: "Designing data-dense dashboards people actually read.",
  },
  {
    category: "Growth",
    date: "17 March, 2026",
    title: "Organic compounding: a 6-month SEO playbook that tripled traffic.",
  },
];

export function ArticlesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <span
              className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-12 h-px bg-foreground/30" />
              Journal
            </span>
            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Latest <span className="text-muted-foreground">articles.</span>
            </h2>
          </div>
          <p
            className={`lg:col-span-5 text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-150 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Notes from the studio on brand, web, product, and growth.
          </p>
        </div>

        {/* Article rows */}
        <div>
          {articles.map((article, index) => (
            <article
              key={article.title}
              className={`group grid sm:grid-cols-12 gap-2 sm:gap-8 items-baseline py-8 border-t border-foreground/10 last:border-b transition-all duration-700 hover:bg-foreground/2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="sm:col-span-3 flex items-center gap-4">
                <span className="px-3 py-1 border border-foreground/20 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {article.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">{article.date}</span>
              </div>
              <h3 className="sm:col-span-9 text-2xl lg:text-3xl font-display leading-snug transition-transform duration-500 group-hover:translate-x-2">
                {article.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
