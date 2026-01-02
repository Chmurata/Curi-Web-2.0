import svgPaths from "./svg-3nonbqfhjy";
import clsx from "clsx";
type Helper1Props = {
  text: string;
  text1: string;
  text2: string;
  additionalClassNames?: string;
};

function Helper1({ text, text1, text2, additionalClassNames = "" }: Helper1Props) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col justify-center leading-[21px] relative shrink-0", additionalClassNames)}>
      <p className="mb-0">{text}</p>
      <p className="mb-0">{text1}</p>
      <p>{text2}</p>
    </div>
  );
}

function Container29({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[300px] pb-[21.5px] pt-0 px-0 relative shrink-0 w-full">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[21px] relative shrink-0 text-[#3b4558] text-[15px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        {children}
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pl-0 pr-[34.41px] pt-[10px] relative shrink-0">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[36px] relative shrink-0 text-[#3b4558] text-[36px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        {children}
      </div>
    </div>
  );
}

function BackgroundShadow15({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-[#f5faff] grow min-h-[295px] min-w-px relative rounded-[40px] shrink-0 w-full">
      <div className="min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start min-h-[inherit] px-[32px] py-[40px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function BackgroundShadow14({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-[#f5faff] grow min-h-px min-w-px relative rounded-[40px] shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start px-[32px] py-[40px] relative size-full">{children}</div>
      </div>
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
type HelperProps = {
  text: string;
  text1: string;
  text2: string;
  additionalClassNames?: string;
};

function Helper({ text, text1, text2, additionalClassNames = "" }: HelperProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col justify-center leading-[21px] relative shrink-0", additionalClassNames)}>
      <p className="mb-0">{text}</p>
      <p className="mb-0">{text1}</p>
      <p className="mb-0">{`occurring and watch your "Say-Do Ratio" improve`}</p>
      <p>{text2}</p>
    </div>
  );
}
type MarginProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Margin({ text, text1, additionalClassNames = "" }: MarginProps) {
  return (
    <div className={clsx("content-stretch flex flex-col items-start pb-0 pl-0 pt-[10px] relative shrink-0", additionalClassNames)}>
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[36px] relative shrink-0 text-[#3b4558] text-[36px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">{text}</p>
        <p>{text1}</p>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col justify-center leading-[0] relative shrink-0 text-[20px] text-nowrap", additionalClassNames)}>
      <p className="leading-[20px]">{text}</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text text="6" additionalClassNames="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal text-[#fdfdfd]" />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#2b72ba] content-stretch flex items-center justify-center relative rounded-[56px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 size-[56px]" data-name="Background+Shadow">
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow />
      <Margin text="Measure the" text1="Culture Shift" additionalClassNames="pr-[58.77px]" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal gap-[21px] items-start leading-[0] min-w-[300px] pb-[21.5px] pt-0 px-0 relative shrink-0 text-[#3b4558] text-[15px] text-nowrap w-full" data-name="Paragraph">
      <Helper1 text="Track adoption and progress (engagement, follow-" text1="through patterns, conversation health indicators)" text2="to show impact over time." />
      <Helper text="Move beyond annual surveys with real-time," text1="anonymized insights into where friction is" text2="over time." />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white min-h-[295px] relative rounded-[24px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 w-full" data-name="Background+Shadow">
      <div className="min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start min-h-[inherit] px-[32px] py-[40px] relative w-full">
          <Container1 />
          <Paragraph />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pointer-events-auto sticky top-0" data-name="Container">
      <BackgroundShadow1 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p10b2ff80} fill="var(--fill-0, #FCFCF6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Svg />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="absolute bg-[#235e9a] content-stretch flex items-center justify-center left-[calc(50%+65.43px)] p-px rounded-[52px] size-[52px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[52px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
      <Container3 />
    </div>
  );
}

function Container4() {
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
      <Container4 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pl-[45px] pr-0 py-0 top-0" data-name="Margin">
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[52px] left-[calc(50%-0.57px)] top-[899.25px] translate-x-[-50%] w-[286.86px]" data-name="Link">
      <BackgroundBorderShadow />
      <Margin1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text text="4" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#f5faff]" />
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-[#2b72ba] content-stretch flex items-center justify-center relative rounded-[56px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 size-[56px]" data-name="Background+Shadow">
      <Container5 />
    </div>
  );
}

function Margin2() {
  return (
    <Wrapper>
      <p className="mb-0">Make</p>
      <p className="mb-0">conversations</p>
      <p className="mb-0">psychologically</p>
      <p>safe</p>
    </Wrapper>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow2 />
      <Margin2 />
    </div>
  );
}

function Container7() {
  return (
    <Container29>
      <p className="mb-0">Before you hit send—or as you prepare—Curi</p>
      <p className="mb-0">helps you choose language that keeps safety and</p>
      <p className="mb-0">accountability intact. Purpose driven</p>
      <p className="mb-0">conversations reduce defensiveness and keep</p>
      <p>momentum toward outcomes, not escalation.</p>
    </Container29>
  );
}

function BackgroundShadow3() {
  return (
    <BackgroundShadow14>
      <Container6 />
      <Container7 />
    </BackgroundShadow14>
  );
}

function Container8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px shrink-0 sticky top-0" data-name="Container">
      <BackgroundShadow3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text text="5" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#f5faff]" />
    </div>
  );
}

function BackgroundShadow4() {
  return (
    <div className="bg-[#2b72ba] content-stretch flex items-center justify-center relative rounded-[56px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 size-[56px]" data-name="Background+Shadow">
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow4 />
      <Margin text="Ratify clear" text1="agreements" additionalClassNames="pr-[34.41px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal gap-[24px] items-start leading-[0] min-w-[300px] relative shrink-0 text-[#3b4558] text-[15px] w-full" data-name="Container">
      <div className="flex flex-col justify-center leading-[21px] relative shrink-0 w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">
          <span>{`Curi's `}</span>
          <span className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            Clarity Engine
          </span>
          <span>{` flags vague language ("I'll try`}</span>
        </p>
        <p className="mb-0">
          <span>{`to do that") and prompts employees for `}</span>
          <span className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            clarity
          </span>
          <span>{` ("I`}</span>
        </p>
        <p>{`will deliver this by Friday").`}</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[21px] mb-0">The result: Measureable steps both people can</p>
        <p className="leading-[21px]">
          agree to, actively closing the<span className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>{` Say-Do Gap `}</span>
        </p>
      </div>
    </div>
  );
}

function BackgroundShadow5() {
  return (
    <BackgroundShadow14>
      <Container10 />
      <Container11 />
    </BackgroundShadow14>
  );
}

function Container12() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px shrink-0 sticky top-0" data-name="Container">
      <BackgroundShadow5 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text text="6" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#f5faff]" />
    </div>
  );
}

function BackgroundShadow6() {
  return (
    <div className="bg-[#2b72ba] content-stretch flex items-center justify-center relative rounded-[56px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 size-[56px]" data-name="Background+Shadow">
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow6 />
      <Margin text="Measure the" text1="Culture Shift" additionalClassNames="pr-[34.41px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal gap-[24px] items-start leading-[0] min-w-[300px] relative shrink-0 text-[#3b4558] text-[15px] w-full" data-name="Container">
      <Helper1 text="Track adoption and progress (engagement, follow-" text1="through patterns, conversation health indicators)" text2="to show impact over time." additionalClassNames="w-full" />
      <Helper text="Move beyond annual surveys with real-time," text1="anonymized insights into where friction is" text2="over time." additionalClassNames="w-full" />
    </div>
  );
}

function BackgroundShadow7() {
  return (
    <BackgroundShadow14>
      <Container14 />
      <Container15 />
    </BackgroundShadow14>
  );
}

function Container16() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px shrink-0 sticky top-0" data-name="Container">
      <BackgroundShadow7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[13px] h-[385px] items-start left-[320px] top-[380px] w-[1279px]">
      <Container8 />
      <Container12 />
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text text="1" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#f5faff]" />
    </div>
  );
}

