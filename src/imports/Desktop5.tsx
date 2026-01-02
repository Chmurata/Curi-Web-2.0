import svgPaths from "./svg-xuexrl26t6";
import clsx from "clsx";
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("h-[18px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[24px] self-stretch shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type ContainerBackgroundImageAndText2Props = {
  text: string;
};

function ContainerBackgroundImageAndText2({ text }: ContainerBackgroundImageAndText2Props) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-[300px] relative shrink-0">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b4558] text-[15px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[20px]">{text}</p>
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

function BackgroundBorderShadowBackgroundImage1() {
  return (
    <div className="bg-[#235e9a] content-stretch flex flex-col items-start px-[33px] py-[17px] relative rounded-[100px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}
type ContainerBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ additionalClassNames = "" }: ContainerBackgroundImage1Props) {
  return (
    <BackgroundImage additionalClassNames="w-[84.66px]">
      <ContainerBackgroundImageAndText1 text="Download" additionalClassNames="left-[calc(50%+0.17px)] top-0" />
      <ContainerBackgroundImageAndText1 text="Download" additionalClassNames="left-[calc(50%+0.17px)] top-[18px]" />
    </BackgroundImage>
  );
}
type ContainerBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ContainerBackgroundImageAndText1({ text, additionalClassNames = "" }: ContainerBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-end translate-x-[-50%]", additionalClassNames)}>
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[18px]">{text}</p>
      </div>
    </div>
  );
}
type BackgroundBorderShadowBackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundBorderShadowBackgroundImage({ additionalClassNames = "" }: BackgroundBorderShadowBackgroundImageProps) {
  return (
    <div className={clsx("absolute bg-[#235e9a] content-stretch flex items-center justify-center p-px rounded-[52px] size-[52px] top-1/2 translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[52px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
      <ContainerBackgroundImage />
    </div>
  );
}

function ContainerBackgroundImage() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <SvgBackgroundImage />
      </div>
    </div>
  );
}

function SvgBackgroundImage() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p10b2ff80} fill="var(--fill-0, #FCFCF6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ContainerBackgroundImageAndText({ text, additionalClassNames = "" }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-center left-[32px] min-w-[300px] top-[147px]", additionalClassNames)}>
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b4558] text-[18px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[25.2px]">{text}</p>
      </div>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingBackgroundImageAndText({ text, additionalClassNames = "" }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-center left-[32px] top-[48px]", additionalClassNames)}>
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[48px] text-[rgba(11,18,32,0.9)] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[48px]">{text}</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center pb-0 pt-[16px] px-0 relative shrink-0 w-[512px]" data-name="Heading 2">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[83.2px] text-[rgba(11,18,32,0.9)] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[83.2px]">Our Plans</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pl-[45px] pr-0 py-0 top-0" data-name="Margin">
      <BackgroundBorderShadowBackgroundImage1 />
    </div>
  );
}

