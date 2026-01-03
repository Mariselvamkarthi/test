"use client";

import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Bone,
    BoxGeometry,
    Color,
    Float32BufferAttribute,
    MathUtils,
    MeshStandardMaterial,
    Skeleton,
    SkinnedMesh,
    SRGBColorSpace,
    Uint16BufferAttribute,
    Vector3,
    Group
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pageAtom } from "./UI";

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71; // 4:3 aspect ratio
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

// Geometry creation
const pageGeometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
    "skinIndex",
    new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeometry.setAttribute(
    "skinWeight",
    new Float32BufferAttribute(skinWeights, 4)
);

const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

const pageMaterials = [
    new MeshStandardMaterial({ color: whiteColor }),
    new MeshStandardMaterial({ color: "#111" }),
    new MeshStandardMaterial({ color: whiteColor }),
    new MeshStandardMaterial({ color: whiteColor }),
];

interface PageProps {
    number: number;
    front: string;
    back: string;
    page: number;
    opened: boolean;
    bookClosed: boolean;
    totalPages: number;
}

const Page = ({ number, front, back, page, opened, bookClosed, totalPages, ...props }: PageProps) => {
    // Load textures using useTexture. Note: front/back are URLs (or data URIs).
    // Ideally, useTexture should be called with stable URL list, but here we call it per Page component.
    // This is how the reference did it.

    // We handle potential load errors or missing textures by defaulting if needed, 
    // but useTexture expects valid inputs. We assume inputs are valid data URIs or paths.
    const [picture, picture2] = useTexture([
        front,
        back,
    ]);

    // Create rough texture manually or load it. For now, we reuse the picture or just standard material properties.
    // The reference used a specific roughness map. We'll skip it or use a default if we don't have it.
    // const [pictureRoughness] = useTexture(['/textures/book-cover-roughness.jpg']) // We don't have this yet.

    picture.colorSpace = picture2.colorSpace = SRGBColorSpace;

    const group = useRef<Group>(null);
    const turnedAt = useRef(0);
    const lastOpened = useRef(opened);
    const skinnedMeshRef = useRef<SkinnedMesh>(null);

    const manualSkinnedMesh = useMemo(() => {
        const bones: Bone[] = [];
        for (let i = 0; i <= PAGE_SEGMENTS; i++) {
            let bone = new Bone();
            bones.push(bone);
            if (i === 0) {
                bone.position.x = 0;
            } else {
                bone.position.x = SEGMENT_WIDTH;
            }
            if (i > 0) {
                bones[i - 1].add(bone);
            }
        }
        const skeleton = new Skeleton(bones);

        // Dynamic materials for this page
        const materials = [
            ...pageMaterials,
            new MeshStandardMaterial({
                color: whiteColor,
                map: picture,
                roughness: 0.1,
                emissive: emissiveColor,
                emissiveIntensity: 0,
            }),
            new MeshStandardMaterial({
                color: whiteColor,
                map: picture2,
                roughness: 0.1,
                emissive: emissiveColor,
                emissiveIntensity: 0,
            }),
        ];

        const mesh = new SkinnedMesh(pageGeometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(skeleton.bones[0]);
        mesh.bind(skeleton);
        return mesh;
    }, [picture, picture2]);

    useFrame((_, delta) => {
        if (!skinnedMeshRef.current) return;

        // Emissive highlight logic
        const emissiveIntensity = highlighted ? 0.22 : 0;
        // Material indices 4 and 5 correspond to front and back faces with textures
        (skinnedMeshRef.current.material as MeshStandardMaterial[])[4].emissiveIntensity =
            (skinnedMeshRef.current.material as MeshStandardMaterial[])[5].emissiveIntensity = MathUtils.lerp(
                (skinnedMeshRef.current.material as MeshStandardMaterial[])[4].emissiveIntensity,
                emissiveIntensity,
                0.1
            );

        if (lastOpened.current !== opened) {
            turnedAt.current = +new Date();
            lastOpened.current = opened;
        }

        let turningTime = Math.min(400, new Date().getTime() - turnedAt.current) / 400;
        turningTime = Math.sin(turningTime * Math.PI);

        let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
        if (!bookClosed) {
            targetRotation += degToRad(number * 0.8);
        }

        const bones = skinnedMeshRef.current.skeleton.bones;
        for (let i = 0; i < bones.length; i++) {
            const target = i === 0 ? group.current! : bones[i];

            const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
            const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
            const turningIntensity = Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

            let rotationAngle =
                insideCurveStrength * insideCurveIntensity * targetRotation -
                outsideCurveStrength * outsideCurveIntensity * targetRotation +
                turningCurveStrength * turningIntensity * targetRotation;

            let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

            if (bookClosed) {
                if (i === 0) {
                    rotationAngle = targetRotation;
                    foldRotationAngle = 0;
                } else {
                    rotationAngle = 0;
                    foldRotationAngle = 0;
                }
            }

            easing.dampAngle(target.rotation, "y", rotationAngle, easingFactor, delta);

            const foldIntensity = i > 8
                ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
                : 0;

            easing.dampAngle(target.rotation, "x", foldRotationAngle * foldIntensity, easingFactorFold, delta);
        }
    });

    const [_, setPage] = useAtom(pageAtom);
    const [highlighted, setHighlighted] = useState(false);
    useCursor(highlighted);

    return (
        <group
            {...props}
            ref={group}
            onPointerEnter={(e) => {
                e.stopPropagation();
                setHighlighted(true);
            }}
            onPointerLeave={(e) => {
                e.stopPropagation();
                setHighlighted(false);
            }}
            onClick={(e) => {
                e.stopPropagation();
                setPage(opened ? number : number + 1);
                setHighlighted(false);
            }}
        >
            <primitive
                object={manualSkinnedMesh}
                ref={skinnedMeshRef}
                position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
            />
        </group>
    );
};

export const Book = ({ pagesData }: { pagesData: { front: string; back: string }[] }) => {
    const [page] = useAtom(pageAtom);
    const [delayedPage, setDelayedPage] = useState(page);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const goToPage = () => {
            setDelayedPage((prevDelayedPage) => {
                if (page === prevDelayedPage) {
                    return prevDelayedPage;
                } else {
                    timeout = setTimeout(
                        () => {
                            goToPage();
                        },
                        Math.abs(page - prevDelayedPage) > 2 ? 50 : 150
                    );
                    if (page > prevDelayedPage) {
                        return prevDelayedPage + 1;
                    }
                    if (page < prevDelayedPage) {
                        return prevDelayedPage - 1;
                    }
                }
                return prevDelayedPage;
            });
        };
        goToPage();
        return () => {
            clearTimeout(timeout);
        };
    }, [page]);

    return (
        <group rotation-y={-Math.PI / 2}>
            {pagesData.map((pageData, index) => (
                <Page
                    key={index}
                    page={delayedPage}
                    number={index}
                    opened={delayedPage > index}
                    bookClosed={delayedPage === 0 || delayedPage === pagesData.length}
                    totalPages={pagesData.length}
                    {...pageData}
                />
            ))}
        </group>
    );
};
