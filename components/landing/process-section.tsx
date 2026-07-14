"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery &",
    subtitle: "consultation.",
    description:
      "We dig into your business, audience, and goals to define a sharp creative and technical brief.",
  },
  {
    number: "02",
    title: "Strategy &",
    subtitle: "design.",
    description:
      "Brand, UX, and UI come together into a cohesive design system, validated with real users.",
  },
  {
    number: "03",
    title: "Build, launch",
    subtitle: "& iterate.",
    description:
      "Engineering ships a fast, accessible product — then we measure and refine on real usage data.",
  },
];

export function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-24 lg:py-32 bg-section">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span
            className={`inline-flex items-center gap-3 text-sm font-mono text-foreground/40 mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-foreground/20" />
            Working steps
          </span>
          <h2
            className={`text-6xl md:text-7xl lg:text-[110px] font-display tracking-tight leading-[0.9] text-foreground transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Solution in <span className="text-foreground/30">process.</span>
          </h2>
        </div>

        {/* Step rows */}
        <div className="mb-20 lg:mb-28">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group grid lg:grid-cols-12 gap-6 lg:gap-8 items-center py-10 lg:py-14 border-t border-foreground/10 last:border-b transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="text-sm font-mono text-foreground/40 uppercase tracking-widest">
                  Step
                </span>
                <span className="text-5xl lg:text-6xl font-display text-foreground/20 group-hover:text-foreground/60 transition-colors duration-500">
                  {step.number}
                </span>
              </div>
              <h3 className="lg:col-span-6 text-4xl lg:text-6xl font-display text-foreground leading-[1.02] transition-transform duration-500 group-hover:translate-x-2">
                {step.title}
                <br />
                <span className="text-foreground/40">{step.subtitle}</span>
              </h3>
              <p className="lg:col-span-4 text-foreground/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Founder quote */}
        <div
          className={`max-w-3xl transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-2xl lg:text-3xl font-display text-foreground/80 leading-snug mb-8">
            &ldquo;Every engagement runs through the same senior team, start to
            finish — that&apos;s how the work stays sharp from brief to
            launch.&rdquo;
          </p>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center">
              <span className="font-display text-xl text-foreground">A</span>
            </div>
            <div>
              <p className="text-foreground font-medium">Alex Morgan</p>
              <p className="text-foreground/50 text-sm">
                Founder &amp; Creative Director, CyberSpace Digital
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
