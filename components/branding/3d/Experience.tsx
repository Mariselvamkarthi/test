"use client";

import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";

export const Experience = ({ pagesData }: { pagesData: { front: string; back: string }[] }) => {
    return (
        <>
            <Float
                rotation-x={-Math.PI / 4}
                floatIntensity={0.5} // Reduced for less motion sickness
                speed={2}
                rotationIntensity={1}
            >
                <Book pagesData={pagesData} />
            </Float>
            <OrbitControls
                enableZoom={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
            />
            <Environment preset="studio" />
            <directionalLight
                position={[2, 5, 2]}
                intensity={2.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />
            <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.2} />
            </mesh>
        </>
    );
};
