import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { assets } from "./Imports";
import { OrbitingCircles } from "./ui/orbiting-circles";

function ActivationDiagram() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setScale(1); // Full size
      } else if (width >= 1024) {
        setScale(0.85); // Laptop
      } else if (width >= 768) {
        setScale(0.7); // Tablet
      } else {
        setScale(0.65); // Mobile / Small Tablet
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Base dimensions
  const containerSize = 500 * scale;

  return (
    // Container sizing updates based on scale, preventing layout overlap
    <div
      className="relative flex flex-col items-center justify-center transition-all duration-300 ease-out"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`
      }}
    >
      {/* Innermost Ring (1st Stroke) */}
      <OrbitingCircles
        iconSize={72 * scale}
        radius={65 * scale}
        reverse
        path={true}
        speed={1}
        startAngle={45}
      >
        {[
          assets.activationImg9,
          assets.activationImg10,
          assets.activationImg1,
          assets.activationImg8,
        ].map((img, i) => (
          <div key={i} className="w-full h-full rounded-full overflow-hidden shadow-lg">
            <img src={img} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </OrbitingCircles>

      {/* Middle Ring Empty (2nd Stroke) */}
      <OrbitingCircles
        iconSize={30 * scale}
        radius={125 * scale}
        path={true}
        speed={0.5}
      >
        {/* No children */}
      </OrbitingCircles>

      {/* Outer Ring Avatars (3rd Stroke) */}
      <OrbitingCircles
        iconSize={80 * scale}
        radius={175 * scale}
        speed={0.3}
        path={true}
      >
        {[
          assets.activationImg2,
          assets.activationImg3,
          assets.activationImg4,
          assets.activationImg5,
          assets.activationImg6,
          assets.activationImg7,
        ].map((img, i) => (
          <div key={i} className="w-full h-full rounded-full overflow-hidden shadow-lg">
            <img src={img} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </OrbitingCircles>
    </div>
  );
}

export function ActivationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center h-full">

          {/* Title - Fluid Typography (60px max, 48px min) */}
          <div
            className="text-center shrink-0 relative z-20 max-w-4xl mx-auto"
            style={{ marginBottom: 'clamp(2rem, 4vw, 5rem)' }}
          >
            <h2
              className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              Curi is the activation layer <br className="hidden sm:block" />
              between your values and behavior.
            </h2>
          </div>

          {/* Content Group - Switches to stacked at sm (640px) */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center w-full relative z-10"
            style={{ gap: 'clamp(1rem, 3vw, 3rem)' }}
          >
            {/* Diagram - JS-based scalable sizing */}
            <div className="flex justify-center shrink-0 sm:order-first">
              <ActivationDiagram />
            </div>

            {/* Text Content - Fluid width */}
            <div
              className="space-y-4 sm:space-y-6"
              style={{ maxWidth: 'clamp(300px, 40vw, 480px)' }}
            >
              <div>
                <h3
                  className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-snug"
                  style={{
                    fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)',
                    marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)'
                  }}
                >
                  It supports employees with real-time coaching and guides conversations toward psychological safety, clarity, and follow-through.
                </h3>
                <p
                  className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-snug"
                  style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}
                >
                  The result: you're culture shows up in the moments that matter.
                </p>
              </div>

              <div
                className="text-[#3b4558] space-y-3 sm:space-y-4"
                style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1.125rem)' }}
              >
                <p className="leading-relaxed">
                  Your leaders don't need more reminders about what "good" looks like. They need help executing it under pressure.
                </p>
                <p className="leading-relaxed">
                  Curi combines a contextually informed AI-powered private coach with our patent-pending SAFE™ Interaction Intelligence platform, providing a scalable path to land difficult conversations well.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
