import svgPaths from "./svg-z8uiojtx20";
import clsx from "clsx";
import imgImage from "../assets/180d0e4b8fd9cc92290d85c1e7220a60ef007b21.png";
import imgImage1 from "../assets/a87b6e31d19b84d3d28ffafb7c1ff55676d717b3.png";
import imgImage2 from "../assets/e1696e5e1a9d71a1b9a77c99672b7e3a773995fb.png";
import imgImage3 from "../assets/f996cfd275080f9ad778cc0bc158c0ff78e865d2.png";

function Image1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative rounded-[48px] shrink-0 size-[48px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[48px]">{children}</div>
    </div>
  );
}

function BackgroundShadow4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white min-h-[340px] relative rounded-[32px] shrink-0 w-full">
      <div className="min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[22px] items-start min-h-[inherit] pb-[59.62px] pt-[48px] px-[40px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">{children}</g>
      </svg>
    </div>
  );
}
type ContainerTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ContainerText({ text, additionalClassNames = "" }: ContainerTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-end left-[calc(50%+0.07px)] translate-x-[-50%]", additionalClassNames)}>
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[18px]">{text}</p>
      </div>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphText({ text, additionalClassNames = "" }: ParagraphTextProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col justify-center relative shrink-0", additionalClassNames)}>
      <p className="leading-[20px] text-nowrap">{text}</p>
    </div>
  );
}
type Container1Props = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Container1({ text, text1, additionalClassNames = "" }: Container1Props) {
  return (
    <div className={clsx("content-stretch flex flex-col items-start pl-0 py-0 relative shrink-0", additionalClassNames)}>
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[20px] relative shrink-0 text-[#0d0d0d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">{text}</p>
        <p>{text1}</p>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b4558] text-[19.2px] text-nowrap">
      <p className="leading-[20px]">{text}</p>
    </div>
  );
}
type LinkTextProps = {
  text: string;
};

