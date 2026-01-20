"use client";

import dynamic from "next/dynamic";
import { getPages, PageData } from "./BookUI";
import { useMemo } from "react";

const BookCanvas = dynamic(() => import("./BookCanvas"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="text-muted-foreground animate-pulse">Loading 3D Experience...</div>
        </div>
    ),
});

interface BookSliderProps {
    projectId?: string;
}

export const BookSlider = ({ projectId = "sensei-sigma" }: BookSliderProps) => {
    const pages = useMemo(() => getPages(projectId), [projectId]);

    return <BookCanvas pages={pages} />;
};
