import { ArrowUpRight } from "lucide-react";

import type { WorkItem } from "@/lib/data/work";
import { cn } from "@/lib/utils";

export function WorkCard({ item }: { item: WorkItem }) {
  const content = (
    <>
      <div className="relative aspect-4/3 overflow-hidden border-b border-foreground/10">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3 font-mono text-xs text-muted-foreground uppercase tracking-widest">
          <span>{item.category}</span>
          <span>{item.year}</span>
        </div>
        <h3 className="text-xl font-display flex items-center gap-2">
          {item.title}
          {item.href && (
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          )}
        </h3>
        {item.client && (
          <p className="text-xs text-muted-foreground mt-1 font-mono">{item.client}</p>
        )}
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.summary}</p>
      </div>
    </>
  );

  const className = cn(
    "group relative flex flex-col border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-colors duration-300",
    item.href && "hover:border-foreground/30"
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
