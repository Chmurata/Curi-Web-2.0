import { useRef, useEffect, useCallback } from "react";
import { motion, useInView, useAnimate } from "motion/react";
import curiLogo from "../../../assets/curi-logo.png";
import avatarSam from "../../../assets/b05c61af5838643e01de25c22f7b60da38ed38c3.png";

/**
 * Scene 3: "The commitment that usually slips"
 * Sam asks about report → user says "I'll try" →
 * Curi challenges → vague reply morphs into commitment pill.
 * Loops continuously.
 */
export function SceneCommitment() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.4 });
    const [scope, animate] = useAnimate();

    const runSequence = useCallback(async () => {
        try {
            // Reset
            await animate(".scene-el", { opacity: 0, y: 16 }, { duration: 0 });
            await animate(".user-vague", { opacity: 1 }, { duration: 0 });
            await animate(".commit-pill", { opacity: 0, scale: 0.9 }, { duration: 0 });
            await animate(".pill-check", { opacity: 0, scale: 0.5 }, { duration: 0 });

            // 0.0s — Sam's message
            await animate(".sam-msg", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 200));

            // 0.5s — User vague reply
            await animate(".user-msg", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 400));

            // 1.2s — Curi challenge
            await animate(".curi-msg", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 500));

            // 2.0s — Vague text dissolves, commitment pill appears
            await animate(".user-vague", { opacity: 0 }, { duration: 0.25 });
            await animate(".commit-pill", { opacity: 1, scale: 1 }, { duration: 0.35, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 150));
            await animate(".pill-check", { opacity: 1, scale: 1 }, { duration: 0.25, ease: "easeOut" });

            // Hold
            await new Promise((r) => setTimeout(r, 2000));
        } catch {
            // animation interrupted
        }
    }, [animate]);

    useEffect(() => {
        if (!isInView) return;
        let cancelled = false;

        const loop = async () => {
            while (!cancelled) {
                await runSequence();
                if (cancelled) break;
                try {
                    await animate(".scene-el", { opacity: 0 }, { duration: 0.3 });
                    await animate(".commit-pill", { opacity: 0 }, { duration: 0.2 });
                    await new Promise((r) => setTimeout(r, 800));
                } catch {
                    break;
                }
            }
        };

        loop();
        return () => { cancelled = true; };
    }, [isInView, runSequence, animate]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0f5fa] to-[#e8eef5]"
            style={{ minHeight: "200px", borderRadius: 'clamp(16px, 2.5vw, 32px)' }}
        >
            <div ref={scope} className="flex flex-col gap-4 w-full px-5 py-6 md:px-8 md:py-8" style={{ maxWidth: "420px" }}>

                {/* Sam's message */}
                <div className="scene-el sam-msg flex items-end gap-2 opacity-0" style={{ transform: "translateY(16px)" }}>
                    <img src={avatarSam} alt="Sam" className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm" style={{ maxWidth: "300px" }}>
                        <p className="text-sm md:text-base text-[#3b4558] leading-snug font-['Bricolage_Grotesque']">
                            Can you get the report done?
                        </p>
                    </div>
                </div>

                {/* User vague reply + commitment pill (stacked, absolute) */}
                <div className="scene-el user-msg flex justify-end opacity-0 relative" style={{ transform: "translateY(16px)" }}>
                    {/* Vague text */}
                    <div className="user-vague bg-[#0b1220] px-4 py-2.5 rounded-2xl rounded-br-sm shadow-sm" style={{ maxWidth: "300px" }}>
                        <p className="text-sm md:text-base text-[#f2f2f7] leading-snug font-['Bricolage_Grotesque']">
                            Yeah I'll try to get to it.
                        </p>
                    </div>
                    {/* Commitment pill (replaces vague) */}
                    <motion.div
                        className="commit-pill absolute inset-0 flex justify-end"
                        style={{ opacity: 0 }}
                    >
                        <div className="bg-white border-2 border-emerald-400 px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-2" style={{ maxWidth: "320px" }}>
                            <span className="text-sm">📌</span>
                            <p className="text-sm md:text-base text-[#3b4558] leading-snug font-['Bricolage_Grotesque']">
                                Q3 Report → Oct 18 → You
                            </p>
                            <motion.span className="pill-check text-emerald-500 font-bold text-sm" style={{ opacity: 0 }}>✓</motion.span>
                        </div>
                    </motion.div>
                </div>

                {/* Curi coaching bubble */}
                <div className="scene-el curi-msg flex items-start gap-2 opacity-0" style={{ transform: "translateY(16px)" }}>
                    <img src={curiLogo} alt="Curi" className="w-8 h-8 md:w-9 md:h-9 shrink-0 mt-0.5" />
                    <div className="bg-[#2b72ba]/8 border-l-[3px] border-[#2b72ba] px-4 py-2.5 rounded-r-xl shadow-sm" style={{ maxWidth: "320px" }}>
                        <p className="text-sm md:text-base text-[#3b4558] leading-snug font-['Bricolage_Grotesque']">
                            Make it <span className="font-semibold">specific</span> and trackable.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
