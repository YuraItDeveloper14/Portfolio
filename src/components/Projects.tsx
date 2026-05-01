"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "E-COMMERCE PLATFORM",
    category: "Full-Stack Web App",
    description: "A comprehensive digital storefront built for high performance and seamless user experience. Features include real-time inventory management, secure payments, and an intuitive admin dashboard.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Supabase"]
  },
  {
    id: "02",
    title: "AI SAAS DASHBOARD",
    category: "Artificial Intelligence",
    description: "An advanced platform that leverages machine learning models to generate high-quality visual assets. Includes subscription management, user quotas, and a sleak dark-mode interface.",
    tech: ["React", "Python", "FastAPI", "Replicate API", "Framer Motion"]
  },
  {
    id: "03",
    title: "FINTECH TRACKER",
    category: "Financial Technology",
    description: "A real-time cryptocurrency and portfolio tracking application. Provides live market data, interactive candlestick charts, and secure user authentication.",
    tech: ["Vue.js", "Node.js", "WebSockets", "MongoDB", "Chart.js"]
  },
  {
    id: "04",
    title: "SOCIAL AUDIO APP",
    category: "Mobile-First PWA",
    description: "A community-focused audio broadcasting platform. Users can create rooms, host live discussions, and interact via voice in real-time with low latency.",
    tech: ["Next.js", "WebRTC", "Socket.io", "Redis", "TypeScript"]
  }
];

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-dark-surface overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-accent/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-20 flex flex-col gap-4">
          <span className="text-purple-accent tracking-[0.2em] uppercase text-sm font-bold block">
            Selected Work
          </span>
          <h2 className="heading-font text-5xl md:text-7xl font-bold text-white tracking-tighter">
            Favourite Projects
          </h2>
          <p className="text-neutral-400 max-w-xl text-lg mt-4">
            A selection of my recent full-stack applications focused on premium user experiences, robust architecture, and sleek design. <br className="hidden md:block"/> And much more to come.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`group overflow-hidden rounded-2xl transition-all duration-500 border ${
                openIndex === index 
                ? "border-purple-accent/50 bg-white/[0.04] shadow-[0_0_30px_rgba(139,92,246,0.1)]" 
                : "border-white/5 bg-transparent hover:border-white/20 hover:bg-white/[0.02]"
              }`}
            >
              {/* Header / Clickable Area */}
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 cursor-pointer text-left"
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span className={`font-mono text-xl md:text-2xl transition-colors duration-300 ${openIndex === index ? "text-purple-accent" : "text-neutral-600 group-hover:text-neutral-400"}`}>
                    {project.id}
                  </span>
                  <h3 className={`heading-font text-2xl md:text-4xl font-bold tracking-tight transition-all duration-300 ${openIndex === index ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
                    {project.title}
                  </h3>
                </div>
                
                {/* Arrow Icon */}
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${openIndex === index ? "border-purple-accent bg-purple-accent/10 text-purple-accent rotate-180" : "border-white/10 text-neutral-500 group-hover:text-white group-hover:border-white/30"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    <div className="p-6 md:p-8 pt-0 pl-6 md:pl-[6.5rem] flex flex-col gap-6">
                      
                      <div className="flex flex-col gap-2">
                         <span className="text-purple-accent-light text-sm font-medium uppercase tracking-wider">{project.category}</span>
                         <p className="text-neutral-300 text-lg md:text-xl max-w-3xl leading-relaxed">
                           {project.description}
                         </p>
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tech.map((techItem, i) => (
                          <span 
                            key={i} 
                            className="px-4 py-1.5 rounded-full bg-black/50 border border-white/10 text-neutral-400 text-sm font-medium"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>
                      
                      {/* Optional Action Button */}
                      <div className="mt-4">
                        <button className="text-white flex items-center gap-2 group/btn font-medium uppercase tracking-widest text-sm hover:text-purple-accent transition-colors">
                          View Project
                          <span className="block w-6 h-[1px] bg-white group-hover/btn:bg-purple-accent group-hover/btn:w-10 transition-all duration-300"></span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
