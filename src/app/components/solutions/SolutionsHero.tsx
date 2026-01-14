import { motion } from "motion/react";
import clsx from "clsx";

// Asset imports (relative paths to src/assets)
import imgImageAppoutWebflowTemplate from "@/assets/bb121ffb25eaa7ef43ee2974e891a700ec78367c.png";
import imgImageAppoutWebflowTemplate1 from "@/assets/c40e39ee7cecb35bb9e2932518de6133c9810770.png";
import imgClientPictureAppoutWebflowTemplate from "@/assets/b05c61af5838643e01de25c22f7b60da38ed38c3.png";
import imgClientPictureAppoutWebflowTemplate1 from "@/assets/f8019f5a1bbdebf9c98de1c6d7715bd965b46caa.png";
import imgClientPictureAppoutWebflowTemplate2 from "@/assets/8f687728c9a8785bc22b765c6320b3dee4cb5d76.png";
import imgImageAppoutWebflowTemplate2 from "@/assets/1b9795aeabce1b7e0d44c80dbbfdaa7162d954ca.png";
import imgImageAppoutWebflowTemplate3 from "@/assets/fdbca831f7d5876599df907f335b46b1e154bd15.png";
import imgImageAppoutWebflowTemplate4 from "@/assets/9647ae1a36135cbd8ecdd8fb44bc1b36ca0dc953.png";
import imgImageAppoutWebflowTemplate5 from "@/assets/fe382c74dcb92ecfc87c209fa9368ab3461c5197.png";
import imgImageAppoutWebflowTemplate6 from "@/assets/27b5a2ca39a0a2bd1529908b9c55dc5c4ca54a0a.png";
import imgBorder1 from "@/assets/bf0a18ac5ecbddf6db0c697ffe7112c67a3b60a7.png";
import imgBorder2 from "@/assets/3db6d2b78d549b45224f8d1dae6ea8b46e6a87c7.png";
import imgBorder3 from "@/assets/07cdcf4c9c7dd17ce30086f5b447c47a5b543eb2.png";

// Avatar Component
function Avatar({ src, className }: { src: string; className?: string }) {
    return (
        <div className={clsx("bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[100px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] size-full scale-[1.5] sm:scale-100", className)}>
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-25%] w-full object-cover" src={src} />
                </div>
            </div>
        </div>
    );
}

export function SolutionsHero() {
    return (
        <div className="flex flex-col items-center w-full pt-[120px] pb-[100px] overflow-hidden">
            {/* Header Text */}
            <div className="flex flex-col items-center mb-[60px] text-center px-4">
                <h1 className="font-['Bricolage_Grotesque',sans-serif] font-bold text-[#0b1220] text-[48px] md:text-[64px] leading-[1.1]">
                    From Digital Workspace to<br />Human Workplace
                </h1>
                <div className="mt-8 flex flex-col items-center text-[#3b4558] text-[20px] md:text-[24px] leading-[32px] font-['Bricolage_Grotesque',sans-serif]">
                    <p>Curi is the platform designed to make this transformation a</p>
                    <p>reality.</p>
                </div>
            </div>

            {/* Animated Orbit Container with Responsive Scaling */}
            <div className="relative w-full flex justify-center h-[350px] sm:h-[480px] md:h-[640px] xl:h-[800px] overflow-visible">
                {/* Scaled Inner Container */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.4] sm:scale-[0.6] md:scale-[0.8] xl:scale-100 origin-center">
                    <div className="relative w-[868px] h-[800px] flex items-center justify-center">

                        {/* Dashed Lines (Static or Subtle Rotation) */}
                        {/* Middle Dashed Line */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                            className="absolute h-[671px] w-[672px]"
                        >
                            <img src={imgBorder1} alt="" className="w-full h-full" />
                        </motion.div>

                        {/* Inner Dashed Line */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                            className="absolute size-[490px]"
                        >
                            <img src={imgBorder2} alt="" className="w-full h-full" />
                        </motion.div>

                        {/* Innermost Dashed Line */}
                        <div className="absolute h-[343px] w-[344px]">
                            <img src={imgBorder3} alt="" className="w-full h-full" />
                        </div>


                        {/* Outer Orbit Ring (Clockwise) */}
                        <motion.div
                            className="absolute w-[672px] h-[672px] rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Item 1: Bottom Right (60 deg) */}
                            <motion.div
                                className="absolute w-[90px] h-[90px]"
                                style={{ left: '459px', top: '582px' }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgImageAppoutWebflowTemplate} />
                            </motion.div>

                            {/* Item 2: Right (0 deg) */}
                            <motion.div
                                className="absolute w-[90px] h-[90px]"
                                style={{ left: '627px', top: '291px' }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgImageAppoutWebflowTemplate1} />
                            </motion.div>

                            {/* Item 3: Top Right (300 deg) */}
                            <motion.div
                                className="absolute w-[90px] h-[90px]"
                                style={{ left: '459px', top: '0px' }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgClientPictureAppoutWebflowTemplate} />
                            </motion.div>

                            {/* Item 4: Top Left (240 deg) */}
                            <motion.div
                                className="absolute w-[90px] h-[90px]"
                                style={{ left: '123px', top: '0px' }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgClientPictureAppoutWebflowTemplate1} />
                            </motion.div>

                            {/* Item 5: Left (180 deg) */}
                            <motion.div
                                className="absolute w-[90px] h-[90px]"
                                style={{ left: '-45px', top: '291px' }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgClientPictureAppoutWebflowTemplate2} />
                            </motion.div>

                            {/* Item 6: Bottom Left (120 deg) */}
                            <motion.div
                                className="absolute w-[90px] h-[90px]"
                                style={{ left: '123px', top: '582px' }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgImageAppoutWebflowTemplate2} />
                            </motion.div>

                        </motion.div>

                        {/* Inner Orbit Ring (Counter-Clockwise) */}
                        <motion.div
                            className="absolute w-[344px] h-[344px] rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Item 1 */}
                            <motion.div
                                className="absolute left-[50%] top-[-13%] w-[90px] h-[90px] -translate-x-1/2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgImageAppoutWebflowTemplate3} />
                            </motion.div>

                            {/*QB Item 2 */}
                            <motion.div
                                className="absolute right-[-13%] top-[50%] w-[90px] h-[90px] -translate-y-1/2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgImageAppoutWebflowTemplate4} />
                            </motion.div>

                            {/* Item 3 */}
                            <motion.div
                                className="absolute left-[50%] bottom-[-13%] w-[90px] h-[90px] -translate-x-1/2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgImageAppoutWebflowTemplate5} />
                            </motion.div>

                            {/* Item 4 */}
                            <motion.div
                                className="absolute left-[-13%] top-[50%] w-[90px] h-[90px] -translate-y-1/2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            >
                                <Avatar src={imgImageAppoutWebflowTemplate6} />
                            </motion.div>

                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Info Card at bottom of Hero */}
            <div className="mt-16 w-full max-w-[1000px] px-4 z-10">
                <div className="bg-white rounded-[40px] p-[40px] md:px-[112px] md:py-[96px]">
                    <p className="text-[#3b4558] text-[16px] md:text-[18px] text-center leading-[1.6] md:leading-[1.8]">
                        {`The problem of workplace disconnection is no longer an HR issue; it's an operational reality. The digital spaces where your team works (Slack, Teams) are now your primary cultural spaces. Curi is the first platform designed to intentionally build connection, trust, and skill directly within this new digital headquarters.`}
                    </p>
                </div>
            </div>
        </div>
    );
}
