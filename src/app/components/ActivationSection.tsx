import { motion } from "motion/react";
import { assets } from "./Imports";
import { OrbitingCircles } from "./ui/orbiting-circles";

function ActivationDiagram() {
  return (
    // Container sized to fit orbits: outer radius 140 + icon 56/2 = 168, so need ~360px diameter
    <div className="relative flex h-[360px] w-[360px] md:h-[420px] md:w-[420px] lg:h-[450px] lg:w-[450px] flex-col items-center justify-center">
      {/* Innermost Empty Circle Stroke - scaled radii */}
      <OrbitingCircles iconSize={24} radius={48} path={true} speed={1}>
        {/* No children, just for the stroke */}
      </OrbitingCircles>

      {/* Inner Ring Avatars - scaled */}
      <OrbitingCircles iconSize={48} radius={90} reverse speed={0.5}>
        {[
          assets.activationImg9,
          assets.activationImg10,
          assets.activationImg1,
        ].map((img, i) => (
          <div key={i} className="w-full h-full rounded-full overflow-hidden shadow-lg">
            <img src={img} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </OrbitingCircles>

      {/* Outer Ring Avatars - scaled */}
      <OrbitingCircles iconSize={56} radius={140} speed={0.3}>
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
  return (
    // Standardized to px-6 for better breathing room on mobile
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-8 bg-gradient-to-b from-transparent via-blue-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8 lg:mb-12"
        >
          {/* Title scaled down for mobile */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] max-w-4xl mx-auto leading-tight">
            Curi is the activation layer between your values and behavior.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
          <div className="flex justify-center">
            <ActivationDiagram />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6 lg:space-y-8 max-w-[420px]"
          >
            <div>
              {/* Scaled down text for mobile */}
              <h3 className="text-base md:text-lg lg:text-xl xl:text-[24px] font-bold text-[#0b1220] mb-3 md:mb-5 font-['Bricolage_Grotesque'] leading-snug">
                It supports employees with real-time coaching and guides conversations toward psychological safety, clarity, and follow-through.
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#0b1220] opacity-70 leading-relaxed">
                The result: you're culture shows up in the moments that matter.
              </p>
            </div>

            <div className="text-[#3b4558] space-y-3 md:space-y-4 lg:space-y-5">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                Your leaders don't need more reminders about what "good" looks like. They need help executing it under pressure.
              </p>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                Curi combines a contextually informed AI-powered private coach with our patent-pending SAFE™ Interaction Intelligence platform, providing a scalable path to land difficult conversations well.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