function BackgroundShadow8() {
  return (
    <div className="bg-[#2b72ba] content-stretch flex items-center justify-center relative rounded-[56px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 size-[56px]" data-name="Background+Shadow">
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow8 />
      <Margin text="Define your" text1="culture" additionalClassNames="pr-[34.41px]" />
    </div>
  );
}

function Container19() {
  return (
    <Container29>
      <p className="mb-0">Upload values, leadership principles, and “what</p>
      <p className="mb-0">good looks like” so guidance reflects your</p>
      <p>standards.</p>
    </Container29>
  );
}

function BackgroundShadow9() {
  return (
    <BackgroundShadow15>
      <Container18 />
      <Container19 />
    </BackgroundShadow15>
  );
}

function Container20() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[295px] items-start justify-center min-h-[275px] min-w-px shrink-0 sticky top-0" data-name="Container">
      <BackgroundShadow9 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text text="2" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#f5faff]" />
    </div>
  );
}

function BackgroundShadow10() {
  return (
    <div className="bg-[#2b72ba] content-stretch flex items-center justify-center relative rounded-[56px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 size-[56px]" data-name="Background+Shadow">
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow10 />
      <Margin text="Meet Curi in the" text1="workflow" additionalClassNames="pr-[34.41px]" />
    </div>
  );
}

