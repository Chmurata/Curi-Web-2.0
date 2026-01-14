// About Page - Migrated from standalone About Us Page
// Uses shared Header/Footer from main site

import clsx from "clsx";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "../components/Reveal";
import { InfiniteMarquee } from "../components/InfiniteMarquee";
import { OneConversationSection } from "../components/OneConversationSection";
import { AnimatedPhone } from "../components/AnimatedPhone";
import { RoundedArrowButton } from "../components/ui/RoundedArrowButton";

// Asset imports (relative paths to src/assets)
import imgScreenshot from "@/assets/fb0b22f9cc0b1ee5707d50d462ef6c1a4ab63ad0.png";
import imgPortrait1 from "@/assets/3982c6338f1f9ed9f63b4b955abba43823765b55.png";
import imgPortrait2 from "@/assets/33d6b0087ad0db618491a22467b7fc99b0109762.png";
import imgPortrait3 from "@/assets/6e65abf3d08a75f0b69c8620ea99867692ca6d09.png";
import imgPhone1 from "@/assets/ed5a3991e9a23e2efc5fa5df7dfa35629c5b235e.png";
import imgImageBackground from "@/assets/d8cc5c016b9dfc65fdbfa78e7133d7c594fccc5f.png";
import imgPhone2 from "@/assets/dc50ad3cb84ed9976d3eb68813f0c5566c0be249.png";
import imgPhone3 from "@/assets/049d866eef659104371bc548534ae33425d02566.png";
import imgPortrait4 from "@/assets/9647ae1a36135cbd8ecdd8fb44bc1b36ca0dc953.png";
import imgPortrait5 from "@/assets/c40e39ee7cecb35bb9e2932518de6133c9810770.png";
import imgPortrait6 from "@/assets/fe382c74dcb92ecfc87c209fa9368ab3461c5197.png";
import imgPortrait7 from "@/assets/fdbca831f7d5876599df907f335b46b1e154bd15.png";

// SVG Paths
const svgPaths = {
    p10b2ff80: "M12.0028 7.06066L5.54784 13.5156L4.48718 12.455L10.9421 6H5.2528V4.5H13.5028V12.75H12.0028V7.06066Z",
    p33191000: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z",
};

// --- Helper Components ---

function ImageBackgroundImage({ children }: React.PropsWithChildren<object>) {
    return (
        <div className="basis-0 grow min-h-px min-w-px relative rounded-[24px] shrink-0 w-full">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">{children}</div>
        </div>
    );
}

type HeadingBackgroundImageAndTextProps = {
    text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
    return (
        <div className="content-stretch flex flex-col items-start pb-0 pt-[16px] px-0 relative shrink-0 w-full">
            <div className="flex flex-col font-['Bricolage_Grotesque',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-3xl md:text-5xl lg:text-[64px] text-[rgba(11,18,32,0.9)] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                <p className="leading-tight lg:leading-[64px]">{text}</p>
            </div>
        </div>
    );
}

function SvgBackgroundImage1() {
    return (
        <div className="relative shrink-0 size-[24px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="SVG">
                    <path d={svgPaths.p33191000} fill="var(--fill-0, #3B4558)" id="Vector" />
                </g>
            </svg>
        </div>
    );
}

