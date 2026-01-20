import { Environment, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";
import { PageData } from "./BookUI";

interface ExperienceProps {
    pages: PageData[];
}

export const Experience = ({ pages }: ExperienceProps) => {
    return (
        <>
            <group rotation-x={-Math.PI / 4}>
                <Book pages={pages} />
            </group>
            <OrbitControls />
            <Environment preset="studio"></Environment>
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
