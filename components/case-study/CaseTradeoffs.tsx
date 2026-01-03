"use client";

interface CaseTradeoffsProps {
  tradeoffs: string[];
}

export function CaseTradeoffs({ tradeoffs }: CaseTradeoffsProps) {
  return (
    <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
      {tradeoffs.map((tradeoff, index) => (
        <li key={index} className="flex items-start">
          <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
          <span>{tradeoff}</span>
        </li>
      ))}
    </ul>
  );
}

