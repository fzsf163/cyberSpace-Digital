"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: ["Brand &", "Identity."],
    description:
      "Positioning, naming, and visual identity systems that make you unmistakable across every touchpoint.",
    capabilities: ["Positioning & strategy", "Naming & voice", "Identity systems"],
    stat: { value: "45+", label: "brands built" },
  },
  {
    number: "02",
    title: ["Web Design &", "Development."],
    description:
      "High-performance marketing sites and web apps, designed and built for speed, clarity, and conversion.",
    capabilities: ["Marketing sites", "Web applications", "Performance & accessibility"],
    stat: { value: "80+", label: "sites shipped" },
  },
  {
    number: "03",
    title: ["Product", "Design."],
    description:
      "UX and UI for digital products — from first user flow to a polished, shippable interface.",
    capabilities: ["UX research & flows", "UI systems", "Prototyping & handoff"],
    stat: { value: "30+", label: "products designed" },
  },
  {
    number: "04",
    title: ["Growth &", "Marketing."],
    description:
      "SEO, content, and paid campaigns engineered to turn traffic into qualified pipeline.",
    capabilities: ["SEO & content", "Paid campaigns", "Analytics & CRO"],
    stat: { value: "3.2x", label: "avg. traffic growth" },
  },
];

export function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 bg-section-2">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <span
              className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-12 h-px bg-foreground/30" />
              Smart solutions
            </span>
            <h2
              className={`text-6xl md:text-7xl lg:text-[110px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Scope of <span className="text-muted-foreground">work.</span>
            </h2>
          </div>
          <p
            className={`lg:col-span-5 text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-150 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Four disciplines, one senior team — everything a brand needs to
            launch and keep growing online.
          </p>
        </div>

        {/* Service rows */}
        <div>
          {services.map((service, index) => (
            <div
              key={service.number}
              className={`group grid lg:grid-cols-12 gap-6 lg:gap-8 py-12 lg:py-16 border-t border-foreground/10 last:border-b transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Number */}
              <span className="lg:col-span-1 font-mono text-sm text-muted-foreground pt-2">
                {service.number}
              </span>

              {/* Title */}
              <h3 className="lg:col-span-4 text-4xl lg:text-5xl font-display leading-[1.05] transition-transform duration-500 group-hover:translate-x-2">
                {service.title[0]}
                <br />
                {service.title[1]}
              </h3>

              {/* Description + capabilities */}
              <div className="lg:col-span-4">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="text-sm font-mono text-foreground/70"
                    >
                      <span className="text-muted-foreground mr-2">+</span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stat */}
              <div className="lg:col-span-3 lg:text-right">
                <span className="text-4xl lg:text-5xl font-display block">
                  {service.stat.value}
                </span>
                <span className="text-xs text-muted-foreground font-mono mt-2 block">
                  {service.stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
