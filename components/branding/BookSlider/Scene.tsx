"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Experience } from "./Experience";
import { UI, pageAtom } from "./UI";
import { useAtom } from "jotai";

interface BookSliderProps {
    images: string[];
}

export const BookSlider = ({ images }: BookSliderProps) => {
    const [, setPage] = useAtom(pageAtom);

    // Reset page to 0 when images change (brand manual switch)
    useEffect(() => {
        setPage(0);
    }, [images, setPage]);

    // Calculate total pages logic matches Book.tsx
    const totalPages = Math.ceil(images.length / 2);

    return (
        <div className="w-full h-full relative">
            <UI totalPages={totalPages} />
            <Canvas
                shadows
                camera={{
                    position: [-0.5, 1, 4],
                    fov: 45,
                }}
                className="w-full h-full"
            >
                <group position-y={0}>
                    <Suspense fallback={null}>
                        <Experience images={images} />
                    </Suspense>
                </group>
            </Canvas>
        </div>
    );
}
