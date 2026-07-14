"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    headline: "A rebrand that finally fits.",
    quote:
      "The rebrand gave us a visual identity that finally matches how ambitious we are. Every touchpoint feels considered.",
    author: "Sarah Chen",
    role: "CTO, Meridian Labs",
  },
  {
    headline: "Checkout friction, gone.",
    quote:
      "They rebuilt our storefront from the ground up and checkout friction basically disappeared overnight.",
    author: "Marcus Webb",
    role: "Head of Growth, Northwind Goods",
  },
  {
    headline: "Complex flows made obvious.",
    quote:
      "The product design work is exceptional. Complex workflows that used to confuse users now feel obvious.",
    author: "Elena Rodriguez",
    role: "VP Product, Atlas Logistics",
  },
  {
    headline: "Growth that compounds.",
    quote:
      "Our organic traffic tripled within six months. The growth team treats our budget like it's their own.",
    author: "James Liu",
    role: "Marketing Director, Verdant Foods",
  },
];

export function TestimonialsSection() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-section-2">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <span
              className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-12 h-px bg-foreground/30" />
              Customer feedback
            </span>
            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              They <span className="text-muted-foreground">love us.</span>
            </h2>
          </div>

          {/* Review badge */}
          <div
            className={`flex items-center gap-4 px-5 py-4 border border-foreground/15 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
              ))}
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Reviewed
              <span className="block text-foreground mt-1">50 reviews</span>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.author}
              className={`border border-foreground/10 bg-foreground/2 p-8 lg:p-10 transition-all duration-700 hover:border-foreground/25 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="font-display text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <figcaption>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </figcaption>
              </div>
              <p className="text-2xl font-display mb-4">{testimonial.headline}</p>
              <blockquote className="text-muted-foreground leading-relaxed">
                {testimonial.quote}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
