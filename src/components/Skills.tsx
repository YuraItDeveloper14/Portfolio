"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const skillsRow1 = [
  "React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"
];
const skillsRow2 = [
  "Node.js", "Express.js", "NestJS", "Python", "Django", "PostgreSQL", "MongoDB", "Supabase", "Firebase", "Redis"
];
const skillsRow3 = [
  "Docker", "AWS", "Vercel", "Git", "GitHub Actions", "Jest", "Cypress", "GraphQL", "REST APIs", "Prisma"
];

const getMarqueeItems = (arr: string[]) => [...arr, ...arr, ...arr];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      className="w-full py-24 bg-black overflow-hidden flex flex-col gap-6"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12 w-full">
        <span className="text-white tracking-[0.2em] uppercase text-sm font-bold block">
          Arsenal
        </span>
        <h2 className="heading-font text-5xl md:text-6xl font-bold text-white tracking-tighter mt-4">
          Technologies & Tools
        </h2>
      </div>

      <div className="relative w-full flex flex-col gap-4 md:gap-6 mt-10">
        
        {/* Row 1 - Left to Right */}
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            className="flex whitespace-nowrap gap-4 md:gap-6 w-max"
            animate={{
              x: ["0%", "-33.33%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {getMarqueeItems(skillsRow1).map((skill, i) => (
              <SkillBadge key={`r1-${i}`} text={skill} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            className="flex whitespace-nowrap gap-4 md:gap-6 w-max"
            animate={{
              x: ["-33.33%", "0%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35, 
            }}
          >
            {getMarqueeItems(skillsRow2).map((skill, i) => (
              <SkillBadge key={`r2-${i}`} text={skill} outline />
            ))}
          </motion.div>
        </div>

        {/* Row 3 - Left to Right */}
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            className="flex whitespace-nowrap gap-4 md:gap-6 w-max"
            animate={{
              x: ["0%", "-33.33%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30, 
            }}
          >
            {getMarqueeItems(skillsRow3).map((skill, i) => (
              <SkillBadge key={`r3-${i}`} text={skill} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillBadge({ text, outline = false }: { text: string, outline?: boolean }) {
  return (
    <div 
      className={`px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center justify-center min-w-max transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:border-white cursor-default
      ${outline 
        ? "bg-transparent border border-white/20 text-white/70" 
        : "bg-neutral-900 border border-transparent text-white/90 shadow-lg shadow-black"
      }`}
    >
      <span className="heading-font text-lg md:text-xl font-medium tracking-tight">
        {text}
      </span>
    </div>
  );
}
