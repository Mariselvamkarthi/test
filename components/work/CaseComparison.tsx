"use client";

interface CaseComparisonProps {
  before: string[];
  after: string[];
}

export function CaseComparison({ before, after }: CaseComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
      <div>
        <h3 className="text-display-sm text-foreground mb-4 font-semibold">Before</h3>
        <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
          {before.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-display-sm text-foreground mb-4 font-semibold">After</h3>
        <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
          {after.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

