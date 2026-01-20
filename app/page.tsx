"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CasePreviewCard } from "@/components/ui/CasePreviewCard";
import { getAllCaseStudies } from "@/data/case-studies";
import { staggerContainer, scrollReveal } from "@/lib/motion";

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateMatch = () => setIsDesktop(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  const enableParallax = isDesktop && !prefersReducedMotion;

  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroImageRef,
    offset: ["start end", "end start"],
  });
  const heroImageY = useTransform(heroScrollY, [0, 1], [0, -20]);

  const whatIDoRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: whatIDoScrollY } = useScroll({
    target: whatIDoRef,
    offset: ["start end", "end start"],
  });
  const whatIDoBgY = useTransform(whatIDoScrollY, [0, 1], [-12, 12]);

  const featuredRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: featuredScrollY } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  const featuredBgY = useTransform(featuredScrollY, [0, 1], [-10, 10]);

  // Add error boundary for data loading
  let caseStudies: ReturnType<typeof getAllCaseStudies> = [];
  try {
    caseStudies = getAllCaseStudies();
  } catch (error) {
    console.error("Error loading case studies:", error);
    caseStudies = [];
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] flex items-center">
        <div className="grid lg:grid-cols-[40%_60%] gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto w-full relative">
          {/* Hero background depth layer (desktop only) */}
          {enableParallax && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-[-120px] right-[-160px] w-[420px] rounded-full bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl opacity-70"
              style={{ y: heroImageY }}
            />
          )}
          {/* Left Column: Content (40% width, left-aligned) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Name - Strongest visual weight */}
            <motion.div variants={scrollReveal} className="mb-4 sm:mb-5">
              <h1 className="text-display-2xl font-bold tracking-tight leading-[1.1]">
                Mariselvam
              </h1>
            </motion.div>

            {/* Role Line - Accent color emphasis */}
            <motion.div variants={scrollReveal} className="mb-5 sm:mb-6">
              <p className="text-lg sm:text-xl md:text-2xl text-accent font-normal tracking-normal leading-relaxed">
                UI/UX Designer · Product Thinker · Problem Solver
              </p>
            </motion.div>

            {/* Statement - Calm, readable (2 lines) */}
            <motion.div variants={scrollReveal} className="mb-6 sm:mb-8">
              <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed max-w-[520px] font-normal">
                I design <span className="font-medium text-foreground">clarity</span> for complex fintech and enterprise systems.
              </p>
            </motion.div>

            {/* CTAs - Clear but secondary, horizontal */}
            <motion.div variants={scrollReveal} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button href="/work" variant="primary">
                View Work
              </Button>
              <Button href="/resume" variant="secondary">
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image (60% width, edge-aligned, parallax) */}
          <motion.div
            ref={heroImageRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:flex items-center justify-end"
            style={enableParallax ? { y: heroImageY } : undefined}
          >
            <div className="relative w-full max-w-[500px] xl:max-w-[600px] aspect-[4/5] xl:aspect-[3/4]">
              {/* Hero Image - Expressive, part of canvas */}
              <Image
                src="/images/profile/Mine.png"
                alt="Mariselvam - UI/UX Designer"
                fill
                className="object-cover opacity-95"
                priority
                sizes="(max-width: 1280px) 500px, 600px"
              />
            </div>
          </motion.div>

          {/* Mobile: Profile Image (below content) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden flex justify-center mt-8 sm:mt-10"
          >
            <div className="relative w-full max-w-[280px] aspect-[4/5]">
              <Image
                src="/images/profile/Mine.png"
                alt="Mariselvam - UI/UX Designer"
                fill
                className="object-cover opacity-95"
                priority
                sizes="(max-width: 640px) 280px, 320px"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I Do Best Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-24 md:py-32">
        <div ref={whatIDoRef} className="relative">
          {enableParallax && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-120px] -top-40 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_65%)] blur-3xl opacity-70"
              style={{ y: whatIDoBgY }}
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-display-xl mb-12 sm:mb-16 md:mb-20">What I Do Best</h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-display-md mb-4">Simplifying Complexity</h3>
              <p className="text-muted-foreground leading-relaxed">
                Breaking down intricate financial workflows and enterprise systems into clear, 
                actionable interfaces that users can navigate with confidence.
              </p>
            </motion.div>

            <motion.div
              initial={scrollReveal.hidden}
              whileInView={scrollReveal.visible}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...scrollReveal.visible.transition, delay: 0.1 }}
            >
              <h3 className="text-display-md mb-4">Problem-First Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Starting with user problems and business goals, not trends. Every design decision 
                is grounded in research, data, and real user needs.
              </p>
            </motion.div>

            <motion.div
              initial={scrollReveal.hidden}
              whileInView={scrollReveal.visible}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...scrollReveal.visible.transition, delay: 0.15 }}
            >
              <h3 className="text-display-md mb-4">Scalable UI Systems</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building design systems and component libraries that grow with products, ensuring 
                consistency and speed across teams and features.
              </p>
            </motion.div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Case Studies Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-24 md:py-32">
        <div ref={featuredRef} className="relative">
          {enableParallax && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-160px] -top-32 h-72 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.24),_transparent_70%)] blur-3xl opacity-80"
              style={{ y: featuredBgY }}
            />
          )}

          <motion.div
            initial={scrollReveal.hidden}
            whileInView={scrollReveal.visible}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-display-xl mb-12 sm:mb-16 md:mb-20">Featured Work</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {caseStudies && caseStudies.length > 0 ? (
              caseStudies
                .slice(0, 4)
                .filter((caseStudy) => caseStudy) // Filter out any undefined/null
                .map((caseStudy) => {
                // Extract problem statement from first section or use positioning
                const problem =
                  caseStudy.sections.find((s) => s.title === "Problem Statement" || s.title === "Overview")
                    ?.content || caseStudy.positioning;

                return (
                  <CasePreviewCard
                    key={caseStudy.slug}
                    slug={caseStudy.slug}
                    title={caseStudy.title}
                    problem={typeof problem === "string" ? problem : caseStudy.positioning}
                    domain={caseStudy.meta.domain}
                    platform={caseStudy.meta.platform}
                  />
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No case studies available.</p>
              </div>
            )}
          </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
