import { motion } from "motion/react";
import { assets } from "./Imports";
import { OrbitingCircles } from "./ui/orbiting-circles";

function ActivationDiagram() {
  return (
    <div className="relative flex h-[450px] w-[450px] flex-col items-center justify-center overflow-hidden">
      {/* Innermost Empty Circle Stroke */}
      <OrbitingCircles iconSize={30} radius={60} path={true} speed={1}>
        {/* No children, just for the stroke */}
      </OrbitingCircles>

      {/* Inner Ring Avatars */}
      <OrbitingCircles iconSize={60} radius={120} reverse speed={0.5}>
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

      {/* Outer Ring Avatars */}
      <OrbitingCircles iconSize={72} radius={190} speed={0.3}>
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
    <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-blue-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-[#0b1220] font-['Bricolage_Grotesque'] max-w-4xl mx-auto leading-tight">
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
            className="space-y-8 max-w-[420px]"
          >
            <div>
              <h3 className="text-xl md:text-[24px] font-bold text-[#0b1220] mb-5 font-['Bricolage_Grotesque'] leading-snug">
                It supports employees with real-time coaching and guides conversations toward psychological safety, clarity, and follow-through.
              </h3>
              <p className="text-lg md:text-xl text-[#0b1220] opacity-70 leading-relaxed">
                The result: you're culture shows up in the moments that matter.
              </p>
            </div>

            <div className="text-[#3b4558] space-y-5">
              <p className="text-base md:text-lg leading-relaxed">
                Your leaders don't need more reminders about what "good" looks like. They need help executing it under pressure.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Curi combines a contextually informed AI-powered private coach with our patent-pending SAFE™ Interaction Intelligence platform, providing a scalable path to land difficult conversations well.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
