"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Dynamic import of the runtime component ensuring NO SSR
const Flipbook3DRuntime = dynamic(
    () => import("@/components/branding/3d/Flipbook3D.runtime"),
    { ssr: false }
);

export default function Branding3DPage() {
    const searchParams = useSearchParams();
    const title = searchParams.get("title") || "Brand Manual";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full h-screen bg-transparent">
            <Flipbook3DRuntime title={title} />
        </div>
    );
}
