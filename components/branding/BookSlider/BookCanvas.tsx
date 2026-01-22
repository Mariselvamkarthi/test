"use client";

import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Experience } from "./Experience";
import { BookUI, PageData } from "./BookUI";

interface BookCanvasProps {
    pages: PageData[];
}

export function BookCanvas({ pages }: BookCanvasProps) {
    const [mounted, setMounted] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // STRICT CLIENT GUARD: Only mount in browser
        if (typeof window === "undefined") return;

        try {
            setMounted(true);
        } catch (error) {
            console.error("BookCanvas mount error:", error);
            setHasError(true);
        }
    }, []);

    // Fail-safe: Show error state if mount failed
    if (hasError) {
        return (
            <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center p-8 text-center">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        Viewer Unavailable
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md">
                        The 3D viewer could not be initialized on this device. Please try again or view on desktop.
                    </p>
                </div>
            </div>
        );
    }

    if (!mounted) {
        return (
            <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="text-muted-foreground animate-pulse">Loading 3D Experience...</div>
            </div>
        );
    }

    // Render Canvas - errors will be caught by error boundary in parent
    return (
        <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative">
            <BookUI pages={pages} />
            <Loader />
            <Canvas 
                shadows 
                camera={{
                    position: [-0.5, 1, 5],
                    fov: 45,
                }}
                className="w-full h-full !absolute inset-0"
                gl={{
                    // Mobile-safe WebGL context settings
                    antialias: false,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false,
                }}
                onCreated={(state) => {
                    // Verify WebGL context was created successfully
                    if (!state.gl) {
                        console.error("WebGL context creation failed");
                        setHasError(true);
                    }
                }}
            >
                <group position-y={0}>
                    <Suspense fallback={null}>
                        <Experience pages={pages} />
                    </Suspense>
                </group>
            </Canvas>
        </div>
    );
}

export default BookCanvas;
