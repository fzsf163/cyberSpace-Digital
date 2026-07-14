"use client";

import { useEffect, useRef, useState } from "react";

const clients = [
  "Ironclad Systems",
  "Bramble & Co.",
  "Nova Fintech",
  "Wavelength Media",
  "Cedarline Group",
  "Kestrel Robotics",
  "Orbital Health",
  "Glasswing Studio",
];

export function ClientLogosSection() {
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
    <section ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden bg-section-2">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <span
          className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-12 h-px bg-foreground/30" />
          Trusted by
        </span>
      </div>

      {/* Auto-scrolling logo strip */}
      <div className="flex w-max animate-client-logos-marquee" aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {clients.map((client, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center pr-16 text-3xl lg:text-4xl font-display text-foreground/15 whitespace-nowrap"
              >
                {client}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes client-logos-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-client-logos-marquee {
          animation: client-logos-marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
