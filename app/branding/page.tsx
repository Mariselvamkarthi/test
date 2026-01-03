"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Palette, FileText, Layout, ChevronRight, Rotate3d } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollReveal } from "@/lib/motion";

const BookSlider = dynamic(
  () => import("@/components/branding/BookSlider/Scene").then((mod) => ({ default: mod.BookSlider })),
  { ssr: false }
);

interface BrandManual {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const BRAND_MANUALS: BrandManual[] = [
  {
    id: "belema",
    title: "Belema Fintech",
    description: "Retail Fintech identity focusing on trust and clarity.",
    images: [
      "/branding-images/belema/cover.jpg",
      "/branding-images/belema/intro.jpg",
      "/branding-images/belema/overview.jpg",
      "/branding-images/belema/typography.jpg",
      "/branding-images/belema/color.jpg",
      "/branding-images/belema/logo.jpg",
      "/branding-images/belema/back.jpg",
    ],
  },
  {
    id: "sensei",
    title: "Sensei SIGMA",
    description: "Options trading system balancing complexity with guidance.",
    images: [
      "/branding-images/sensei/cover.jpg",
      "/branding-images/sensei/intro.jpg",
      "/branding-images/sensei/overview.jpg",
      "/branding-images/sensei/typography.jpg",
      "/branding-images/sensei/color.jpg",
      "/branding-images/sensei/back.jpg",
    ],
  },
  {
    id: "girmiti",
    title: "Girmiti Corporate",
    description: "Enterprise identity standards for internal platforms.",
    images: [
      "/branding-images/girmiti/cover.jpg",
      "/branding-images/girmiti/intro.jpg",
      "/branding-images/girmiti/overview.jpg",
      "/branding-images/girmiti/back.jpg",
    ],
  },
];

export default function Branding() {
  const [selectedManual, setSelectedManual] = useState<BrandManual>(BRAND_MANUALS[0]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-24">

      {/* Page Header - Compact */}
      <motion.header
        initial={scrollReveal.hidden}
        animate={scrollReveal.visible}
        className="mb-10 sm:mb-16 max-w-3xl"
      >
        <h1 className="text-display-lg mb-4">Brand Systems & Identity</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Scalable design systems expressed through interactive 3D documentation.
        </p>
      </motion.header>

      {/* Main Layout: 35% Selector / 65% Viewer */}
      <motion.div
        initial={scrollReveal.hidden}
        whileInView={scrollReveal.visible}
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 lg:gap-16 items-start"
      >

        {/* Left Column: Selector & Context */}
        <div className="space-y-8 order-2 lg:order-1 lg:sticky lg:top-24">

          {/* Brand Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Project</label>
            </div>
            <div className="flex flex-col gap-2">
              {BRAND_MANUALS.map((manual) => (
                <button
                  key={manual.id}
                  onClick={() => setSelectedManual(manual)}
                  className={cn(
                    "group text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden",
                    selectedManual.id === manual.id
                      ? "bg-foreground text-background border-foreground shadow-lg scale-[1.02]"
                      : "bg-white dark:bg-neutral-900 text-foreground border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                  )}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <span className="font-semibold text-sm">{manual.title}</span>
                    {selectedManual.id === manual.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <p className={cn(
                    "text-xs mt-1.5 line-clamp-2 transition-colors",
                    selectedManual.id === manual.id ? "text-neutral-300" : "text-muted-foreground"
                  )}>
                    {manual.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* System Components (Compact) */}
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
              System Components
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-center">
                <Palette className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-muted-foreground">Semantic Color Palettes</span>
              </li>
              <li className="flex gap-3 items-center">
                <FileText className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-muted-foreground">Typography & Hierarchy</span>
              </li>
              <li className="flex gap-3 items-center">
                <Layout className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-muted-foreground">Grid & Spacer Systems</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: 3D Viewer (ISOLATED IFRAME) */}
        <div className="relative order-1 lg:order-2 w-full perspective-1000 h-[600px] lg:h-[700px]">
          <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900/50 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative z-10 group">
            <BookSlider images={selectedManual.images} />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400 pb-8 lg:pb-0">
            <Rotate3d className="w-3 h-3" />
            <span>Interactive 3D — Drag to rotate, click to flip</span>
          </div>
        </div>

      </motion.div >
    </div >
  );
}