function LinkText({ text }: LinkTextProps) {
  return (
    <div className="content-stretch flex items-start pb-[0.8px] pt-0 px-0 relative shrink-0">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#235e9a] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[16.8px]">{text}</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <Wrapper>
      <path d={svgPaths.p292b64f0} fill="var(--fill-0, #FAB05E)" id="Vector" />
    </Wrapper>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-1/2 pb-0 pt-[9px] px-0 top-[186px] translate-x-[-50%] w-[1280px]" data-name="Heading 2">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[83.2px] text-[rgba(11,18,32,0.9)] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[83.2px]">HR Pros Get Us.</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[18px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      {[...Array(5).keys()].map((_, i) => (
        <Container key={i} />
      ))}
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[78.38px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal h-[79px] justify-center leading-[19.6px] left-0 text-[#3b4558] text-[14px] top-[38.89px] translate-y-[-50%] w-[227.04px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">{`"I’ve worked with too many`}</p>
        <p className="mb-0">employees who feel trapped when</p>
        <p className="mb-0">they’re in conflict at work. It</p>
        <p>affects their mental health, their…</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start pb-[1.2px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <LinkText text="See More" />
    </div>
  );
}

function Image() {
  return (
    <Image1>
      <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
    </Image1>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[20px] relative shrink-0 text-[#0d0d0d] text-[12px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">{`Founder & CEO, The Wounded`}</p>
        <p>Workforce</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative self-stretch shrink-0" data-name="Container">
      <Text text="Stephanie Lemek" />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Container">
      <Image />
      <Container6 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <BackgroundShadow4>
      <Container2 />
      <Container4 />
      <Container7 />
    </BackgroundShadow4>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[275px] pointer-events-auto sticky top-0" data-name="Container">
      <BackgroundShadow />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[18px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      {[...Array(5).keys()].map((_, i) => (
        <Container9 key={i} />
      ))}
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[78.38px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal h-[79px] justify-center leading-[19.6px] left-0 text-[#3b4558] text-[14px] top-[38.89px] translate-y-[-50%] w-[230.04px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">{`"In my experience, the most`}</p>
        <p className="mb-0">successful workplaces are built on</p>
        <p className="mb-0">strong relationships and proactive</p>
        <p>communication. Too often, conflic…</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start pb-[1.2px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <LinkText text="See More" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative self-stretch shrink-0" data-name="Container">
      <Text text="Kristen Carden" />
      <Container1 text="Founder, Former SVP, HR," text1="Nordstrom" additionalClassNames="pr-[27.78px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Container">
      <Image1>
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage1} />
      </Image1>
      <Container13 />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <BackgroundShadow4>
      <Container10 />
      <Container12 />
      <Container14 />
    </BackgroundShadow4>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[275px] pointer-events-auto sticky top-0" data-name="Container">
      <BackgroundShadow1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[18px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      {[...Array(5).keys()].map((_, i) => (
        <Container16 key={i} />
      ))}
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[78.38px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal h-[79px] justify-center leading-[19.6px] left-0 text-[#3b4558] text-[14px] top-[38.89px] translate-y-[-50%] w-[217.98px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">{`"In my work with clients, I’ve seen`}</p>
        <p className="mb-0">the same pattern over and over</p>
        <p className="mb-0">again. Leaders think their teams</p>
        <p>are running smoothly, only to…</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start pb-[1.2px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <LinkText text="See More" />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative self-stretch shrink-0" data-name="Container">
      <Text text="Belma McCaffrey" />
      <Container1 text="Principal Consultant, CEO," text1="Executive Coach" additionalClassNames="pr-[23.95px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Container">
      <Image1>
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage2} />
      </Image1>
      <Container20 />
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <BackgroundShadow4>
      <Container17 />
      <Container19 />
      <Container21 />
    </BackgroundShadow4>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[275px] pointer-events-auto sticky top-0" data-name="Container">
      <BackgroundShadow2 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[18px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      {[...Array(5).keys()].map((_, i) => (
        <Container23 key={i} />
      ))}
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[78.38px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal h-[79px] justify-center leading-[19.6px] left-0 text-[#3b4558] text-[14px] top-[38.89px] translate-y-[-50%] w-[229.63px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">{`"Traditional learning has its`}</p>
        <p className="mb-0">challenges—getting people to</p>
        <p className="mb-0">show up, encouraging them to try</p>
        <p>new skills, and hoping they actual…</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start pb-[1.2px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <LinkText text="See More" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal gap-[8px] items-start leading-[0] relative self-stretch shrink-0 text-nowrap" data-name="Paragraph">
      <ParagraphText text="Gisele Gomes" additionalClassNames="text-[#3b4558] text-[19.2px]" />
      <ParagraphText text="Learning Designer Consultant" additionalClassNames="text-[#0d0d0d] text-[12px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Container">
      <Image1>
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage3} />
      </Image1>
      <Paragraph />
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="bg-white min-h-[340px] relative rounded-[32px] shrink-0 w-full" data-name="Background+Shadow">
      <div className="min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[22px] items-start min-h-[inherit] pb-[79.62px] pt-[48px] px-[40px] relative w-full">
          <Container24 />
          <Container26 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[275px] pointer-events-auto sticky top-0" data-name="Container">
      <BackgroundShadow3 />
    </div>
  );
}

function Svg1() {
  return (
    <Wrapper>
      <path d={svgPaths.p10b2ff80} fill="var(--fill-0, #FCFCF6)" id="Vector" />
    </Wrapper>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Svg1 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="absolute bg-[#235e9a] content-stretch flex items-center justify-center left-[calc(50%+65.43px)] p-px rounded-[52px] size-[52px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[52px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[18px] relative shrink-0 w-[123.86px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ContainerText text="Request Demo" additionalClassNames="top-0" />
        <ContainerText text="Request Demo" additionalClassNames="top-[18px]" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-[#235e9a] content-stretch flex flex-col items-start px-[33px] py-[17px] relative rounded-[100px] shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
      <Container30 />
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pl-[45px] pr-0 py-0 top-0" data-name="Margin">
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bottom-[185px] left-[calc(50%+0.43px)] top-[787px] translate-x-[-50%] w-[286.86px]" data-name="Link">
      <BackgroundBorderShadow />
      <Margin />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] relative size-full to-[#c7ddf3]" data-name="Desktop - 6">
      <Heading />
      <div className="absolute h-[649px] inset-[375px_1075.39px_0_53px] pointer-events-none">
        <Container8 />
      </div>
      <div className="absolute h-[649px] inset-[375px_734.39px_0_394px] pointer-events-none">
        <Container15 />
      </div>
      <div className="absolute h-[649px] inset-[375px_393.39px_0_735px] pointer-events-none">
        <Container22 />
      </div>
      <div className="absolute h-[649px] inset-[375px_52.39px_0_1076px] pointer-events-none">
        <Container28 />
      </div>
      <Link />
    </div>
  );
}