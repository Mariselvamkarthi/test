"use client";

import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { useAtom } from "jotai";
import { pageAtom } from "./UI";
import { createPageTexture } from "./utils";
import { useMemo, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Flipbook3DRuntimeProps {
    title: string;
}

export default function Flipbook3DRuntime({ title }: Flipbook3DRuntimeProps) {
    const [page, setPage] = useAtom(pageAtom);
    const [mounted, setMounted] = useState(false);

    // Parse URL parameters for images
    // Parse URL parameters for images
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const imagesParam = searchParams?.get('images');

    let images: string[] = [];
    try {
        if (imagesParam && imagesParam !== "undefined" && imagesParam !== "null") {
            images = JSON.parse(decodeURIComponent(imagesParam));
        }
    } catch (e) {
        console.error("Failed to parse images param:", e);
        images = [];
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate pages dynamically based on images or title fallback
    const pagesData = useMemo(() => {
        if (!mounted) return [];

        // If we have actual images provided via URL
        if (images.length > 0) {
            const pages = [];
            // We pair images: [0]=front, [1]=back, [2]=front, [3]=back...
            // If odd number of images, last page back is blank/white
            for (let i = 0; i < images.length; i += 2) {
                pages.push({
                    front: images[i],
                    back: images[i + 1] || createPageTexture("END", "#1a1a1a", "white") // Fallback for last back page
                });
            }
            return pages;
        }

        // Fallback: Create placeholder texture pages if no images found
        const cover = createPageTexture("COVER", "#1a1a1a", "white");
        const backCover = createPageTexture("BACK", "#1a1a1a", "white");
        const p1 = createPageTexture(`${title} - Intro`, "white", "black");
        const p2 = createPageTexture("Brand Overview", "white", "black");
        const p3 = createPageTexture("Typography", "white", "black");
        const p4 = createPageTexture("Color Palette", "white", "black");
        const p5 = createPageTexture("Logo Usage", "white", "black");
        const p6 = createPageTexture("Do's & Don'ts", "white", "black");

        return [
            { front: cover, back: p1 },
            { front: p2, back: p3 },
            { front: p4, back: p5 },
            { front: p6, back: backCover },
        ];
    }, [title, mounted, images]);

    useEffect(() => {
        if (mounted) {
            setPage(0);
        }
    }, [title, setPage, mounted]);

    const totalSpreads = pagesData.length;

    if (!mounted) return null;

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-10">
                <Canvas shadows camera={{ position: [0, 1, 4], fov: 45 }}>
                    <group position-y={0}>
                        {pagesData.length > 0 && <Experience pagesData={pagesData} />}
                    </group>
                </Canvas>
            </div>

            {/* UI Controls Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-800">
                <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full disabled:opacity-30 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium min-w-[60px] text-center">
                    {page === 0 ? "Cover" : page === totalSpreads ? "Back" : `Page ${page}`}
                </span>
                <button
                    onClick={() => setPage(Math.min(totalSpreads, page + 1))}
                    disabled={page === totalSpreads}
                    className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full disabled:opacity-30 transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

        </div>
    );
}
