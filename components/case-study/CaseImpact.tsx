"use client";

interface CaseImpactProps {
  impacts: string[];
}

export function CaseImpact({ impacts }: CaseImpactProps) {
  return (
    <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
      {impacts.map((impact, index) => (
        <li key={index} className="flex items-start">
          <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
          <span>{impact}</span>
        </li>
      ))}
    </ul>
  );
}

