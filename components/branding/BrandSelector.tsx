"use client";

import { BrandProject } from "@/data/branding";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BrandSelectorProps {
    projects: BrandProject[];
    activeId: string;
    onSelect: (project: BrandProject) => void;
}

export function BrandSelector({ projects, activeId, onSelect }: BrandSelectorProps) {
    return (
        <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Select Project
            </h2>
            <div className="flex flex-col gap-2">
                {projects.map((project) => (
                    <button
                        key={project.id}
                        onClick={() => onSelect(project)}
                        className={cn(
                            "group text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden",
                            activeId === project.id
                                ? "bg-foreground text-background border-foreground shadow-lg scale-[1.02]"
                                : "bg-background text-foreground border-border hover:border-foreground/50"
                        )}
                    >
                        <div className="flex justify-between items-center relative z-10">
                            <span className="font-semibold text-sm">{project.name}</span>
                            {activeId === project.id && (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </div>
                        <p className={cn(
                            "text-xs mt-1.5 line-clamp-2 transition-colors",
                            activeId === project.id ? "text-background/80" : "text-muted-foreground"
                        )}>
                            {project.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}
