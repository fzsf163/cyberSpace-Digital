import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Careers — CyberSpace Digital",
  description:
    "Join CyberSpace Digital. We're a senior team building brand, web, product, and growth work for clients across industries.",
};

const values = [
  {
    number: "01",
    title: "Senior by default",
    description:
      "No project pyramids. Everyone here does the work they were hired for, from first brief to final ship. You'll own outcomes, not just tasks.",
  },
  {
    number: "02",
    title: "Craft over churn",
    description:
      "We take on fewer engagements and give each the attention it deserves. Quality is the point — we protect the time it takes to get things right.",
  },
  {
    number: "03",
    title: "Curious, always",
    description:
      "Great work comes from people who keep learning. We make space to explore new tools, share what we find, and question how things are done.",
  },
  {
    number: "04",
    title: "Kind and direct",
    description:
      "We give honest feedback early and assume good intent. Clear beats clever — with clients and with each other.",
  },
];

const perks = [
  {
    title: "Remote-first",
    description:
      "Work from wherever you do your best thinking. We're built around async collaboration and flexible hours.",
  },
  {
    title: "Real time off",
    description:
      "Generous paid leave that people actually take, plus company-wide recharge weeks throughout the year.",
  },
  {
    title: "Learning budget",
    description:
      "An annual allowance for courses, conferences, books, and tools that sharpen your craft.",
  },
  {
    title: "Home-office setup",
    description:
      "A budget to build a workspace that works for you — hardware, desk, the lot.",
  },
  {
    title: "Health & wellbeing",
    description:
      "Health coverage and a wellbeing stipend, because good work depends on people feeling well.",
  },
  {
    title: "Meaningful work",
    description:
      "Small, senior teams on projects that ship — with your name on the outcomes.",
  },
];

const hiringSteps = [
  {
    number: "01",
    title: "Intro chat",
    description:
      "A relaxed conversation to learn about you, your work, and what you're looking for — and for you to ask us anything.",
  },
  {
    number: "02",
    title: "Portfolio deep-dive",
    description:
      "We walk through a few pieces of your work together, focusing on how you think, not just what you shipped.",
  },
  {
    number: "03",
    title: "Paid exercise",
    description:
      "A short, compensated project that mirrors real work here. No unpaid spec, no take-home marathons.",
  },
  {
    number: "04",
    title: "Meet the team",
    description:
      "A final conversation with the people you'd work alongside, then a decision — usually within a week.",
  },
];

export default function CareersPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-section">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-28">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-12 h-px bg-foreground/30" />
              Careers
            </span>
            <span className="text-sm font-mono text-muted-foreground">
              (Remote-first)*
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-[110px] font-display tracking-tight leading-[0.9] mb-8">
            Build work <br />
            <span className="text-muted-foreground">that lasts.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            We&apos;re a small, senior studio making brand, web, product, and
            growth work for ambitious clients. When we grow the team, we grow it
            carefully — with people who care about craft as much as we do.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 lg:py-28 bg-section-2">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-20">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                How we work
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95]">
                What we <span className="text-muted-foreground">value.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-lg text-muted-foreground leading-relaxed">
              The principles that shape how we hire, collaborate, and make
              decisions every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {values.map((value) => (
              <div
                key={value.number}
                className="rounded-2xl border border-foreground/10 bg-foreground/2 p-8 lg:p-10 flex flex-col gap-4 transition-colors hover:border-foreground/25"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {value.number}
                </span>
                <h3 className="text-2xl lg:text-3xl font-display leading-tight">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-12 h-px bg-foreground/30" />
              The good stuff
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              Perks &amp; <span className="text-muted-foreground">benefits.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="rounded-2xl border border-foreground/10 bg-foreground/2 p-8 transition-colors hover:border-foreground/25"
              >
                <h3 className="text-xl font-display mb-3">{perk.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="relative py-20 lg:py-28 bg-section-2">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-12 h-px bg-foreground/30" />
              How we hire
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              A fair <span className="text-muted-foreground">process.</span>
            </h2>
          </div>

          <div>
            {hiringSteps.map((step) => (
              <div
                key={step.number}
                className="group grid lg:grid-cols-12 gap-6 lg:gap-8 items-baseline py-10 lg:py-12 border-t border-foreground/10 last:border-b"
              >
                <div className="lg:col-span-2 flex items-baseline gap-3">
                  <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                    Step
                  </span>
                  <span className="text-4xl lg:text-5xl font-display text-foreground/20 group-hover:text-foreground/60 transition-colors duration-500">
                    {step.number}
                  </span>
                </div>
                <h3 className="lg:col-span-4 text-3xl lg:text-4xl font-display leading-tight transition-transform duration-500 group-hover:translate-x-2">
                  {step.title}
                </h3>
                <p className="lg:col-span-6 text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles — empty state */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-12">
            <span className="w-12 h-px bg-foreground/30" />
            Open positions
          </span>

          <div className="rounded-3xl border border-foreground/15 px-8 py-16 lg:px-16 lg:py-24 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              No open roles right now
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[0.95] mb-6 max-w-3xl">
              We&apos;re not hiring today — but great people are always worth
              meeting.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
              If you think you&apos;d be a fit for the studio, send us your work
              and a note about what you&apos;re looking for. When a role opens up,
              you&apos;ll be the first person we call.
            </p>
            <a
              href="mailto:careers@cyberspace.mx?subject=Open%20application%20—%20CyberSpace%20Digital"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground hover:bg-foreground/90 text-background h-14 px-8 text-base transition-colors"
            >
              Introduce yourself
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
