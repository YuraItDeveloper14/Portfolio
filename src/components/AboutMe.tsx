"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description: "Started my journey in web development, mastering HTML, CSS, and basic JavaScript. Built my first static landing pages.",
  },
  {
    year: "2022",
    title: "Front-End Focus",
    description: "Dove deep into React and the modern frontend ecosystem. Started creating interactive, responsive user interfaces.",
  },
  {
    year: "2023",
    title: "Full-Stack Transition",
    description: "Expanded into back-end technologies with Node.js, Next.js, and databases. Delivered my first end-to-end full-stack applications.",
  },
  {
    year: "Present",
    title: "Crafting Experiences",
    description: "Focusing on performance, premium animations (GSAP, Framer), and robust architectures to build award-winning digital experiences.",
  }
];

export default function AboutMe() {
  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <span className="text-white tracking-[0.2em] uppercase text-sm font-bold mb-4 block">
            About Me
          </span>
          <h2 className="heading-font text-5xl md:text-7xl font-bold text-white tracking-tighter">
            My Journey
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/50 via-white/10 to-transparent -translate-x-1/2"></div>

          <div className="flex flex-col gap-12 md:gap-24">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-white -translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 hover:border-white/30 transition-colors backdrop-blur-sm group">
                      <span className="text-white font-mono text-xl md:text-2xl font-bold block mb-2">{milestone.year}</span>
                      <h3 className="heading-font text-2xl font-semibold text-white mb-3 group-hover:text-neutral-300 transition-colors">{milestone.title}</h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
