"use client";

import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const pageAtom = atom(0);

interface UIProps {
    totalPages: number;
}

export const UI = ({ totalPages }: UIProps) => {
    const [page, setPage] = useAtom(pageAtom);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio instance once
        if (!audioRef.current) {
            audioRef.current = new Audio("/branding/audios/page-flip-01a.mp3");
        }

        // Reset and play audio
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((e) => console.log("Audio play failed - user interaction needed", e));

        // Cleanup on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [page]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end pb-8 bg-transparent z-10 w-full h-full">
            <div className="w-full overflow-auto pointer-events-auto flex justify-center">
                <div className="flex items-center gap-2 max-w-full px-4 overflow-x-auto no-scrollbar">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            aria-label={`Go to ${index === 0 ? 'cover' : index === totalPages - 1 ? 'back cover' : `page ${index}`}`}
                            aria-current={index === page ? 'page' : undefined}
                            className={`transition-all duration-300 px-3 py-1.5 rounded-full text-xs font-medium uppercase shrink-0 border ${index === page
                                    ? "bg-white text-black border-white"
                                    : "bg-black/30 text-white/70 border-transparent hover:border-white/50 hover:bg-black/50"
                                }`}
                            onClick={() => setPage(index)}
                        >
                            {index === 0 ? "Cover" : index === totalPages - 1 ? "Back" : `${index}`}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
