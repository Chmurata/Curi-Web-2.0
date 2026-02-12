import { useRef, useEffect, useCallback } from "react";
import { useInView, useAnimate } from "motion/react";
import curiLogo from "../../../assets/curi-logo.png";

/**
 * Scene 2: "The conflict that keeps getting postponed"
 * Notification card with Snooze/Address Now → Curi nudge →
 * Address Now highlights → card morphs into 3-step framework.
 * Loops continuously.
 */
export function SceneConflict() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.4 });
    const [scope, animate] = useAnimate();

    const runSequence = useCallback(async () => {
        try {
            // Reset
            await animate(".scene-el", { opacity: 0, y: 16 }, { duration: 0 });
            await animate(".notif-card", { opacity: 1 }, { duration: 0 });
            await animate(".framework-card", { opacity: 0, scale: 0.95 }, { duration: 0 });
            await animate(".btn-snooze", { opacity: 1 }, { duration: 0 });
            await animate(".btn-address", { scale: 1, boxShadow: "none" }, { duration: 0 });
            await animate(".step-item", { opacity: 0, x: -10 }, { duration: 0 });

            // 0.0s — Notification slides in
            await animate(".notif-card", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 400));

            // 0.8s — Curi nudge
            await animate(".curi-msg", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
            await new Promise((r) => setTimeout(r, 500));

            // 1.6s — Snooze fades, Address highlights
            await Promise.all([
                animate(".btn-snooze", { opacity: 0.3 }, { duration: 0.3 }),
                animate(".btn-address", { scale: 1.05, boxShadow: "0 0 0 2px #2b72ba" }, { duration: 0.3 }),
            ]);
            await new Promise((r) => setTimeout(r, 300));

            // 2.2s — Notification morphs to framework
            await animate(".notif-card", { opacity: 0, scale: 0.95 }, { duration: 0.25 });
            await animate(".framework-card", { opacity: 1, scale: 1 }, { duration: 0.3, ease: "easeOut" });

            // Steps stagger in
            const steps = scope.current?.querySelectorAll(".step-item");
            if (steps) {
                for (let i = 0; i < steps.length; i++) {
                    await animate(steps[i] as Element, { opacity: 1, x: 0 }, { duration: 0.25, ease: "easeOut" });
                }
            }

            // Hold
            await new Promise((r) => setTimeout(r, 2000));
        } catch {
            // animation interrupted
        }
    }, [animate, scope]);

    useEffect(() => {
        if (!isInView) return;
        let cancelled = false;

        const loop = async () => {
            while (!cancelled) {
                await runSequence();
                if (cancelled) break;
                try {
                    await animate(".scene-el", { opacity: 0 }, { duration: 0.3 });
                    await animate(".framework-card", { opacity: 0 }, { duration: 0.3 });
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
            <div ref={scope} className="flex flex-col gap-4 w-full px-5 py-6 md:px-8 md:py-8 items-center" style={{ maxWidth: "420px" }}>

                {/* Notification card */}
                <div className="scene-el notif-card w-full bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-4 opacity-0" style={{ transform: "translateY(16px)" }}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded bg-amber-100 flex items-center justify-center">
                            <span className="text-xs">📋</span>
                        </div>
                        <p className="text-sm md:text-base text-[#0b1220] font-semibold font-['Bricolage_Grotesque'] leading-tight">
                            Feedback conversation with Jordan
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn-snooze px-4 py-2 text-sm font-medium text-[#3b4558] bg-gray-100 rounded-lg font-['Bricolage_Grotesque']">
                            Snooze ⏰
                        </button>
                        <button className="btn-address px-4 py-2 text-sm font-medium text-white bg-[#2b72ba] rounded-lg font-['Bricolage_Grotesque']">
                            Address Now →
                        </button>
                    </div>
                </div>

                {/* Framework card (hidden initially) */}
                <div className="framework-card w-full bg-white border border-[#2b72ba]/20 rounded-xl shadow-sm px-5 py-4 opacity-0 absolute" style={{ maxWidth: "calc(420px - 2.5rem)" }}>
                    <p className="text-sm font-semibold text-[#2b72ba] mb-2.5 font-['Bricolage_Grotesque']">✦ Guided Framework</p>
                    <div className="flex flex-col gap-1.5">
                        <div className="step-item opacity-0 flex items-start gap-2">
                            <span className="text-xs text-[#2b72ba] font-bold mt-0.5">1.</span>
                            <p className="text-sm md:text-base text-[#3b4558] font-['Bricolage_Grotesque']">"Here's what I noticed..."</p>
                        </div>
                        <div className="step-item opacity-0 flex items-start gap-2">
                            <span className="text-xs text-[#2b72ba] font-bold mt-0.5">2.</span>
                            <p className="text-sm md:text-base text-[#3b4558] font-['Bricolage_Grotesque']">"Here's the impact..."</p>
                        </div>
                        <div className="step-item opacity-0 flex items-start gap-2">
                            <span className="text-xs text-[#2b72ba] font-bold mt-0.5">3.</span>
                            <p className="text-sm md:text-base text-[#3b4558] font-['Bricolage_Grotesque']">"What's your perspective?"</p>
                        </div>
                    </div>
                </div>

                {/* Curi coaching bubble */}
                <div className="scene-el curi-msg flex items-start gap-2 w-full opacity-0" style={{ transform: "translateY(16px)" }}>
                    <img src={curiLogo} alt="Curi" className="w-8 h-8 md:w-9 md:h-9 shrink-0 mt-0.5" />
                    <div className="bg-[#2b72ba]/8 border-l-[3px] border-[#2b72ba] px-4 py-2.5 rounded-r-xl shadow-sm" style={{ maxWidth: "320px" }}>
                        <p className="text-sm md:text-base text-[#3b4558] leading-snug font-['Bricolage_Grotesque']">
                            This has been postponed <span className="font-semibold">3 times</span>.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