function Link() {
  return (
    <div className="max-w-[370.6600036621094px] relative self-stretch shrink-0 w-[247.66px]" data-name="Link">
      <BackgroundBorderShadowBackgroundImage additionalClassNames="left-[calc(50%+45.83px)]" />
      <Margin />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex items-start justify-center left-[32px] pb-0 pl-0 pr-px pt-[11px] right-[32.67px] top-[189px]" data-name="Container">
      <Link />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <ContainerBackgroundImageAndText2 text="Basic Task Automation" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <ContainerBackgroundImageAndText2 text="Natural Language Interaction" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <ContainerBackgroundImageAndText2 text="Daily Activity Summary" />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[32px] right-[32.67px] top-[302.19px]" data-name="Container">
      <Container2 />
      <Container4 />
      <Container6 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white h-[774px] min-h-[774px] relative rounded-[24px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 w-full" data-name="Background+Shadow">
      <HeadingBackgroundImageAndText text="Team" additionalClassNames="right-[32.67px]" />
      <ContainerBackgroundImageAndText text="Story and stats of learning drop off" additionalClassNames="right-[32.67px]" />
      <Container />
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <ContainerBackgroundImage2>
      <div className="absolute inset-0 opacity-0" data-name="Gradient" style={{ backgroundImage: "linear-gradient(130.602deg, rgb(47, 95, 164) 0%, rgb(62, 127, 161) 40%, rgb(79, 160, 137) 75%, rgb(87, 169, 140) 100%)" }} />
      <BackgroundShadow />
    </ContainerBackgroundImage2>
  );
}

function Container9() {
  return (
    <BackgroundImage additionalClassNames="w-[95.72px]">
      <ContainerBackgroundImageAndText1 text="Learn more" additionalClassNames="left-[calc(50%+0.14px)] top-0" />
      <ContainerBackgroundImageAndText1 text="Learn more" additionalClassNames="left-[calc(50%+0.14px)] top-[18px]" />
    </BackgroundImage>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-[#235e9a] content-stretch flex flex-col items-start px-[33px] py-[17px] relative rounded-[100px] shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
      <Container9 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pl-[45px] pr-0 py-0 top-0" data-name="Margin">
      <BackgroundBorderShadow />
    </div>
  );
}

function Link1() {
  return (
    <div className="max-w-[370.6700134277344px] relative self-stretch shrink-0 w-[258.72px]" data-name="Link">
      <BackgroundBorderShadowBackgroundImage additionalClassNames="left-[calc(50%+51.35px)]" />
      <Margin1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex items-start justify-center left-[31.67px] pb-0 pl-0 pr-px pt-[11px] right-[33px] top-[189px]" data-name="Container">
      <Link1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <ContainerBackgroundImageAndText2 text="Advanced Task Automation" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <ContainerBackgroundImageAndText2 text="Enhanced Predictive Analytics" />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <ContainerBackgroundImageAndText2 text="Priority Customer Support" />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <ContainerBackgroundImageAndText2 text="Multi-Device Sync" />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <ContainerBackgroundImageAndText2 text="Custom AI Training" />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[32px] right-[32.66px] top-[302.19px]" data-name="Container">
      <Container12 />
      <Container14 />
      <Container16 />
      <Container18 />
      <Container20 />
    </div>
  );
}

function Background() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[24px] shrink-0 w-full" data-name="Background">
      <HeadingBackgroundImageAndText text="Business" additionalClassNames="right-[32.66px]" />
      <ContainerBackgroundImageAndText text="Story and stats of AI being only 1-1" additionalClassNames="right-[32.66px]" />
      <Container10 />
      <Container21 />
    </div>
  );
}

function ListListitem() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[12px] relative rounded-[24px] self-stretch shrink-0 w-[405.333px]" data-name="List → Listitem">
      <div className="absolute inset-0 opacity-0" data-name="Gradient" style={{ backgroundImage: "linear-gradient(130.601deg, rgb(47, 95, 164) 0%, rgb(62, 127, 161) 40%, rgb(79, 160, 137) 75%, rgb(87, 169, 140) 100%)" }} />
      <Background />
    </div>
  );
}

function Margin2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pl-[45px] pr-0 py-0 top-0" data-name="Margin">
      <BackgroundBorderShadowBackgroundImage1 />
    </div>
  );
}

function Link2() {
  return (
    <div className="max-w-[370.6700134277344px] relative self-stretch shrink-0 w-[247.66px]" data-name="Link">
      <BackgroundBorderShadowBackgroundImage additionalClassNames="left-[calc(50%+45.82px)]" />
      <Margin2 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex items-start justify-center left-[31.33px] pb-0 pl-0 pr-px pt-[11px] right-[33.33px] top-[189px]" data-name="Container">
      <Link2 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <ContainerBackgroundImageAndText2 text="Basic Task Automation" />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <ContainerBackgroundImageAndText2 text="Natural Language Interaction" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]" data-name="Container">
      <SvgBackgroundImage1 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <ContainerBackgroundImageAndText2 text="Daily Activity Summary" />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[32px] right-[32.66px] top-[302.19px]" data-name="Container">
      <Container24 />
      <Container26 />
      <Container28 />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[24px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 w-full" data-name="Background+Shadow">
      <HeadingBackgroundImageAndText text="Enterprise" additionalClassNames="right-[32.66px]" />
      <ContainerBackgroundImageAndText text="Story and stats of learning drop off" additionalClassNames="right-[32.66px]" />
      <Container22 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <ContainerBackgroundImage2>
      <div className="absolute inset-0 opacity-0" data-name="Gradient" style={{ backgroundImage: "linear-gradient(130.601deg, rgb(47, 95, 164) 0%, rgb(62, 127, 161) 40%, rgb(79, 160, 137) 75%, rgb(87, 169, 140) 100%)" }} />
      <BackgroundShadow1 />
    </ContainerBackgroundImage2>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <ListListitem />
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[91px] items-center left-1/2 top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[1280px]" data-name="Container">
      <Heading />
      <Container31 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] relative size-full to-[#c7ddf3]" data-name="Desktop - 5">
      <Container32 />
    </div>
  );
}