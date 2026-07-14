"use client";

import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Priya Anand",
    role: "Creative Director",
    bio: "Sets the visual direction across every brand and product engagement.",
    initials: "PA",
  },
  {
    name: "Diego Marín",
    role: "Lead Engineer",
    bio: "Architects the front-end systems that keep our builds fast and resilient.",
    initials: "DM",
  },
  {
    name: "Hana Kobayashi",
    role: "Head of Growth",
    bio: "Turns SEO, content, and paid channels into predictable pipeline.",
    initials: "HK",
  },
  {
    name: "Owen Fitzgerald",
    role: "Product Designer",
    bio: "Designs the flows and interfaces behind our client's digital products.",
    initials: "OF",
  },
  {
    name: "Layla Haddad",
    role: "Strategy Lead",
    bio: "Aligns brand positioning with business goals before pixel one.",
    initials: "LH",
  },
];

export function TeamSection() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-section">
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
              Our people
            </span>
            <h2
              className={`text-6xl md:text-7xl lg:text-[110px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              The <span className="text-muted-foreground">team.</span>
            </h2>
          </div>
          <p
            className={`lg:col-span-5 text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-150 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            A small senior team spanning brand, engineering, product, and
            growth — no account handlers, just the people doing the work.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="w-20 h-20 rounded-full bg-foreground/10 flex items-center justify-center mb-6">
                <span className="font-display text-2xl">{member.initials}</span>
              </div>
              <h3 className="text-xl font-display mb-1">{member.name}</h3>
              <p className="text-sm font-mono text-muted-foreground mb-4">
                {member.role}
              </p>
              <p className="text-sm text-foreground/60 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
