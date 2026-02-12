import { useRef, useEffect, useCallback } from "react";
import { motion, useInView, useAnimate } from "motion/react";
import curiLogo from "../../../assets/curi-logo.png";
import avatarAlex from "../../../assets/unused_avatars/process_step_1_avatar_variant_1770423629472.png";

/**
 * Scene 1: "The message you're afraid to send"
 * A persona sends a message → user starts typing a harsh reply →
 * Curi coaching bubble appears → user text rephrases.
 * Loops continuously with a pause between cycles.
 */
export function SceneMessage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.4 });
    const [scope, animate] = useAnimate();

    const runSequence = useCallback(async () => {
        try {
            // Reset all elements
            await animate(".scene-el", { opacity: 0, y: 16 }, { duration: 0 });
            await animate(".user-text-harsh", { opacity: 1 }, { duration: 0 });
            await animate(".user-text-kind", { opacity: 0 }, { duration: 0 });
            await animate(".user-cursor", { opacity: 1 }, { duration: 0 });
            await animate(".curi-check", { opacity: 0, scale: 0.5 }, { duration: 0 });

            // 0.0s — Persona message slides in
            await animate(".persona-msg", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 300));

            // 0.7s — User harsh message appears
            await animate(".user-msg", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 400));

            // 1.5s — Curi coaching bubble
            await animate(".curi-msg", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 500));

            // 2.3s — Crossfade: harsh → kind text
            await animate(".user-cursor", { opacity: 0 }, { duration: 0.15 });
            await Promise.all([
                animate(".user-text-harsh", { opacity: 0 }, { duration: 0.35 }),
                animate(".user-text-kind", { opacity: 1 }, { duration: 0.35, delay: 0.1 }),
            ]);
            await animate(".curi-check", { opacity: 1, scale: 1 }, { duration: 0.3, ease: "easeOut" });

            // Hold final state
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
                // Fade out everything before restarting
                try {
                    await animate(".scene-el", { opacity: 0 }, { duration: 0.3 });
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

                {/* Persona message — Alex */}
                <div className="scene-el persona-msg flex items-end gap-2 opacity-0" style={{ transform: "translateY(16px)" }}>
                    <img src={avatarAlex} alt="Alex" className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm" style={{ maxWidth: "300px" }}>
                        <p className="text-sm md:text-base text-[#3b4558] leading-snug font-['Bricolage_Grotesque']">
                            Can we talk about what happened in the meeting?
                        </p>
                    </div>
                </div>

                {/* User message — harsh → kind */}
                <div className="scene-el user-msg flex justify-end opacity-0" style={{ transform: "translateY(16px)" }}>
                    <div className="bg-[#0b1220] px-4 py-2.5 rounded-2xl rounded-br-sm shadow-sm relative" style={{ maxWidth: "300px" }}>
                        {/* Invisible spacer — ensures bubble is tall enough for the longer "kind" text */}
                        <p className="text-sm md:text-base text-transparent leading-snug font-['Bricolage_Grotesque'] select-none pointer-events-none" aria-hidden="true">
                            I felt caught off guard—can we align on this? ✓
                        </p>
                        {/* Harsh text (visible initially) */}
                        <p className="user-text-harsh absolute inset-x-4 top-2.5 text-sm md:text-base text-[#f2f2f7] leading-snug font-['Bricolage_Grotesque']">
                            I think you were out of li—
                            <span className="user-cursor inline-block w-0.5 h-3.5 bg-white/70 ml-0.5 animate-pulse align-middle" />
                        </p>
                        {/* Kind text (fades in after Curi coaching) */}
                        <p className="user-text-kind absolute inset-x-4 top-2.5 text-sm md:text-base text-[#f2f2f7] leading-snug font-['Bricolage_Grotesque'] opacity-0">
                            I felt caught off guard—can we align on this?
                            <motion.span className="curi-check inline-block ml-1 text-emerald-400 text-xs" style={{ opacity: 0 }}>✓</motion.span>
                        </p>
                    </div>
                </div>

                {/* Curi coaching bubble */}
                <div className="scene-el curi-msg flex items-start gap-2 opacity-0" style={{ transform: "translateY(16px)" }}>
                    <img src={curiLogo} alt="Curi" className="w-8 h-8 md:w-9 md:h-9 shrink-0 mt-0.5" />
                    <div className="bg-[#2b72ba]/8 border-l-[3px] border-[#2b72ba] px-4 py-2.5 rounded-r-xl shadow-sm" style={{ maxWidth: "320px" }}>
                        <p className="text-sm md:text-base text-[#3b4558] leading-snug font-['Bricolage_Grotesque']">
                            Try leading with how it made <span className="font-semibold">you</span> feel.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
