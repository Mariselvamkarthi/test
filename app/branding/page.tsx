"use client";

import { useState, useEffect } from "react";
import { brandingProjects } from "@/data/branding";
import { BrandSelector, SystemInfo, BookSlider } from "@/components/branding";
import { motion } from "framer-motion";

export default function BrandingPage() {
    const [activeProject, setActiveProject] = useState(brandingProjects[0]);
    const [isMobile, setIsMobile] = useState(false);
    const [shouldLoadViewer, setShouldLoadViewer] = useState(false);

    useEffect(() => {
        // Detect mobile device
        const checkMobile = () => {
            const isMobileDevice = window.innerWidth <= 768;
            setIsMobile(isMobileDevice);
            // Auto-load on desktop, require interaction on mobile
            if (!isMobileDevice) {
                setShouldLoadViewer(true);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleLoadViewer = () => {
        setShouldLoadViewer(true);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8 sm:py-12 lg:py-16">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 sm:gap-8 lg:gap-12"
            >
                <aside className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                    <header>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Brand Systems</h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
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

                <main className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 relative order-1 lg:order-2 overflow-hidden">
                    {!shouldLoadViewer && isMobile ? (
                        <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center p-8 text-center">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-foreground">
                                    {activeProject.name} Brand System
                                </h2>
                                <p className="text-sm text-muted-foreground max-w-md">
                                    Tap the button below to load the interactive 3D brandbook viewer.
                                </p>
                                <button
                                    onClick={handleLoadViewer}
                                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                                >
                                    Load Brandbook Viewer
                                </button>
                            </div>
                        </div>
                    ) : (
                        <BookSlider key={activeProject.id} projectId={activeProject.id} />
                    )}
                </main>
            </motion.div>
        </div>
    );
}
