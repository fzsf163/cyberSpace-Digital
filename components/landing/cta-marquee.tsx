"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const phrase = "Let's build something great";

export function CtaMarquee({ variant = "a" }: { variant?: "a" | "b" }) {
  return (
    <section
      className={cn(
        "relative py-16 lg:py-20 border-y border-foreground/10 overflow-hidden",
        variant === "a" ? "bg-section" : "bg-section-2"
      )}
    >
      {/* Scrolling phrase */}
      <div className="flex w-max animate-cta-marquee mb-10" aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-8 pr-8 text-5xl lg:text-7xl font-display text-foreground/15 whitespace-nowrap"
              >
                {phrase}
                <span className="text-foreground/10">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-foreground hover:bg-foreground/90 text-background h-14 px-8 text-base group"
        >
          <a href="#contact">
            Start a project
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>

      <style jsx>{`
        @keyframes cta-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-cta-marquee {
          animation: cta-marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
