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
        <section
            ref={containerRef}
            className="relative w-full"
            style={{ padding: 'clamp(4rem, 8vw, 10rem) 0' }}
        >
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center h-full">

                    {/* Static Heading */}
                    <div
                        className="text-center shrink-0 relative z-20"
                        style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
                    >
                        <h2
                            className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
                        >
                            How does culture become behavior?
                            <span
                                className="block mt-2 leading-tight text-[#3b4558]"
                                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                            >
                                (without more training)
                            </span>
                        </h2>
                    </div>

                    {/* Content - Static Entry */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center w-full relative z-10"
                        style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}
                    >
                        <div className="flex justify-center sm:justify-end order-1 sm:order-1">
                            <motion.div
                                style={{ scale: phoneScale, y: phoneY }}
                                className="will-change-transform"
                            >
                                <div
                                    className="relative bg-black rounded-[40px] shadow-2xl border-8 border-black overflow-hidden"
                                    style={{
                                        width: 'clamp(230px, 22vw, 280px)',
                                        height: 'clamp(440px, 42vw, 540px)'
                                    }}
                                >
                                    <img src={assets.oneConversationPhoneBg} className="w-full h-full object-cover" alt="App Screen" />
                                    {/* Standardized Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Text */}
                        <div
                            className="space-y-2 sm:space-y-4 order-2 sm:order-2 text-left"
                            style={{ maxWidth: 'clamp(300px, 45vw, 500px)' }}
                        >
                            <h3
                                className="font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight"
                                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                            >
                                One (effective) conversation<br />
                                at a time.
                            </h3>

                            <div
                                className="text-[#3b4558] font-['Bricolage_Grotesque']"
                                style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                            >
                                <p className="mb-2 sm:mb-3">
                                    Curi intervenes in the <span className="font-bold">moments</span> where culture usually breaks: hard feedback, conflict, and commitments.
                                </p>
                                <p className="mb-2 sm:mb-3">
                                    Real change happens when people feel safe enough to be honest. Curi creates a flywheel effect that drives this environment through a simple, powerful cycle:
                                </p>
                                <ul className="space-y-1 sm:space-y-2">
                                    <li><span className="font-bold">1. Ignite Confidence:</span> People speak up sooner when they trust the conversation won't go off the rails.</li>
                                    <li><span className="font-bold">2. Create Safety:</span> Curi "whispers in your ear" before a message lands wrong.</li>
                                    <li><span className="font-bold">3. Drive Accountability:</span> Curi pushes vague promises into clear commitments.</li>
                                    <li><span className="font-bold">4. Realize Culture:</span> Interactions align with values in practice.</li>
                                </ul>
                            </div>

                            <div className="pt-2">
                                <RoundedArrowButton>Learn More</RoundedArrowButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
