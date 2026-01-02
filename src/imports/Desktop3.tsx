import svgPaths from "./svg-pste5odx01";
import clsx from "clsx";
import imgImage from "../assets/dc50ad3cb84ed9976d3eb68813f0c5566c0be249.png";
type ContainerTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ContainerText({ text, additionalClassNames = "" }: ContainerTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col items-end left-[calc(50%+0.17px)] translate-x-[-50%]", additionalClassNames)}>
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-nowrap text-right text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[18px]">{text}</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 pb-0 pt-[63px] px-0 top-0 w-[1920px]" data-name="Heading 2">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[83.2px] relative shrink-0 text-[83.2px] text-[rgba(11,18,32,0.9)] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Stop managing friction.</p>
        <p>Start driving performance.</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pb-0 pt-[16px] px-0 right-0 top-0" data-name="Heading 2">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[64px] relative shrink-0 text-[64px] text-[rgba(11,18,32,0.9)] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Free your</p>
        <p className="mb-0">managers from</p>
        <p className="mb-0">playing</p>
        <p className="mb-0">{`"referee" so`}</p>
        <p className="mb-0">they can focus</p>
        <p>on strategy.</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start leading-[0] left-0 min-w-[300px] pb-[20px] pt-0 px-0 right-0 text-[#3b4558] text-[15px] text-nowrap top-[450px]" data-name="Paragraph">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[20px] text-nowrap">Managers are burned out from the cost of friction.</p>
      </div>
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[20px] relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Curi offloads the heavy lifting of culture enforcement, conflict resolution</p>
        <p>and team alignment.</p>
      </div>
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[20px] relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">{`By giving every employee a private, automated "Thinking Partner," teams`}</p>
        <p className="mb-0">self-correct in real-time—freeing your managers to focus on strategy,</p>
        <p>not mediation.</p>
      </div>
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

function Container() {
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
    <div className="absolute bg-[#235e9a] content-stretch flex items-center justify-center left-[calc(50%+58.33px)] p-px rounded-[52px] size-[52px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[52px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[95.67px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ContainerText text="Learn More" additionalClassNames="top-0" />
        <ContainerText text="Learn More" additionalClassNames="top-[18px]" />
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-[#235e9a] content-stretch flex flex-col items-start px-[33px] py-[17px] relative rounded-[100px] shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
      <Container1 />
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0" data-name="Margin">
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Link() {
  return (
    <div className="max-w-[512px] relative self-stretch shrink-0 w-[258.67px]" data-name="Link">
      <BackgroundBorderShadow />
      <Margin />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex items-start left-0 pb-[7px] pl-0 pr-px pt-[131px] right-0 top-[538px]" data-name="Container">
      <Link />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[728px] left-[432px] right-[976px] top-0" data-name="Container">
      <Heading1 />
      <Paragraph />
      <Container2 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col h-[597.11px] items-start justify-center left-[1284.8px] max-h-[597.1199951171875px] max-w-[384px] overflow-clip px-[9.6px] py-[8px] rounded-[32px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] top-[87.94px] w-[326.4px]" data-name="Background+Shadow">
      <div className="h-[577.91px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
          <img alt="" className="absolute h-full left-[-58.12%] max-w-none top-0 w-[216.23%]" src={imgImage} />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[808px] left-0 top-[272px] w-[1920px]" data-name="Container">
      <Container3 />
      <BackgroundShadow />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] relative size-full to-[#c7ddf3]" data-name="Desktop - 3">
      <Heading />
      <Container4 />
    </div>
  );
}