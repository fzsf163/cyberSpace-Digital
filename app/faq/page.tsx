import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ — CyberSpace Digital",
  description:
    "Answers to common questions about working with CyberSpace Digital — our process, pricing, timelines, and what happens after launch.",
};

type FaqGroup = {
  category: string;
  items: { question: string; answer: string }[];
};

const faqGroups: FaqGroup[] = [
  {
    category: "Getting started",
    items: [
      {
        question: "What kinds of projects do you take on?",
        answer:
          "We work across four disciplines — brand and identity, web design and development, product design, and growth marketing. Most engagements combine a few of these, whether that's a full rebrand and website, a product design system, or an ongoing growth partnership.",
      },
      {
        question: "How do we start working together?",
        answer:
          "It begins with a conversation. Reach out through our contact form with a bit about your business and what you're trying to achieve. We'll set up an intro call, and if it's a fit, we'll follow up with a tailored proposal and scope.",
      },
      {
        question: "Do you work with clients outside your region?",
        answer:
          "Yes. We collaborate with clients remotely and are set up to work across time zones. Most of our process happens through shared docs, regular calls, and async updates, so location is rarely a barrier.",
      },
    ],
  },
  {
    category: "Process & timelines",
    items: [
      {
        question: "How long does a typical project take?",
        answer:
          "It depends on scope. A focused brand or marketing site usually runs six to ten weeks, while larger product and platform builds can span several months. We'll give you a realistic timeline in your proposal and keep it visible throughout the engagement.",
      },
      {
        question: "How involved will we need to be?",
        answer:
          "The best work comes from close collaboration. Expect a kickoff, regular check-ins, and a few key review points where your input matters most. Between those, we keep momentum without needing you in every detail.",
      },
      {
        question: "Who will we actually be working with?",
        answer:
          "The same senior team from start to finish. We don't hand projects off to junior staff after the pitch — the people who scope your work are the ones who deliver it.",
      },
    ],
  },
  {
    category: "Pricing & engagement",
    items: [
      {
        question: "How much does a project cost?",
        answer:
          "Every engagement is scoped individually, so pricing reflects the work involved rather than a fixed menu. After our intro call we'll send a detailed proposal with a clear breakdown, so there are no surprises.",
      },
      {
        question: "Do you offer ongoing retainers?",
        answer:
          "We do. Many clients continue with us after launch for growth marketing, iterative product work, or design support. Retainers are a flexible way to keep a dedicated team on hand month to month.",
      },
      {
        question: "What are your payment terms?",
        answer:
          "Engagements are typically split into milestone-based invoices tied to project phases. Specific terms are laid out in your agreement before any work begins.",
      },
    ],
  },
  {
    category: "After launch",
    items: [
      {
        question: "Do we own the work you deliver?",
        answer:
          "Yes. Ownership of final deliverables transfers to you on full payment, as set out in your engagement agreement. We may feature completed work in our portfolio unless we've agreed to keep it confidential.",
      },
      {
        question: "What happens once the project is live?",
        answer:
          "We don't disappear at launch. We provide handoff documentation, make sure your team is comfortable, and offer support and iteration options so the work keeps performing as your business grows.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-section">
      <Navigation />

      {/* Header */}
      <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-24">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-12 h-px bg-foreground/30" />
              Frequently asked
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-[110px] font-display tracking-tight leading-[0.9] mb-8">
            Questions, <span className="text-muted-foreground">answered.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            The things clients ask us most, from first conversation to life after
            launch. Still not sure about something? We&apos;re happy to talk it
            through.
          </p>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-350 mx-auto px-6 lg:px-12 space-y-16 lg:space-y-24">
          {faqGroups.map((group) => (
            <div
              key={group.category}
              className="grid lg:grid-cols-12 gap-8 lg:gap-16"
            >
              <div className="lg:col-span-4">
                <h2 className="text-2xl lg:text-3xl font-display leading-tight lg:sticky lg:top-32">
                  {group.category}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <Accordion type="single" collapsible className="w-full">
                  {group.items.map((item, index) => (
                    <AccordionItem
                      key={item.question}
                      value={`${group.category}-${index}`}
                      className="border-foreground/10"
                    >
                      <AccordionTrigger className="text-lg font-display hover:no-underline py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 pr-8">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="relative pb-32 lg:pb-40">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="border-t border-foreground/10 pt-12 lg:pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-display leading-tight mb-4">
                Still have questions?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Tell us what you&apos;re working on and we&apos;ll get back to you
                with answers — and a plan.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground hover:bg-foreground/90 text-background h-14 px-8 text-base transition-colors whitespace-nowrap"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
