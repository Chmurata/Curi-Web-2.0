import svgPaths from "./svg-og2k9rr02p";
import clsx from "clsx";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        {children}
      </svg>
    </div>
  );
}

function Helper67F54066B825510223A031D8Icon01Svg() {
  return (
    <Wrapper>
      <g clipPath="url(#clip0_10_344)" id="67f54066b825510223a031d8_icon-01.svg">
        <path d={svgPaths.p1d9b8100} fill="var(--fill-0, black)" id="Vector" />
        <path d={svgPaths.p2d5aea00} fill="var(--fill-0, black)" id="Vector_2" />
        <path d={svgPaths.p170cf680} fill="var(--fill-0, black)" id="Vector_3" />
      </g>
      <defs>
        <clipPath id="clip0_10_344">
          <rect fill="white" height="32" width="32" />
        </clipPath>
      </defs>
    </Wrapper>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("absolute flex flex-col h-[23px] justify-center translate-y-[-50%]", additionalClassNames)}>
      <p className="leading-[22.4px]">{text}</p>
    </div>
  );
}
type HelperProps = {
  text: string;
  text1: string;
};

function Helper({ text, text1 }: HelperProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className="flex flex-col font-['Bricolage_Grotesque:Medium',sans-serif] font-medium justify-center leading-[32px] relative shrink-0 text-[32px] text-[rgba(11,18,32,0.9)] text-nowrap">
      <p className="mb-0">{text}</p>
      <p>{text1}</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-[96px] w-[1440px]" data-name="Heading 1">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[76.8px] relative shrink-0 text-[64px] text-[rgba(11,18,32,0.9)] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Moment by moment,</p>
        <p>watch your culture grow.</p>
      </div>
    </div>
  );
}

function Component67F54066B825510223A031F5Icon02Svg() {
  return (
    <Wrapper>
      <g clipPath="url(#clip0_10_341)" id="67f54066b825510223a031f5_icon-02.svg">
        <path clipRule="evenodd" d={svgPaths.pac14080} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_10_341">
          <rect fill="white" height="32" width="32" />
        </clipPath>
      </defs>
    </Wrapper>
  );
}

function Component67F54066B825510223A031F5Icon02SvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[32px]" data-name="67f54066b825510223a031f5_icon-02.svg fill">
      <Component67F54066B825510223A031F5Icon02Svg />
    </div>
  );
}

function StatsIconAppoutWebflowTemplate() {
  return (
    <div className="aspect-[32/32] content-stretch flex flex-col items-start max-w-[56px] overflow-clip relative shrink-0" data-name="Stats Icon – Appout Webflow Template">
      <Component67F54066B825510223A031F5Icon02SvgFill />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(142,88,223,0.1)] content-stretch flex items-center justify-center relative rounded-[56px] shrink-0 size-[56px]" data-name="Overlay">
      <StatsIconAppoutWebflowTemplate />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <Helper text="The message your" text1="afraid to send" />
    </div>
  );
}

function Strong() {
  return (
    <div className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold h-[41.39px] leading-[0] mb-[-21px] relative shrink-0 text-[#3b4558] text-[16px] w-[286px]" data-name="Strong">
      <Text text="without" additionalClassNames="left-[225.25px] top-[9.5px] w-[61.137px]" />
      <Text text="triggering defensiveness." additionalClassNames="left-0 top-[31.89px] w-[198.904px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[23.39px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-21px] relative shrink-0 text-[#3b4558] text-[16px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[22.4px]">Get coached to say it clearly—</p>
      </div>
      <Strong />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[40px] top-[40px] w-[330.66px]">
      <Overlay />
      <Heading1 />
      <Container />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white relative rounded-[32px] self-stretch shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 w-[410.66px]" data-name="Background+Shadow">
      <Frame />
    </div>
  );
}

function Component67F54066B825510223A031D8Icon01SvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[32px]" data-name="67f54066b825510223a031d8_icon-01.svg fill">
      <Helper67F54066B825510223A031D8Icon01Svg />
    </div>
  );
}

function StatsIconAppoutWebflowTemplate1() {
  return (
    <div className="aspect-[32/32] content-stretch flex flex-col items-start max-w-[56px] overflow-clip relative shrink-0" data-name="Stats Icon – Appout Webflow Template">
      <Component67F54066B825510223A031D8Icon01SvgFill />
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(142,88,223,0.1)] content-stretch flex items-center justify-center relative rounded-[56px] shrink-0 size-[56px]" data-name="Overlay">
      <StatsIconAppoutWebflowTemplate1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Bricolage_Grotesque:Medium',sans-serif] font-medium justify-center leading-[32px] relative shrink-0 text-[32px] text-[rgba(11,18,32,0.9)] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">The conflict that</p>
        <p className="mb-0">keeps getting</p>
        <p>postponed</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.585px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b4558] text-[16px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[22.4px] mb-0">Create a psychologically safe structure to</p>
        <p className="leading-[22.4px]">
          <span>{`address it `}</span>
          <span className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            now
          </span>
          , not later.
        </p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[40px] top-[40px] w-[330.67px]">
      <Overlay1 />
      <Heading2 />
      <Container1 />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white relative rounded-[32px] self-stretch shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 w-[410.67px]" data-name="Background+Shadow">
      <Frame1 />
    </div>
  );
}

function Component67F54066B825510223A031D8Icon01SvgFill1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[32px]" data-name="67f54066b825510223a031d8_icon-01.svg fill">
      <Helper67F54066B825510223A031D8Icon01Svg />
    </div>
  );
}

function StatsIconAppoutWebflowTemplate2() {
  return (
    <div className="aspect-[32/32] content-stretch flex flex-col items-start max-w-[56px] overflow-clip relative shrink-0" data-name="Stats Icon – Appout Webflow Template">
      <Component67F54066B825510223A031D8Icon01SvgFill1 />
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(142,88,223,0.1)] content-stretch flex items-center justify-center relative rounded-[56px] shrink-0 size-[56px]" data-name="Overlay">
      <StatsIconAppoutWebflowTemplate2 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <Helper text="The commitment that" text1="usually slips" />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.585px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[22.4px] relative shrink-0 text-[#3b4558] text-[16px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Turn “I’ll try” into a clear agreement with a</p>
        <p>date and next steps.</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[40px] top-[40px] w-[330.66px]">
      <Overlay2 />
      <Heading3 />
      <Container2 />
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-white relative rounded-[32px] self-stretch shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 w-[410.66px]" data-name="Background+Shadow">
      <Frame2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-start justify-center left-[80px] top-[314px] w-[1280px]" data-name="Container">
      <BackgroundShadow />
      <BackgroundShadow1 />
      <BackgroundShadow2 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] relative size-full to-[#c7ddf3]" data-name="Desktop - 4">
      <Heading />
      <Container3 />
    </div>
  );
}