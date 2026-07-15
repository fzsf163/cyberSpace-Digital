import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { getAdjacentWork, getWorkItem, workItems } from "@/lib/data/work";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItem(slug);
  if (!item) return { title: "Work — CyberSpace Digital" };
  return {
    title: `${item.title} — CyberSpace Digital`,
    description: item.summary,
  };
}

const DEFAULT_SERVICES = [
  "Discovery & strategy",
  "Design & prototyping",
  "Development",
  "Launch & support",
];

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getWorkItem(slug);
  if (!item) notFound();

  const adjacent = getAdjacentWork(slug)!;
  const tags = item.tags ?? [item.category];
  const services = item.services ?? DEFAULT_SERVICES;
  const needs =
    item.needs ??
    `${item.client ?? "The client"} came to us needing to move faster in a competitive market without losing what made them distinctive.`;
  const approach = item.approach ?? item.summary;
  const challenge =
    item.challenge ??
    "Balancing an ambitious scope against a tight timeline while keeping the existing experience running throughout.";
  const results =
    item.results ?? [
      "Measurable lift in engagement",
      "A faster, more resilient experience",
      "A system the in-house team can extend",
    ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-section">
      <Navigation />

      <article className="relative pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-10">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-foreground/20">/</span>
            <Link href="/work" className="hover:text-foreground transition-colors">
              Work
            </Link>
            <span className="text-foreground/20">/</span>
            <span className="text-foreground">{item.title}</span>
          </nav>

          {/* Title + tags */}
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
            <h1 className="lg:col-span-8 text-5xl md:text-6xl lg:text-8xl font-display tracking-tight leading-[0.95]">
              {item.title}
            </h1>
            <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Banner */}
          <div className="relative aspect-16/9 overflow-hidden rounded-3xl border border-foreground/10 mb-14">
            <img
              src={item.coverImage}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Meta bar */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-foreground/10 py-8 mb-16">
            <MetaItem label="Industry" value={item.industry ?? item.category} />
            {item.client && <MetaItem label="Client" value={item.client} />}
            <MetaItem label="Solution" value={item.solution ?? item.category} />
            <MetaItem label="Year" value={String(item.year)} />
            {item.website && (
              <MetaItem
                label="Website"
                value={
                  item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      {item.website}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    item.website
                  )
                }
              />
            )}
          </dl>

          {/* Body */}
          <div className="grid lg:grid-cols-12 gap-x-16 gap-y-14">
            <div className="lg:col-span-8 space-y-14">
              <Section title="Project summary">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Client needs
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {needs}
                </p>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Our approach
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {approach}
                </p>
              </Section>

              <Section title="Challenges">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {challenge}
                </p>
              </Section>

              <Section title="Results / success metrics">
                <ul className="space-y-4">
                  {results.map((result) => (
                    <li key={result} className="flex items-start gap-3 text-lg">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                      <span className="text-muted-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            {/* Services aside */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 rounded-3xl border border-foreground/10 bg-card p-8">
                <h2 className="font-display text-2xl mb-6">Services provided</h2>
                <ul className="space-y-4">
                  {services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 border-b border-foreground/10 pb-4 last:border-0 last:pb-0 font-mono text-sm text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                      {service}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground text-background h-12 text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Prev / next */}
      <nav className="border-t border-foreground/10">
        <div className="max-w-350 mx-auto px-6 lg:px-12 grid sm:grid-cols-2">
          <Link
            href={`/work/${adjacent.prev.slug}`}
            className="group flex items-center gap-4 py-10 sm:pr-8 sm:border-r border-foreground/10"
          >
            <ArrowLeft className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1" />
            <span className="min-w-0">
              <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Previous
              </span>
              <span className="block truncate font-display text-xl">
                {adjacent.prev.title}
              </span>
            </span>
          </Link>
          <Link
            href={`/work/${adjacent.next.slug}`}
            className="group flex items-center justify-end gap-4 py-10 sm:pl-8 text-right"
          >
            <span className="min-w-0">
              <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Next
              </span>
              <span className="block truncate font-display text-xl">
                {adjacent.next.title}
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>

      <FooterSection />
    </main>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </dt>
      <dd className="text-base text-foreground">{value}</dd>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-3xl lg:text-4xl mb-6">{title}</h2>
      {children}
    </section>
  );
}
