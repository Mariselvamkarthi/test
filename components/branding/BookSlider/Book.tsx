import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useMemo, useRef, useState, useEffect } from "react";
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
    Group,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pageAtom, PageData } from "./BookUI";

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = PAGE_WIDTH / (16 / 9); // 16:9 aspect ratio
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

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
    // ALL VERTICES
    vertex.fromBufferAttribute(position, i); // get the vertex
    const x = vertex.x; // get the x position of the vertex

    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH)); // calculate the skin index
    let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH; // calculate the skin weight

    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0); // set the skin indexes
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0); // set the skin weights
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
    new MeshStandardMaterial({
        color: whiteColor,
    }),
    new MeshStandardMaterial({
        color: "#111",
    }),
    new MeshStandardMaterial({
        color: whiteColor,
    }),
    new MeshStandardMaterial({
        color: whiteColor,
    }),
];

interface PageProps {
    number: number;
    front: string;
    back: string;
    page: number;
    opened: boolean;
    bookClosed: boolean;
    pagesLength: number;
    [key: string]: any;
}

const Page = ({ number, front, back, page, opened, bookClosed, pagesLength, ...props }: PageProps) => {
    const [picture, picture2, pictureRoughness] = useTexture([
        `/textures/${front}.jpg`,
        `/textures/${back}.jpg`,
        ...(number === 0 || number === pagesLength - 1
            ? [`/textures/book-cover-roughness.jpg`]
            : []),
    ]);
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
                bones[i - 1].add(bone); // attach the new bone to the previous bone
            }
        }
        const skeleton = new Skeleton(bones);

        const materials = [
            ...pageMaterials,
            new MeshStandardMaterial({
                color: whiteColor,
                map: picture,
                ...(number === 0
                    ? {
                        roughnessMap: pictureRoughness,
                    }
                    : {
                        roughness: 0.1,
                    }),
                emissive: emissiveColor,
                emissiveIntensity: 0,
            }),
            new MeshStandardMaterial({
                color: whiteColor,
                map: picture2,
                ...(number === pagesLength - 1
                    ? {
                        roughnessMap: pictureRoughness,
                    }
                    : {
                        roughness: 0.1,
                    }),
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
    }, [number, picture, picture2, pictureRoughness, pagesLength]);

    useFrame((_, delta) => {
        if (!skinnedMeshRef.current) {
            return;
        }

        const emissiveIntensity = highlighted ? 0.22 : 0;

        // Safety check for materials array access
        if (Array.isArray(skinnedMeshRef.current.material)) {
            const mat4 = skinnedMeshRef.current.material[4] as MeshStandardMaterial;
            const mat5 = skinnedMeshRef.current.material[5] as MeshStandardMaterial;
            if (mat4 && mat5) {
                mat4.emissiveIntensity = mat5.emissiveIntensity = MathUtils.lerp(
                    mat4.emissiveIntensity,
                    emissiveIntensity,
                    0.1
                );
            }
        }


        if (lastOpened.current !== opened) {
            turnedAt.current = +new Date();
            lastOpened.current = opened;
        }
        let turningTime = Math.min(400, Number(new Date()) - turnedAt.current) / 400;
        turningTime = Math.sin(turningTime * Math.PI);

        let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
        if (!bookClosed) {
            targetRotation += degToRad(number * 0.8);
        }

        const bones = skinnedMeshRef.current.skeleton.bones;
        for (let i = 0; i < bones.length; i++) {
            const target = i === 0 ? group.current : bones[i];
            if (!target) continue;

            const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
            const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
            const turningIntensity =
                Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;
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

            easing.dampAngle(
                target.rotation,
                "y",
                rotationAngle,
                easingFactor,
                delta
            );

            const foldIntensity =
                i > 8
                    ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
                    : 0;
            easing.dampAngle(
                target.rotation,
                "x",
                foldRotationAngle * foldIntensity,
                easingFactorFold,
                delta
            );
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

interface BookProps {
    pages: PageData[];
    [key: string]: any;
}

export const Book = ({ pages, ...props }: BookProps) => {
    const [page] = useAtom(pageAtom);
    const [delayedPage, setDelayedPage] = useState(page);

    useEffect(() => {
        // Preload textures when pages change
        pages.forEach((pageData) => {
            useTexture.preload(`/textures/${pageData.front}.jpg`);
            useTexture.preload(`/textures/${pageData.back}.jpg`);
        });
        useTexture.preload(`/textures/book-cover-roughness.jpg`);
    }, [pages]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const goToPage = () => {
            setDelayedPage((delayedPage: number) => {
                if (page === delayedPage) {
                    return delayedPage;
                } else {
                    timeout = setTimeout(
                        () => {
                            goToPage();
                        },
                        Math.abs(page - delayedPage) > 2 ? 50 : 150
                    );
                    if (page > delayedPage) {
                        return delayedPage + 1;
                    }
                    if (page < delayedPage) {
                        return delayedPage - 1;
                    }
                }
                return delayedPage;
            });
        };
        goToPage();
        return () => {
            clearTimeout(timeout);
        };
    }, [page]);

    return (
        <group {...props} rotation-y={-Math.PI / 2}>
            {[...pages].map((pageData, index) => (
                <Page
                    key={index}
                    page={delayedPage}
                    number={index}
                    opened={delayedPage > index}
                    bookClosed={delayedPage === 0 || delayedPage === pages.length}
                    pagesLength={pages.length}
                    {...pageData}
                />
            ))}
        </group>
    );
};
