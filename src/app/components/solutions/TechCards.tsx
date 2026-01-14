import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { svgPaths } from "./svgPaths";

// Card Data
const cardsData = [
    {
        id: 1,
        title: "Intelligent Task Automation",
        description: "Automate repetitive and time-consuming tasks with ease. The app intelligently identifies patterns in your workflow and handles tasks like scheduling, data entry, and reminders.",
        iconPaths: [svgPaths.p393c8300],
        color: "#E8F0FE", // Light Blue
    },
    {
        id: 2,
        title: "Predictive Analytics",
        description: "Leverage powerful predictive analytics to make data-driven decisions. The app analyzes past data and trends to forecast outcomes, helping you anticipate challenges and opportunities.",
        iconPaths: [svgPaths.p1d9b8100, svgPaths.p2d5aea00, svgPaths.p170cf680],
        color: "#F3E8FF", // Light Purple
    },
    {
        id: 3,
        title: "Personalized Insights",
        description: "Receive tailored insights based on your behavior and preferences. The AI app learns from your interactions and provides suggestions to optimize your workflow.",
        iconPaths: [svgPaths.p19ac6780, svgPaths.p33d3e600],
        color: "#FFF7ED", // Light Orange
    },
    {
        id: 4,
        title: "Seamless Integration",
        description: "Connect effortlessly with your favorite tools and platforms. The AI app integrates with your existing software ecosystem, ensuring a smooth and unified workflow.",
        iconPaths: [svgPaths.p1585800],
        color: "#F0FDF4", // Light Green
    },
    {
        id: 5,
        title: "Customizable Workflows",
        description: "Design workflows that suit your unique needs. The app allows you to create custom automation rules and processes, ensuring that it adapts perfectly to your way of working.",
        iconPaths: [svgPaths.p2b10c2f0],
        color: "#FEF2F2", // Light Red
    },
    {
        id: 6,
        title: "Real-Time Data Analysis",
        description: "Gain immediate insights with real-time data analysis. The app processes data as it comes in, providing you with up-to-the-minute information and trends.",
        iconPaths: [svgPaths.p3679fe00],
        color: "#F0F9FF", // Light Sky
    },
];

// Reusable Card Component
const CardContent = ({ data }: { data: typeof cardsData[0] }) => {
    return (
        <div className="bg-white rounded-[40px] p-[32px] md:p-[48px] h-full flex flex-col items-start gap-6 relative overflow-hidden group transition-all duration-500">
            {/* Ambient Background Gradient */}
            <div
                className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20 blur-3xl transition-transform duration-700 group-hover:scale-150"
                style={{ backgroundColor: data.color }}
            />

            {/* Icon */}
            <div
                className="w-[64px] h-[64px] rounded-[20px] flex items-center justify-center shrink-0 relative z-10 transition-colors duration-500"
                style={{ backgroundColor: data.color }}
            >
                <svg className="w-[32px] h-[32px]" viewBox="0 0 32 32" fill="none">
                    {data.iconPaths.map((path, i) => (
                        <path key={i} d={path} fill="#0b1220" fillOpacity="0.8" fillRule="evenodd" clipRule="evenodd" />
                    ))}
                </svg>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 relative z-10">
                <h3 className="text-[#0b1220] font-['Bricolage_Grotesque',sans-serif] font-bold text-[24px] md:text-[32px] leading-tight">
                    {data.title}
                </h3>
                <p className="text-[#3b4558] font-['Bricolage_Grotesque',sans-serif] text-[16px] md:text-[18px] leading-relaxed opacity-100">
                    {data.description}
                </p>
            </div>
        </div>
    );
};

// Stacked Card Logic
const StackedCard = ({
    data,
    index,
    total,
    scrollYProgress,
    rangeOffset
}: {
    data: typeof cardsData[0];
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
    rangeOffset: number;
}) => {
    // Calculate the trigger range for this specific card
    // Each card takes up a slice of the scroll progress
    const step = 1 / total;
    const start = index * step;
    const end = start + step;

    // Movement: Slide up from bottom
    // We want the card to arrive at its final position (0) when scroll hits 'start'
    // Actually, for a stack, we usually want:
    // Card 0 starts at 0.
    // Card 1 slides UP over Card 0 as we scroll.

    // Let's try a different approach:
    // All cards start off-screen (except maybe first?).
    // As we scroll, they stack.

    // Logic:
    // Enter phase: Card slides in from bottom.
    // Active phase: Card is in view.
    // Exit phase (optional): Card scales down as next one covers it.

    // Using a simpler range mapping based on global scroll
    // Card i enters between (i-1)/total and i/total

    const cardScrollStart = (index - 1) / total;
    const cardScrollEnd = index / total; // Fully visible here

    // Slide In Animation
    const y = useTransform(
        scrollYProgress,
        [Math.max(0, cardScrollStart), cardScrollEnd],
        index === 0 ? [0, 0] : [window.innerHeight, 0], // First card stays, others slide in
        { clamp: true }
    );

    // Scale Down Animation (when next card covers it)
    const nextCardStart = index / total;
    const nextCardEnd = (index + 1) / total;

    const scale = useTransform(
        scrollYProgress,
        [nextCardStart, nextCardEnd],
        [1, index === total - 1 ? 0.95 : 0.95 - (index * 0.01)], // Reduced shrink for last card
        { clamp: true }
    );

    // Dynamic Z-Index
    const zIndex = index + 1;

    return (
        <motion.div
            style={{
                top: 0,
                scale, // Apply scale for depth effect
                y: index === 0 ? 0 : y, // First card doesn't slide y, acts as base? Or maybe it does?
                // Let's make first card static base, others slide over.
                zIndex,
            }}
            className="absolute w-full h-[400px] origin-top"
        >
            <CardContent data={data} />
        </motion.div>
    );
};


export function TechCards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <section className="relative w-full z-[20]">
            <div ref={containerRef} className="h-[400vh] w-full relative"> {/* Taller track for scrolling */}

                <div className="sticky top-0 h-screen overflow-hidden w-full flex flex-col items-center justify-center">
                    <div className="w-full max-w-[1400px] px-4 md:px-8 flex flex-col items-center h-full pt-[60px] pb-[40px]">

                        {/* Title Section */}
                        <div className="text-center mb-4 md:mb-12 shrink-0 z-50 py-4 rounded-3xl px-8">
                            <h2 className="text-[36px] md:text-[64px] font-bold text-[#0b1220] leading-[1.1] font-['Bricolage_Grotesque',sans-serif]">
                                The Technology<br />That Unleashes Your Culture
                            </h2>
                        </div>

                        {/* Card Stack Container */}
                        <div className="relative w-full max-w-sm md:max-w-4xl h-[400px] md:h-[450px] flex items-center justify-center mt-4">
                            {cardsData.map((card, i) => (
                                <StackedCard
                                    key={card.id}
                                    data={card}
                                    index={i}
                                    total={cardsData.length}
                                    scrollYProgress={scrollYProgress}
                                    rangeOffset={i}
                                />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
