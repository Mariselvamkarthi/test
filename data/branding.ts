export interface BrandProject {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    pdfParams?: {
        scale?: number;
        fitToPage?: boolean;
    };
}

export const brandingProjects: BrandProject[] = [
    {
        id: "belema",
        name: "Belema Fintech",
        description: "Retail Fintech identity focusing on trust and clarity.",
        thumbnail: "/images/branding/belema/hero.webp",
    },
    {
        id: "sensei-sigma",
        name: "Sensei SIGMA",
        description: "Options trading system balancing complexity with guidance.",
        thumbnail: "/images/branding/sensei-sigma/hero.webp",
    },
    {
        id: "girmiti",
        name: "Girmiti Corporate",
        description: "Enterprise identity standards for internal platforms.",
        thumbnail: "/images/branding/girmiti/hero.webp",
    },
];
