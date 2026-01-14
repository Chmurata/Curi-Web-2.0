import imgImage from "@/assets/049d866eef659104371bc548534ae33425d02566.png";

function BackgroundShadow() {
    return (
        <div className="bg-black content-stretch flex flex-col h-[661.38px] items-start justify-center overflow-clip p-[8.702px] relative rounded-[32px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] w-[348.1px]">
            <div className="basis-0 grow min-h-px min-w-px relative rounded-[24px] shrink-0 w-full">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
                    <img alt="" className="absolute h-full left-[-28.79%] max-w-none top-0 w-[157.58%] object-cover" src={imgImage} />
                </div>
            </div>
            <div className="absolute bg-black inset-[0_37.5%_95.39%_37.5%] rounded-bl-[10px] rounded-br-[10px]" />
        </div>
    );
}

function PhoneContainer() {
    return (
        <div className="content-stretch flex items-center justify-center pb-[120.96px] pt-[120.964px] px-0 relative shrink-0 w-full">
            <div className="flex h-[366.075px] items-center justify-center relative shrink-0 w-[670.662px]">
                <div className="flex-none rotate-[91.569deg]">
                    <BackgroundShadow />
                </div>
            </div>
        </div>
    );
}

function CTAHeading() {
    return (
        <div className="md:absolute content-stretch flex flex-col font-['Bricolage_Grotesque',sans-serif] font-bold gap-[20px] md:gap-[56.985px] items-center leading-[1.1] md:leading-[0] md:left-[256px] md:right-[256px] text-[#0b1220] text-[32px] md:text-[64px] text-center text-nowrap md:top-[-0.7px]">
            <div className="flex flex-col justify-center md:leading-[57.6px] relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                <p className="mb-0">Culture shifts one</p>
                <p>conversation at a time.</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                <p className="md:leading-[57.6px] text-nowrap">Let's start yours.</p>
            </div>
        </div>
    );
}

function CTASubheading() {
    return (
        <div className="md:absolute content-stretch flex flex-col items-center md:left-[384px] md:right-[384px] md:top-[298.46px] mt-8 md:mt-0">
            <div className="flex flex-col font-['Bricolage_Grotesque',sans-serif] font-normal justify-center leading-[1.5] md:leading-[25.2px] relative shrink-0 text-[#3b4558] text-[16px] md:text-[18px] text-center md:text-nowrap px-4 md:px-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                <p className="mb-0">One great conversation won't fix culture — but thousands of</p>
                <p>practiced ones will. We help you build them.</p>
            </div>
        </div>
    );
}

function CTAButton() {
    return (
        <div className="md:absolute content-stretch flex items-start justify-center left-0 right-0 md:top-[412.75px] mt-8 md:mt-0">
            <button className="bg-[#235e9a] content-stretch flex items-center justify-center max-w-[1280px] pb-[14px] pt-[13px] px-0 relative rounded-[100px] self-stretch shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 w-[192px] hover:bg-[#1a4a7c] transition-colors cursor-pointer border-none">
                <div className="content-stretch flex flex-col items-center pb-[0.8px] pt-0 px-0 relative shrink-0">
                    <div className="flex flex-col font-['Bricolage_Grotesque',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        <p className="leading-[16.8px]">Request Demo</p>
                    </div>
                </div>
            </button>
        </div>
    );
}

function CTAContent() {
    return (
        <div className="h-auto md:h-[457.55px] relative shrink-0 w-full flex flex-col items-center">
            <CTAHeading />
            <CTASubheading />
            <CTAButton />
        </div>
    );
}

export function SolutionsCTASection() {
    return (
        <div className="content-stretch flex flex-col items-start relative size-full">
            <div className="content-stretch flex flex-col gap-[32px] items-start pb-[128px] pt-[64px] px-0 relative shrink-0 w-full">
                <PhoneContainer />
                <CTAContent />
            </div>
        </div>
    );
}
