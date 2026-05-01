"use client";

import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Front-End Development",
    description: "Building highly interactive, responsive, and pixel-perfect user interfaces using modern frameworks like React, Next.js, and Tailwind CSS.",
  },
  {
    id: "02",
    title: "Back-End Architecture",
    description: "Designing scalable APIs, robust database structures, and secure server-side logic using Node.js, TypeScript, and modern Cloud services.",
  },
  {
    id: "03",
    title: "Premium Animations",
    description: "Creating 'wow-effect' digital experiences with fluid micro-interactions, complex scroll animations, and 3D elements using GSAP, Framer Motion, and WebGL.",
  }
];

export default function Services() {
  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-black overflow-hidden">
      
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-accent/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-purple-accent tracking-[0.2em] uppercase text-sm font-bold mb-4 block">
              What I Do
            </span>
            <h2 className="heading-font text-5xl md:text-7xl font-bold text-white tracking-tighter">
              My Expertise
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-lg">
            Delivering end-to-end solutions, from visual conceptualization to robust server architecture and flawless deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-accent/40 transition-all duration-500 overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div className="text-purple-accent/30 font-mono text-5xl font-bold group-hover:text-purple-accent transition-colors duration-500">
                  {service.id}
                </div>
                
                <div className="flex flex-col gap-4">
                  <h3 className="heading-font text-2xl font-bold text-white group-hover:text-purple-accent-light transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
