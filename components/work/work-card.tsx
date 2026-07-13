import { ArrowUpRight } from "lucide-react";

import type { WorkItem } from "@/lib/data/work";
import { cn } from "@/lib/utils";

export function WorkCard({ item }: { item: WorkItem }) {
  const content = (
    <>
      {/* Cover with hover reveal */}
      <div className="relative aspect-4/3 overflow-hidden border border-foreground/10">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.href && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium">
              View details
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="pt-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="text-2xl lg:text-3xl font-display flex items-center gap-2 transition-transform duration-500 group-hover:translate-x-1">
            {item.title}
            {item.href && (
              <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            )}
          </h3>
          <span className="px-3 py-1 border border-foreground/20 font-mono text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap">
            {item.category}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-3">
          <span>{item.year}</span>
          {item.client && (
            <>
              <span className="text-foreground/20">/</span>
              <span>{item.client}</span>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
      </div>
    </>
  );

  const className = cn("group relative flex flex-col");

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
