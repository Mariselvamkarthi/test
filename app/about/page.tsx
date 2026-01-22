"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";
import { scrollReveal } from "@/lib/motion";

export default function About() {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24">
      <motion.header
        initial={scrollReveal.hidden}
        animate={scrollReveal.visible}
        className="mb-12 sm:mb-16 md:mb-20"
      >
        <div className="max-w-4xl">
          <h1 className="text-display-xl mb-4 sm:mb-6">About</h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8">
            I design interfaces that make complex systems understandable and usable.
          </p>
          {/* Profile Image */}
          <div className="max-w-xs">
            <div className="relative w-full aspect-square rounded-sm overflow-hidden">
              <Image
                src="/images/profile/Mine.png"
                alt="Mariselvam - UI/UX Designer"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl space-y-16 sm:space-y-20">
        {/* Profile Summary */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-6">Profile Summary</h2>
          <div className="text-base leading-relaxed text-muted-foreground space-y-4">
            <p>
              Creative and logical designer with 9.5 years of experience in UI/UX, graphic, video, and product design. 
              Strong in problem-solving and simplifying complex ideas into user-friendly solutions. Quick learner with 
              curiosity for technology, detail-oriented, and committed to delivering impactful designs. I focus on 
              letting the quality of my work and problem-solving skills speak for me.
            </p>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-6">Education</h2>
          <div className="text-base leading-relaxed text-muted-foreground space-y-4">
            <div>
              <h3 className="text-display-sm mb-2 text-foreground">Bachelor of Engineering (Electrical & Electronics Engineering)</h3>
              <p className="text-muted-foreground">SVCET, Anna University | 2015</p>
            </div>
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-6">Certifications</h2>
          <div className="text-base leading-relaxed text-muted-foreground space-y-3">
            <div>
              <p className="text-foreground">• Foundations of User Experience (UX) Design</p>
            </div>
            <div>
              <p className="text-foreground">• Adobe Illustrator Certification</p>
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-6">Skills & Core Competencies</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-display-sm mb-3 text-foreground">Problem Solving & Technical Skills</h3>
              <p className="text-base text-muted-foreground">
                Logical Problem-Solving, Hardware Support, Troubleshooting, Standardization, Quick Learner.
              </p>
            </div>
            <div>
              <h3 className="text-display-sm mb-3 text-foreground">Design Principles & Tools</h3>
              <p className="text-base text-muted-foreground">
                Design Principles, Adobe Creative Suite (Photoshop, Illustrator, After Effects, Firefly), MS Office, 
                Marketing & Business Presentation Design.
              </p>
            </div>
            <div>
              <h3 className="text-display-sm mb-3 text-foreground">Graphic & Visual Design</h3>
              <p className="text-base text-muted-foreground">
                Graphic Design, Logo Design, Illustration, Creative Design, Typography, Color Theory, Motion Graphics, 
                2D Animation, Video Creation, Photography.
              </p>
            </div>
            <div>
              <h3 className="text-display-sm mb-3 text-foreground">UI/UX & Product Design</h3>
              <p className="text-base text-muted-foreground">
                User Interface Design, User-Centric Design, Human-Computer Interaction (HCI), User Experience Design, 
                User Flow, Interaction Design, Wireframes, Prototypes, Mobile & Website Mockups.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Professional Experience */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-8">Professional Experience</h2>
          <div className="space-y-12">
            {/* Girmiti Software */}
            <motion.div
              initial={scrollReveal.hidden}
              whileInView={scrollReveal.visible}
              viewport={{ once: true, margin: "-50px" }}
              className="border-l-2 border-border pl-6 sm:pl-8"
            >
              <div className="mb-2">
                <span className="text-sm font-medium text-muted-foreground">Current</span>
              </div>
              <h3 className="text-display-sm mb-1">Module Lead – UI/UX Design</h3>
              <p className="text-muted-foreground mb-4">Girmiti Software, Bangalore</p>
              <ul className="space-y-2 text-muted-foreground leading-relaxed">
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Led UI/UX design for internal payment platforms — TMS, Loyalty Platform, A&M, and Payment Gateway.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Designed concept animations, explainer videos, branding, logos, and key client screens for external projects.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Created and maintained design systems, iconography, and standardized UI components in Figma for internal projects.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Developed company brochures, business presentations, and media assets, ensuring brand consistency across all channels.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Designed Sensei SIGMA, an options trading app, including user flows, storyboards, gamified features, and recommendation dashboards.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Managed client projects such as Belema Fintech (Nigeria), designing retail mobile banking apps, logos, and selected screens using Figma.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Mentored junior designers and guided best practices in UI/UX, graphic design, Figma workflows, and design standardization.</span>
                </li>
              </ul>
            </motion.div>

            {/* MUB Technology Solutions */}
            <motion.div
              initial={scrollReveal.hidden}
              whileInView={scrollReveal.visible}
              viewport={{ once: true, margin: "-50px" }}
              className="border-l-2 border-border pl-6 sm:pl-8"
            >
              <div className="mb-2">
                <span className="text-sm font-medium text-muted-foreground">JAN 2021 – AUG 2021 (6 Months)</span>
              </div>
              <h3 className="text-display-sm mb-1">UI/UX & Graphic Designer</h3>
              <p className="text-muted-foreground mb-4">MUB Technology Solutions, Bangalore</p>
              <ul className="space-y-2 text-muted-foreground leading-relaxed">
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Designed UI for web platforms and internal dashboards in Figma, focusing on usability, visual consistency, and responsive layouts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Created social media graphics, marketing materials, and promotional content, including real estate project designs for Turkey-based clients.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Developed micro-animations and GIFs to enhance digital campaigns and website interactivity.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Collaborated with cross-functional teams to deliver functional, visually appealing, and on-brand designs within tight deadlines.</span>
                </li>
              </ul>
            </motion.div>

            {/* Aagnaa Software Labs */}
            <motion.div
              initial={scrollReveal.hidden}
              whileInView={scrollReveal.visible}
              viewport={{ once: true, margin: "-50px" }}
              className="border-l-2 border-border pl-6 sm:pl-8"
            >
              <div className="mb-2">
                <span className="text-sm font-medium text-muted-foreground">OCT 2015 – MAR 2020 (5 Years)</span>
              </div>
              <h3 className="text-display-sm mb-1">Digitization Lead</h3>
              <p className="text-muted-foreground mb-4">Aagnaa Software Labs, Bangalore</p>
              <ul className="space-y-2 text-muted-foreground leading-relaxed">
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Led digital asset creation for Magic Mirror, a fashion retail virtual try-on system using Kinect 3D scanning technology.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Converted physical fabrics (shirts, suits, sarees) into realistic digitized assets, enabling accurate virtual draping for customers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Developed standardized processes and workflows for asset creation and ensured updated inventory integration into the product database.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Collaborated with developers to align digital assets with system requirements, ensuring a seamless virtual try-on experience.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Designed marketing visuals, UI assets, and internal graphics in Figma to support product demonstrations and client presentations.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground/60 mr-3 mt-1.5">•</span>
                  <span>Streamlined digitization pipelines, improving efficiency, consistency, and turnaround time across multiple product updates.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Specialization */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-6">Specialization</h2>
          <div className="text-base leading-relaxed text-muted-foreground space-y-4">
            <p>
              I specialize in fintech and B2B products—domains where complexity is inherent
              and clarity is essential. These industries require interfaces that handle
              intricate workflows, dense information, and high-stakes decisions.
            </p>
            <p>
              In fintech, users need to understand risk, make informed choices, and execute
              actions with confidence. In B2B products, efficiency and accuracy directly impact
              business outcomes. Both demand interfaces that reduce cognitive load and prevent
              errors.
            </p>
            <p>
              I&apos;ve worked on trading platforms, financial dashboards, document management
              systems, and enterprise tools. Each project has reinforced the importance of
              clear information architecture and thoughtful interaction design.
            </p>
          </div>
        </motion.section>

        {/* Approach */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-6">Approach</h2>
          <div className="text-base leading-relaxed text-muted-foreground space-y-4">
            <p>
              I approach design problems logically, starting with understanding the problem
              before proposing solutions. This means spending time on research, user interviews,
              and data analysis. I ask questions about user goals, business objectives, and
              technical constraints.
            </p>
            <p>
              Once I understand the problem, I explore multiple solutions and evaluate them
              against clear criteria. I prefer solutions that are simple, scalable, and aligned
              with how users actually work. I avoid adding features or complexity unless they
              directly address a validated need.
            </p>
            <p>
              Collaboration is essential. I work closely with product managers to define
              requirements, with engineers to understand technical possibilities, and with
              users to validate assumptions. The best designs emerge from this collaborative
              process, not from working in isolation.
            </p>
          </div>
        </motion.section>

        {/* Design Philosophy */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-6">Design Philosophy</h2>
          <div className="text-base leading-relaxed text-muted-foreground space-y-4">
            <p>
              My design philosophy centers on clarity and usability. I believe interfaces should
              be self-explanatory—users shouldn&apos;t need training or documentation to accomplish
              their goals. This means prioritizing clear information hierarchy, consistent
              patterns, and predictable interactions.
            </p>
            <p>
              I focus on making the right information visible at the right time. This often
              means using progressive disclosure to manage complexity, showing essential
              information first and making advanced features available when needed. It also
              means using visual design to guide attention and communicate relationships
              between elements.
            </p>
            <p>
              Usability isn&apos;t just about making things easy—it&apos;s about making things efficient
              and error-resistant. I design for the tasks users perform most frequently,
              optimizing for speed and accuracy. I also design to prevent mistakes, using
              confirmation steps, clear feedback, and constraints that guide users toward
              correct actions.
            </p>
            <p>
              Finally, I believe in building systems that scale. Rather than designing one-off
              solutions, I create design systems and component libraries that ensure consistency
              and speed up development. This systematic approach benefits both users and teams.
            </p>
          </div>
        </motion.section>

        {/* What I Bring */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-display-lg mb-6">What I Bring</h2>
          <div className="text-base leading-relaxed text-muted-foreground space-y-4">
            <p>
              When I join a project, I bring a methodical approach to problem-solving,
              experience with complex domains, and a focus on clarity and usability. I can
              translate business requirements into user-centered designs, work effectively
              with cross-functional teams, and build design systems that scale.
            </p>
            <p>
              I&apos;m comfortable with ambiguity and can help define problems when requirements
              are unclear. I&apos;m also comfortable with constraints and can find creative solutions
              within technical and business limitations. Most importantly, I&apos;m focused on
              outcomes—I measure success by whether users can accomplish their goals efficiently
              and whether the product achieves its business objectives.
            </p>
          </div>
        </motion.section>

        {/* Professional Links */}
        <motion.section
          initial={scrollReveal.hidden}
          whileInView={scrollReveal.visible}
          viewport={{ once: true, margin: "-100px" }}
          className="pt-8 border-t border-border"
        >
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            You can also find my work and professional background here:
          </p>
          <div className="space-y-2">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="https://www.linkedin.com/in/mariselvam-mariappan/"
              rel="noopener noreferrer"
              className="block text-base text-foreground hover:text-primary transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.behance}
              target="https://www.behance.net/mariselvamkarthi"
              rel="noopener noreferrer"
              className="block text-base text-foreground hover:text-primary transition-colors duration-200"
            >
              Behance
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

