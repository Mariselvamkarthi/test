"use client";

import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const brandImages: Record<string, string[]> = {
    "sensei-sigma": [
        "Sensei/sensei-guide-01", "Sensei/sensei-guide-02",
        "Sensei/sensei-guide-03", "Sensei/sensei-guide-04",
        "Sensei/sensei-guide-05", "Sensei/sensei-guide-06",
        "Sensei/sensei-guide-07", "Sensei/sensei-guide-08",
    ],
    "belema": [
        "belema/belema-guide-1", "belema/belema-guide-2",
        "belema/belema-guide-3", "belema/belema-guide-4",
        "belema/belema-guide-5", "belema/belema-guide-6",
        "belema/belema-guide-7", "belema/belema-guide-7",
    ],
    "girmiti": [
        "girmiti/girmiti-guide-01", "girmiti/girmiti-guide-02",
        "girmiti/girmiti-guide-03", "girmiti/girmiti-guide-04",
        "girmiti/girmiti-guide-05", "girmiti/girmiti-guide-06",
        "girmiti/girmiti-guide-07", "girmiti/girmiti-guide-08",
        "girmiti/girmiti-guide-09", "girmiti/girmiti-guide-10",
        "girmiti/girmiti-guide-11", "girmiti/girmiti-guide-12",
    ]
};

export interface PageData {
    front: string;
    back: string;
}

export const pageAtom = atom(0);

export const getPages = (brandId: string): PageData[] => {
    const pictures = brandImages[brandId] || brandImages["sensei-sigma"];
    const pages: PageData[] = [];
    for (let i = 0; i < pictures.length; i += 2) {
        pages.push({
            front: pictures[i],
            back: pictures[i + 1] || pictures[i],
        });
    }
    return pages;
};

// Deprecated, keeping for temporary type safety until refactor complete
export const pages: PageData[] = [];

interface BookUIProps {
    pages: PageData[];
}

export const BookUI = ({ pages }: BookUIProps) => {
    const [page, setPage] = useAtom(pageAtom);

    useEffect(() => {
        // STRICT CLIENT GUARD: Only run in browser
        if (typeof window === "undefined") return;

        // Mobile-safe audio handling with proper error handling
        try {
            // Check if Audio API is available
            if (typeof Audio === "undefined" || !Audio) {
                return;
            }

            const audio = new Audio("/audios/page-flip-01a.mp3");
            
            // Set volume to reasonable level for mobile
            audio.volume = 0.5;
            
            // Mobile-safe play with comprehensive error handling
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .catch((error) => {
                        // Silently fail on mobile devices (autoplay restrictions)
                        // This is expected behavior and not an error
                        if (error.name !== "NotAllowedError" && error.name !== "NotSupportedError") {
                            console.debug("Audio play failed:", error.name);
                        }
                    });
            }
        } catch (error) {
            // Fail silently - audio is non-essential
            console.debug("Audio initialization failed:", error);
        }
    }, [page]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end z-10 pb-6">
            <div className="w-full overflow-auto pointer-events-auto flex justify-center no-scrollbar">
                <div className="flex items-center gap-2 md:gap-4 px-4 overflow-x-auto max-w-full">
                    {[...pages].map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                "border-transparent hover:border-white/50 transition-all duration-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium uppercase shrink-0 border backdrop-blur-sm",
                                index === page
                                    ? "bg-white/90 text-black shadow-lg"
                                    : "bg-black/40 text-white/90 hover:bg-black/60"
                            )}
                            onClick={() => setPage(index)}
                        >
                            {index === 0 ? "Cover" : `Page ${index}`}
                        </button>
                    ))}
                    <button
                        className={cn(
                            "border-transparent hover:border-white/50 transition-all duration-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium uppercase shrink-0 border backdrop-blur-sm",
                            page === pages.length
                                ? "bg-white/90 text-black shadow-lg"
                                : "bg-black/40 text-white/90 hover:bg-black/60"
                        )}
                        onClick={() => setPage(pages.length)}
                    >
                        Back Cover
                    </button>
                </div>
            </div>
        </div>
    );
};
