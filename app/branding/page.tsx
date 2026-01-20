"use client";

import { useState } from "react";
import { brandingProjects } from "@/data/branding";
import { BrandSelector, SystemInfo, BookSlider } from "@/components/branding";
import { motion } from "framer-motion";

export default function BrandingPage() {
    const [activeProject, setActiveProject] = useState(brandingProjects[0]);

    return (
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-[350px_1fr] gap-8 lg:gap-12"
            >
                <aside className="space-y-8">
                    <header>
                        <h1 className="text-3xl font-bold mb-2">Brand Systems</h1>
                        <p className="text-muted-foreground">
                            Comprehensive identity systems designed for scalability and consistency.
                        </p>
                    </header>

                    <BrandSelector
                        projects={brandingProjects}
                        activeId={activeProject.id}
                        onSelect={setActiveProject}
                    />

                    <SystemInfo />
                </aside>

                <main className="min-h-[600px] bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative">
                    <BookSlider key={activeProject.id} projectId={activeProject.id} />
                </main>
            </motion.div>
        </div>
    );
}
