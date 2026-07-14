"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const stats = [
  { value: "120+", label: "projects delivered" },
  { value: "98%", label: "client retention rate" },
  { value: "9 yrs", label: "in business" },
];

const marqueeItems = ["Bold brands", "Sharp products", "Real growth"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-section">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-80"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/70" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-350 mx-auto px-6 lg:px-12 pt-40 pb-16">
        {/* Eyebrow */}
        <div
          className={`mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60">
            <span className="px-3 py-1 border border-white/20 rounded-full">
              (2016 — 2026)
            </span>
            A digital agency for brand, web &amp; product
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-[clamp(2.5rem,8vw,8.5rem)] font-display leading-[0.92] tracking-tight text-white mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block">Pioneering</span>
          <span className="block">
            digital <span className="text-white/40">excellence.</span>
          </span>
        </h1>

        {/* Sub copy + CTA, right-shifted like the reference */}
        <div
          className={`lg:ml-auto lg:max-w-md transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xl text-white/60 leading-relaxed mb-8">
            We design and build brands, websites, and products that move
            businesses forward — strategy to launch, under one roof.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white hover:bg-white/90 text-black h-14 px-8 text-base group"
          >
            <a href="#contact">
              Start a project
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div
          className={`mt-16 lg:mt-24 flex items-start gap-10 lg:gap-20 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-display text-white">
                {stat.value}
              </span>
              <span className="text-xs text-white/50 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="relative z-10 border-t border-white/10 py-5 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-hero-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {Array.from({ length: 4 }).flatMap((_, rep) =>
                marqueeItems.map((item) => (
                  <span
                    key={`${rep}-${item}`}
                    className="flex items-center gap-6 pr-6 text-2xl lg:text-3xl font-display text-white/30 whitespace-nowrap"
                  >
                    {item}
                    <span className="text-white/15">✳</span>
                  </span>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-hero-marquee {
          animation: hero-marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