type BackgroundImageAndTextProps = {
    text: string;
    additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
    return (
        <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col justify-center leading-[0] relative shrink-0 text-[#3b4558] text-nowrap", additionalClassNames)}>
            <p className="leading-[20px]">{text}</p>
        </div>
    );
}

// --- Header Section ---

function VisionHeading() {
    return (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
            <div className="flex flex-col font-['Bricolage_Grotesque',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-4xl md:text-7xl lg:text-[96px] text-[rgba(11,18,32,0.9)] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                <p className="leading-tight md:leading-[96px]">Our vision:</p>
            </div>
        </div>
    );
}

function VisionSubheading() {
    return (
        <div className="content-stretch flex flex-col items-center pb-[0.88px] pt-0 px-0 relative shrink-0 w-full">
            <div className="flex flex-col font-['Bricolage_Grotesque',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#3b4558] text-base md:text-[19.2px] text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                <p className="leading-normal md:leading-[26.88px]">To ensure every digital workspace is a truly human workplace</p>
            </div>
        </div>
    );
}

function HeroTextContainer() {
    return (
        <div className="flex flex-col gap-[9px] items-center pb-0 pt-[128px] px-4 relative shrink-0 w-full max-w-[1280px] mx-auto text-center">
            <VisionHeading />
            <VisionSubheading />
        </div>
    );
}

// Photo overlays for marquee
function OverlayShadow({ src, size }: { src: string; size: "small" | "large" }) {
    const sizeClass = size === "small" ? "size-[140px] md:size-[224px]" : "size-[200px] md:size-[320px]";
    return (
        <div className={`bg-[rgba(255,255,255,0)] overflow-clip relative rounded-[24px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 ${sizeClass}`}>
            <img alt="" className="w-full h-full object-cover object-center" src={src} />
        </div>
    );
}

function PhotoMarquee() {
    return (
        <div className="absolute h-[220px] md:h-[320px] left-0 overflow-clip right-[0.02px] top-[144px]">
            <InfiniteMarquee speed={120}>
                <OverlayShadow src={imgScreenshot} size="small" />
                <OverlayShadow src={imgPortrait1} size="large" />
                <OverlayShadow src={imgPortrait2} size="small" />
                <OverlayShadow src={imgPortrait3} size="large" />
                <OverlayShadow src={imgPortrait4} size="small" />
                <OverlayShadow src={imgPortrait5} size="large" />
                <OverlayShadow src={imgPortrait6} size="small" />
                <OverlayShadow src={imgPortrait7} size="large" />
            </InfiniteMarquee>
        </div>
    );
}

function PhoneDisplay() {
    return (
        <div className="absolute bg-black content-stretch flex flex-col h-[500px] md:h-[608px] items-start justify-center left-[50%] overflow-clip p-[8px] rounded-[32px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] top-0 w-[260px] md:w-[320px] translate-x-[-50%]">
            <ImageBackgroundImage>
                <img alt="" className="absolute h-full left-[-102.91%] max-w-none top-0 w-[305.81%]" src={imgPhone1} />
            </ImageBackgroundImage>
            {/* Standardized Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black w-[80px] h-[24px] rounded-b-[12px] z-20" />
        </div>
    );
}

function HeroPhoneSection() {
    return (
        <div className="h-[500px] md:h-[608px] relative shrink-0 w-full overflow-hidden">
            <PhotoMarquee />
            <PhoneDisplay />
        </div>
    );
}

function AboutHeader() {
    return (
        <div className="content-stretch flex flex-col gap-[64px] items-center overflow-clip pb-0 pt-0 px-0 relative shrink-0 w-full">
            <HeroTextContainer />
            <HeroPhoneSection />
        </div>
    );
}

// --- Mission Statement Section ---

function MissionSection() {
    return (
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full max-w-[768px] px-6">
            <Reveal>
                <div className="flex flex-col font-['Bricolage_Grotesque',sans-serif] font-normal justify-center leading-[25.2px] relative shrink-0 text-[#3b4558] text-base md:text-[18px] text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    <p>
                        The problem of workplace disconnection is no longer an HR issue; it's an operational reality. The digital spaces where your team works (Slack, Teams) are now your primary cultural spaces. Curi is the first platform designed to intentionally build connection, trust, and skill directly within this new digital headquarters.
                    </p>
                </div>
            </Reveal>
        </div>
    );
}

// --- What We Do Section ---



function WhatWeDoContent() {
    return (
        <div className="flex flex-col gap-6 md:gap-8 items-start w-full max-w-2xl lg:max-w-[500px]">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
                What We Do
            </h2>
            <div className="flex flex-col gap-4 text-[#3b4558] text-base md:text-lg leading-relaxed font-['Bricolage_Grotesque']">
                <p className="font-bold">Building AI That Works for You</p>
                <p>
                    Our AI app is designed to revolutionize the way you work, think, and live. By leveraging cutting-edge technology, we provide tools that automate routine tasks, offer personalized insights, and make data-driven decisions more accessible.
                </p>
            </div>
            <div className="pt-4">
                <RoundedArrowButton>Learn More</RoundedArrowButton>
            </div>
        </div>
    );
}

function WhatWeDoSection() {
    return (
        <div className="relative shrink-0 w-full">
            <Reveal className="size-full">
                <div className="flex flex-col lg:flex-row items-center size-full gap-16 lg:gap-0">
                    <div className="content-stretch flex flex-col lg:flex-row gap-16 lg:gap-[152px] items-center lg:pl-[120px] lg:pr-[112px] py-0 relative w-full px-6">
                        <AnimatedPhone src={imgImageBackground} className="w-full" />
                        <WhatWeDoContent />
                    </div>
                </div>
            </Reveal>
        </div>
    );
}

// --- Our Values Section ---

function ValueItem({ text }: { text: string }) {
    return (
        <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
            <SvgBackgroundImage1 />
            <BackgroundImageAndText text={text} additionalClassNames="font-['Bricolage_Grotesque',sans-serif] font-semibold text-[17px]" />
        </div>
    );
}

function OurValuesContent() {
    return (
        <div className="flex flex-col gap-6 md:gap-8 items-start w-full max-w-2xl lg:max-w-[500px]">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b1220] font-['Bricolage_Grotesque'] leading-tight">
                Our Values
            </h2>
            <div className="flex flex-col gap-4 text-[#3b4558] text-base md:text-lg leading-relaxed font-['Bricolage_Grotesque']">
                <p>
                    At the core of everything we do are our values. We prioritize innovation, constantly exploring new ways to enhance our app and deliver value to our users. Integrity guides our actions; we are committed to transparency, security, and ethical AI practices.
                </p>
                <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center gap-3">
                        <div className="size-6 rounded-full bg-[#0b1220] flex items-center justify-center shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <span className="font-bold">Innovation</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="size-6 rounded-full bg-[#0b1220] flex items-center justify-center shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <span className="font-bold">Integrity</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="size-6 rounded-full bg-[#0b1220] flex items-center justify-center shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <span className="font-bold">User-Centric Design</span>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <RoundedArrowButton>Browse Features</RoundedArrowButton>
            </div>
        </div >
    );
}

function OurValuesSection() {
    return (
        <div className="relative shrink-0 w-full">
            <Reveal className="size-full">
                <div className="flex flex-col lg:flex-row items-center size-full gap-16 lg:gap-0">
                    <div className="content-stretch flex flex-col-reverse lg:flex-row gap-16 lg:gap-[152px] items-center lg:pl-[112px] lg:pr-[120px] py-0 relative w-full px-6">
                        <OurValuesContent />
                        <AnimatedPhone src={imgPhone2} className="w-full" />
                    </div>
                </div>
            </Reveal>
        </div>
    );
}

// --- Main Export ---

export function AboutPage() {

    return (
        <div className="content-stretch flex flex-col gap-[43px] items-center w-full">
            {/* Main Content */}
            <div className="content-stretch flex flex-col gap-[214.1px] items-center relative shrink-0 w-full">
                <AboutHeader />
                <MissionSection />
                <div className="content-stretch flex flex-col gap-32 md:gap-[407.4px] items-start pb-[120px] md:pb-[270.2px] pt-[80px] md:pt-[193.1px] px-0 relative shrink-0 w-full max-w-[1280px] mx-auto">
                    <WhatWeDoSection />
                    <OurValuesSection />
                </div>
            </div>

            {/* CTA Section - Using animated version from home page */}
            <OneConversationSection />
        </div>
    );
}

