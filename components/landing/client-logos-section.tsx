"use client";

import { Reveal } from "@/components/motion/reveal";

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
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-section-2">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <Reveal
          as="span"
          className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-10"
        >
          <span className="w-12 h-px bg-foreground/30" />
          Trusted by
        </Reveal>
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
        @media (prefers-reduced-motion: reduce) {
          .animate-client-logos-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