function Container23() {
  return (
    <Container29>
      <p className="mb-0">{`Bring Curi's Interaction Intelligence and coaching`}</p>
      <p className="mb-0">into the channels where work actually happens</p>
      <p>(messages, 1:1 prep, difficult conversations).</p>
    </Container29>
  );
}

function BackgroundShadow11() {
  return (
    <BackgroundShadow15>
      <Container22 />
      <Container23 />
    </BackgroundShadow15>
  );
}

function Container24() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[295px] items-start justify-center min-h-[275px] min-w-px shrink-0 sticky top-0" data-name="Container">
      <BackgroundShadow11 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text text="3" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#f5faff]" />
    </div>
  );
}

function BackgroundShadow12() {
  return (
    <div className="bg-[#2b72ba] content-stretch flex items-center justify-center relative rounded-[56px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 size-[56px]" data-name="Background+Shadow">
      <Container25 />
    </div>
  );
}

function Margin3() {
  return (
    <Wrapper>
      <p className="mb-0">{`Private "whisper"`}</p>
      <p>coaching</p>
    </Wrapper>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow12 />
      <Margin3 />
    </div>
  );
}

function Container27() {
  return (
    <Container29>
      <p className="mb-0">Before high-stakes moments, employees can</p>
      <p className="mb-0">roleplay scenarios with custom personas and get</p>
      <p className="mb-0">private coaching. It’s a judgment-free zone to</p>
      <p className="mb-0">
        <span className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>{`sharpen delivery `}</span>
        <span>{`and `}</span>
        <span className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
          reduce anxiety
        </span>
        <span>{` before the`}</span>
      </p>
      <p>real conversation happens.</p>
    </Container29>
  );
}

function BackgroundShadow13() {
  return (
    <BackgroundShadow15>
      <Container26 />
      <Container27 />
    </BackgroundShadow15>
  );
}

function Container28() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[295px] items-start justify-center min-h-[275px] min-w-px shrink-0 sticky top-0" data-name="Container">
      <BackgroundShadow13 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[13px] items-center left-[320px] top-[72px] w-[1279px]">
      <Container20 />
      <Container24 />
      <Container28 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] relative size-full to-[#c7ddf3]" data-name="Desktop - 2">
      <div className="absolute h-[-23px] inset-[1047px_1002.87px_0_19px] pointer-events-none">
        <Container2 />
      </div>
      <Link />
      <Frame />
      <Frame1 />
    </div>
  );
}