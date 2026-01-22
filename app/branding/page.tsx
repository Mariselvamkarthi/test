"use client";

import { useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { brandingProjects } from "@/data/branding";
import { BrandSelector, SystemInfo, BookSlider } from "@/components/branding";
import { motion } from "framer-motion";

// Error Boundary Component for BookSlider
class BookSliderErrorBoundary extends Component<
    { children: ReactNode; projectId: string },
    { hasError: boolean }
> {
    constructor(props: { children: ReactNode; projectId: string }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("BookSlider error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">
                            Unable to Load Viewer
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-md">
                            The 3D brandbook viewer could not be loaded on this device. Please try again or view on desktop.
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Wrapper component with error boundary
function BookSliderWrapper({ projectId }: { projectId: string }) {
    return (
        <BookSliderErrorBoundary projectId={projectId}>
            <BookSlider projectId={projectId} />
        </BookSliderErrorBoundary>
    );
}

export default function BrandingPage() {
    const [activeProject, setActiveProject] = useState(brandingProjects[0]);
    // CRITICAL: Default to mobile-safe state (assume mobile until proven otherwise)
    const [isMobile, setIsMobile] = useState(true);
    const [shouldLoadViewer, setShouldLoadViewer] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // STRICT CLIENT GUARD: Only run in browser
        if (typeof window === "undefined") return;

        setIsClient(true);

        // Detect mobile device with proper guard
        const checkMobile = () => {
            try {
                if (typeof window === "undefined" || !window.innerWidth) {
                    // Default to mobile-safe if window unavailable
                    setIsMobile(true);
                    return;
                }
                const isMobileDevice = window.innerWidth <= 768;
                setIsMobile(isMobileDevice);
                // Auto-load on desktop, require interaction on mobile
                if (!isMobileDevice) {
                    setShouldLoadViewer(true);
                }
            } catch (error) {
                // Fail-safe: assume mobile on error
                console.error("Error detecting device:", error);
                setIsMobile(true);
            }
        };

        checkMobile();
        
        // Guard event listener registration
        if (typeof window !== "undefined" && window.addEventListener) {
            window.addEventListener("resize", checkMobile);
            return () => {
                if (typeof window !== "undefined" && window.removeEventListener) {
                    window.removeEventListener("resize", checkMobile);
                }
            };
        }
    }, []);

    const handleLoadViewer = () => {
        // Only allow loading after client-side hydration
        if (typeof window !== "undefined") {
            setShouldLoadViewer(true);
        }
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
                    {!isClient ? (
                        // SSR/Initial render: Show safe placeholder
                        <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
                            <div className="text-muted-foreground animate-pulse">Loading...</div>
                        </div>
                    ) : !shouldLoadViewer && isMobile ? (
                        // Mobile: Show lightweight placeholder until user interaction
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
                        // Desktop or mobile after user interaction: Load viewer with error boundary
                        <BookSliderWrapper key={activeProject.id} projectId={activeProject.id} />
                    )}
                </main>
            </motion.div>
        </div>
    );
}
