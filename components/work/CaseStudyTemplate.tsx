"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { CaseStudyHeader } from "./CaseStudyHeader";
import { scrollReveal, arrowSlide } from "@/lib/motion";
import { getAllCaseStudies } from "@/data/case-studies";

interface CaseStudySection {
  title: string;
  content: string | ReactNode;
}

interface CaseStudyTemplateProps {
  title: string;
  subtitle?: string;
  positioning: string;
  meta: {
    role: string;
    domain: string;
    platform: string;
    duration?: string;
    market?: string;
  };
  sections: CaseStudySection[];
  outcome?: string;
}

// Component that only shows image if it exists (returns null on error)
function CaseStudyImage({
  slug,
  imageName,
  alt,
  size = "medium",
}: {
  slug: string;
  imageName: string;
  alt: string;
  size?: "medium" | "large";
}) {
  const [imageExists, setImageExists] = useState<boolean | null>(null);
  
  // Try common image extensions
  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp"];
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    // Check if image exists by trying to load it
    const checkImage = async () => {
      for (const ext of imageExtensions) {
        const path = `/images/case-studies/${slug}/${imageName}${ext}`;
        const img = new window.Image();
        
        const loadPromise = new Promise<boolean>((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = path;
        });

        const exists = await loadPromise;
        if (exists) {
          setCurrentPath(path);
          setImageExists(true);
          return;
        }
      }
      setImageExists(false);
    };

    checkImage();
  }, [slug, imageName]);

  // Don't render anything while checking or if image doesn't exist
  if (imageExists === false || imageExists === null || !currentPath) {
    return null;
  }

  const aspectClass = "aspect-video";
  const heightClass = size === "large" ? "min-h-[400px]" : "min-h-[300px]";

  return (
    <div className={`mt-8 relative w-full ${aspectClass} ${heightClass} rounded-sm overflow-hidden`}>
      <Image
        src={currentPath}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
      />
    </div>
  );
}

export function CaseStudyTemplate({
  title,
  subtitle,
  positioning,
  meta,
  sections,
  outcome,
}: CaseStudyTemplateProps) {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  return (
    <article className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24">
      {/* Header */}
      <CaseStudyHeader
        title={title}
        subtitle={subtitle}
        positioning={positioning}
        meta={meta}
      />

      {/* Sections */}
      <div className="max-w-4xl space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
        {sections.map((section, index) => (
          <motion.section
            key={`${section.title}-${index}`}
            initial={scrollReveal.hidden}
            whileInView={scrollReveal.visible}
            viewport={{ once: true, margin: "-100px" }}
            className="scroll-mt-20"
          >
            <h2 className="text-display-lg mb-6 sm:mb-8">{section.title}</h2>
            <div className="text-base leading-relaxed text-muted-foreground [&_h3]:text-display-sm [&_h3]:text-foreground [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-semibold [&_h4]:text-lg [&_h4]:text-foreground [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:font-medium [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ol]:ml-4 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono">
              {typeof section.content === "string" ? (
                <p className="leading-8">{section.content}</p>
              ) : (
                section.content
              )}
            </div>
            
            {/* Conditional Images - Only show if image exists */}
            {section.title === "Constraints & Considerations" && (
              <CaseStudyImage
                slug={slug}
                imageName="constraints-diagram"
                alt="System Constraints Diagram"
              />
            )}
            {section.title === "UX Solution" && (
              <CaseStudyImage
                slug={slug}
                imageName="solution-example"
                alt="Key Screen / Flow Example"
                size="large"
              />
            )}
          </motion.section>
        ))}
      </div>

            {/* Outcome Section */}
            {outcome && (
              <motion.section
                initial={scrollReveal.hidden}
                whileInView={scrollReveal.visible}
                viewport={{ once: true, margin: "-100px" }}
                className="scroll-mt-20 mt-20 sm:mt-24"
              >
          <h2 className="text-display-lg mb-8">Outcome</h2>
          <div className="text-base leading-relaxed text-muted-foreground">
            <p className="leading-8">{outcome}</p>
          </div>
        </motion.section>
      )}

      {/* Navigation Section */}
      <CaseStudyNavigation currentSlug={slug} />
    </article>
  );
}

// Navigation component for case study pages
function CaseStudyNavigation({ currentSlug }: { currentSlug: string }) {
  const allCaseStudies = getAllCaseStudies();
  const currentIndex = allCaseStudies.findIndex((study) => study.slug === currentSlug);
  const nextCaseStudy = currentIndex >= 0 && currentIndex < allCaseStudies.length - 1 
    ? allCaseStudies[currentIndex + 1] 
    : null;
  const remainingCaseStudies = allCaseStudies.filter((_, index) => index !== currentIndex);

  if (remainingCaseStudies.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={scrollReveal.hidden}
      whileInView={scrollReveal.visible}
      viewport={{ once: true, margin: "-100px" }}
      className="mt-24 sm:mt-32 pt-16 sm:pt-20 border-t border-border"
    >
      <div className="max-w-4xl space-y-12">
        {/* Next Project */}
        {nextCaseStudy && (
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Next Project
            </p>
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={arrowSlide}
            >
              <Link
                href={`/work/${nextCaseStudy.slug}`}
                className="group block"
              >
                <h2 className="text-display-xl mb-3 group-hover:text-primary transition-colors duration-200">
                  {nextCaseStudy.title}
                </h2>
                {nextCaseStudy.subtitle && (
                  <p className="text-lg text-muted-foreground mb-4">
                    {nextCaseStudy.subtitle}
                  </p>
                )}
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  {nextCaseStudy.positioning}
                </p>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 inline-flex items-center gap-1">
                  View Case Study
                  <span className="inline-block">→</span>
                </span>
              </Link>
            </motion.div>
          </div>
        )}

        {/* All Remaining Projects */}
        {remainingCaseStudies.length > 0 && (
          <div>
            <h3 className="text-display-lg mb-8">
              {nextCaseStudy ? "More Projects" : "All Projects"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {remainingCaseStudies
                .filter((study) => !nextCaseStudy || study.slug !== nextCaseStudy.slug)
                .map((study) => (
                  <motion.div
                    key={study.slug}
                    initial={scrollReveal.hidden}
                    whileInView={scrollReveal.visible}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group"
                  >
                    <Link
                      href={`/work/${study.slug}`}
                      className="block py-4 border-b border-border hover:border-foreground/20 transition-colors duration-200"
                    >
                      <h4 className="text-display-sm mb-2 group-hover:text-primary transition-colors duration-200">
                        {study.title}
                      </h4>
                      {study.subtitle && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {study.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {study.positioning}
                      </p>
                      <motion.span
                        className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
                        initial="rest"
                        whileHover="hover"
                        variants={arrowSlide}
                      >
                        View Case Study
                        <span className="inline-block">→</span>
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
