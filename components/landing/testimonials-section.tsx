"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  {
    headline: "Launch day, zero surprises.",
    quote:
      "We shipped a full platform migration with no downtime and no support tickets. The handoff docs alone were worth the engagement.",
    author: "Priya Nair",
    role: "Engineering Lead, Solace Health",
  },
  {
    headline: "A brand voice that finally sticks.",
    quote:
      "Every piece of copy they wrote sounded like us, just sharper. Our sales team still quotes lines from the new site.",
    author: "Tom Reyes",
    role: "Founder, Driftwood Coffee",
  },
  {
    headline: "Design partners, not vendors.",
    quote:
      "They pushed back on our first brief and were right to. The end result solved a problem we hadn't even named yet.",
    author: "Ana Kowalski",
    role: "Head of Design, Fjord Robotics",
  },
  {
    headline: "Support that actually responds.",
    quote:
      "Post-launch support has been instant. Any bug we've flagged got fixed the same day, no back-and-forth required.",
    author: "David Okoro",
    role: "COO, Lantern Analytics",
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
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.author}
                  className="pl-6 sm:basis-1/2 lg:basis-1/3"
                >
                  <figure className="h-full border border-foreground/10 bg-foreground/2 p-8 lg:p-10 transition-all duration-300 hover:border-foreground/25">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-end gap-3 mt-10">
              <CarouselPrevious className="static translate-x-0 translate-y-0 rounded-none" />
              <CarouselNext className="static translate-x-0 translate-y-0 rounded-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
