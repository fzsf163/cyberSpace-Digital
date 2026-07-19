"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { WorkCard } from "@/components/work/work-card";
import { workItems } from "@/lib/data/work";

const featuredWork = workItems.filter((item) => item.featured).slice(0, 4);

export function FeaturedWorkSection() {
  return (
    <section id="work" className="relative py-24 lg:py-32 bg-section">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Header */}
        <Reveal className="mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-12 h-px bg-foreground/30" />
              Selected projects
            </span>
            <span className="text-sm font-mono text-muted-foreground">(2023 — 2026)*</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-7 text-6xl md:text-7xl lg:text-[110px] font-display tracking-tight leading-[0.9]">
              Latest <span className="text-muted-foreground">work.</span>
            </h2>
            <p className="lg:col-span-5 text-xl text-muted-foreground leading-relaxed">
              120+ projects shipped for clients across industries — a few
              recent favorites.
            </p>
          </div>
        </Reveal>

        {/* Project grid */}
        <RevealGroup className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featuredWork.map((item) => (
            <RevealItem key={item.slug}>
              <WorkCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* View all */}
        <Reveal className="mt-16 flex justify-center" delay={0.1}>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-8 h-14 text-base hover:bg-foreground hover:text-background transition-colors group"
          >
            View all work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
