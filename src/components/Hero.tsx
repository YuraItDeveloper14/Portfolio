"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const blackTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY3jP4PgfAAWpA50YlGcqAAAAAElFTkSuQmCC";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const ukraineTextRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);

  const [countries, setCountries] = useState({ features: [] });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((res) => res.json())
      .then(setCountries)
      .catch((err) => console.error("Failed to load map data", err));
  }, []);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const proxy = { lat: 20, lng: -90, alt: 1.6 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        pin: true,
      }
    });

    const updateGlobe = () => {
      if (globeRef.current) {
        globeRef.current.pointOfView({ lat: proxy.lat, lng: proxy.lng, altitude: proxy.alt });
      }
    };

    tl.to(proxy, {
      lng: 10,
      duration: 1.8,
      ease: "none",
      onUpdate: updateGlobe,
    }, 0);

    tl.to(text1Ref.current, { y: -150, opacity: 0, scale: 1.1, duration: 0.8, ease: "power2.inOut" }, 0.4);
    tl.fromTo(text2Ref.current, { opacity: 0, scale: 0.8, y: 100 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.8);
    tl.to(text2Ref.current, { y: -150, opacity: 0, scale: 1.2, duration: 0.8, ease: "power2.in" }, 1.8);
    
    tl.to(proxy, {
      lat: 49,
      lng: 32,
      alt: 0.75,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: updateGlobe,
    }, 2.0);

    tl.to(globeContainerRef.current, {
      scale: 1.25,
      duration: 1,
      ease: "power2.inOut",
    }, 2.0);

    tl.fromTo(ukraineTextRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 2.2);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const isUkraine = (d: any) => {
    return d.id === "UKR" || d.properties?.name === "Ukraine";
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      
      <div ref={globeContainerRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform">
        {windowSize.width > 0 && (
          <Globe
            ref={globeRef}
            width={windowSize.width}
            height={windowSize.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl={blackTexture}
            polygonsData={countries.features}
            polygonAltitude={(d: any) => isUkraine(d) ? 0.025 : 0.005}
            polygonCapColor={(d: any) => isUkraine(d) ? "rgba(255, 255, 255, 0.9)" : "rgba(20, 20, 20, 0.8)"}
            polygonSideColor={() => "rgba(0,0,0,0.5)"}
            polygonStrokeColor={(d: any) => isUkraine(d) ? "#ffffff" : "rgba(255, 255, 255, 0.2)"}
            showAtmosphere={true}
            atmosphereColor="#ffffff"
            atmosphereAltitude={0.15}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-[1]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 pointer-events-none">
        
        <h1
          ref={text1Ref}
          className="heading-font text-5xl md:text-[8rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-300 to-neutral-600 will-change-transform text-center leading-none"
        >
          Yurii Dmytrenko
        </h1>

        <h2
          ref={text2Ref}
          className="heading-font absolute text-4xl md:text-[5rem] font-medium tracking-tighter text-white opacity-0 will-change-transform mix-blend-difference text-center w-full uppercase"
        >
          Full-Stack Developer
        </h2>
        
        <div 
          ref={ukraineTextRef}
          className="absolute flex flex-col items-center gap-4 opacity-0 will-change-transform text-center z-20"
          style={{ top: '70%' }} 
        >
           <h3 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
             I'm from Ukraine
           </h3>
           <p className="text-neutral-400 max-w-md font-medium text-lg drop-shadow-md">
             Crafting global digital experiences from the heart of Europe.
           </p>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 flex flex-col items-center z-10 opacity-40 hover:opacity-100 transition-opacity">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent overflow-hidden">
          <div className="w-full h-1/2 bg-white animate-[scroll-down_1.5s_ease-in-out_infinite]"></div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] mt-3 text-white/50 font-sans writing-vertical-rl">Scroll</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-down {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        .writing-vertical-rl {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}} />
    </section>
  );
}
