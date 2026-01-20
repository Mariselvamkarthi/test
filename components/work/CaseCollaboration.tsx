"use client";

interface CaseCollaborationProps {
  content: string;
}

export function CaseCollaboration({ content }: CaseCollaborationProps) {
  return (
    <div className="text-base leading-relaxed text-muted-foreground">
      <p className="leading-8">{content}</p>
    </div>
  );
}

