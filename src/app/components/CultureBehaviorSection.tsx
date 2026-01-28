import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { assets } from "./Imports";
import { RoundedArrowButton } from "./ui/RoundedArrowButton";

export function CultureBehaviorSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"], // Adjusted for natural scroll
    });


    // Content Animation - REMOVED (Static content)

    // Parallax Effect for Phone (Replicated from SayDoGapSection)
    // Optimized: Reduced scale/movement
    const phoneScale = useTransform(scrollYProgress, [0.2, 0.8], [0.97, 1.0]);
    const phoneY = useTransform(scrollYProgress, [0.1, 0.9], [30, -30]);

    return (
        <section ref={containerRef} className="relative w-full py-24 md:py-32 lg:py-40">
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-7xl px-6 md:px-20 lg:px-32 flex flex-col items-center justify-center h-full">

                    {/* Static Heading */}
                    <div className="text-center mb-12 md:mb-16 lg:mb-20 shrink-0 relative z-20">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
                            How does culture become behavior?
                            <span className="block mt-2 leading-tight text-[#3b4558] text-3xl md:text-[36px] lg:text-[40px]">(without more training)</span>
                        </h2>
                    </div>

                    {/* Content - Static Entry */}
                    <div
                        className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full relative z-10"
                    >
                        <div className="flex justify-center lg:justify-end order-1 lg:order-1">
                            <motion.div
                                style={{ scale: phoneScale, y: phoneY }}
                                className="will-change-transform"
                            >
                                <div
                                    className="relative w-[240px] h-[460px] md:w-[300px] md:h-[575px] bg-black rounded-[40px] shadow-2xl border-8 border-black overflow-hidden"
                                >
                                    <img src={assets.oneConversationPhoneBg} className="w-full h-full object-cover" alt="App Screen" />
                                    {/* Standardized Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Text */}
                        <div className="space-y-2 md:space-y-3 lg:space-y-4 order-2 lg:order-2">
                            <h3 className="text-3xl md:text-[36px] lg:text-[40px] font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
                                One (effective) conversation<br />
                                at a time.
                            </h3>

                            <div className="space-y-1.5 md:space-y-2 lg:space-y-3 text-[#3b4558] text-sm md:text-base font-['Bricolage_Grotesque']">
                                <p>
                                    Curi intervenes in the <span className="font-bold">moments</span> where culture usually breaks: hard feedback, conflict, and commitments.
                                </p>
                                <p>
                                    Real change happens when people feel safe enough to be honest. Curi creates a flywheel effect that drives this environment through a simple, powerful cycle:
                                </p>
                                <ul className="space-y-1 md:space-y-1.5 lg:space-y-2 text-sm md:text-base">
                                    <li><span className="font-bold">1. Ignite Confidence:</span> People speak up sooner when they trust the conversation won't go off the rails.</li>
                                    <li><span className="font-bold">2. Create Safety:</span> Curi "whispers in your ear" before a message lands wrong.</li>
                                    <li><span className="font-bold">3. Drive Accountability:</span> Curi pushes vague promises into clear commitments.</li>
                                    <li><span className="font-bold">4. Realize Culture:</span> Interactions align with values in practice.</li>
                                </ul>
                            </div>

                            <RoundedArrowButton>Learn More</RoundedArrowButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
