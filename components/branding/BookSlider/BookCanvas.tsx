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

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative">
            <BookUI pages={pages} />
            <Loader />
            <Canvas shadows camera={{
                position: [-0.5, 1, 5],
                fov: 45,
            }}
                className="w-full h-full !absolute inset-0"
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
