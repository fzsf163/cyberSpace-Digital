"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const achievements = [
  { value: "9+", label: "Years shaping digital brands" },
  { value: "3", label: "Studios worldwide" },
  { value: "98%", label: "Client retention rate" },
];

export function AboutSection() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: heading, copy, achievements */}
          <div>
            <span
              className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-12 h-px bg-foreground/30" />
              About CyberSpace
            </span>

            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] mb-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              We make brands at home
              <span className="text-muted-foreground"> in the digital world.</span>
            </h2>

            <p
              className={`text-xl text-muted-foreground leading-relaxed mb-12 max-w-xl transition-all duration-1000 delay-150 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              From first positioning workshop to shipped product, we help
              businesses and organizations thrive online — with one senior team
              carrying the work end to end.
            </p>

            {/* Achievements */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center justify-between py-5 border-t border-foreground/10">
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  Achievement
                </span>
                <span className="text-base text-foreground max-w-xs text-right">
                  Winner — Digital Excellence Awards, 2025
                </span>
              </div>
              {achievements.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-5 border-t border-foreground/10"
                >
                  <span className="text-base text-muted-foreground">{item.label}</span>
                  <span className="text-4xl lg:text-5xl font-display">{item.value}</span>
                </div>
              ))}
              <div className="border-t border-foreground/10 pt-8 mt-0">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest border-b border-foreground/30 pb-1 hover:border-foreground transition-colors group"
                >
                  See the work
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: studio reel video (placeholder clip) */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative aspect-video border border-foreground/10 overflow-hidden bg-black">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/placeholder.jpg"
                className="w-full h-full object-cover"
              >
                <source
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="flex items-center justify-between mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <span>Inside the studio</span>
              <span>2026 reel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
