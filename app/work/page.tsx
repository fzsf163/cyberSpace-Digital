import type { Metadata } from "next";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WorkCard } from "@/components/work/work-card";
import { workItems } from "@/lib/data/work";

export const metadata: Metadata = {
  title: "Work — CyberSpace Digital",
  description:
    "Selected brand, web, product, and growth engagements delivered by CyberSpace Digital.",
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-section">
      <Navigation />

      <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-24">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-12 h-px bg-foreground/30" />
              Selected projects
            </span>
            <span className="text-sm font-mono text-muted-foreground">(2023 — 2026)*</span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-[110px] font-display tracking-tight leading-[0.9] mb-8">
            All <span className="text-muted-foreground">work.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            A collection of brand, web, product, and growth engagements delivered
            for clients across industries.
          </p>
        </div>
      </section>

      <section className="relative pb-32 lg:pb-40">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {workItems.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
