"use client";

interface CaseAssumptionsProps {
  assumptions: string[];
}

export function CaseAssumptions({ assumptions }: CaseAssumptionsProps) {
  return (
    <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
      {assumptions.map((assumption, index) => (
        <li key={index} className="flex items-start">
          <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
          <span>{assumption}</span>
        </li>
      ))}
    </ul>
  );
}

