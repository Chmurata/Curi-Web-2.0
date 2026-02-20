import svgPaths from "./svg-gjsw9pkadb";
import clsx from "clsx";
import imgRectangle from "../assets/768239375730dab955448ba107673e79f5b29e7a.png";
import img6924007D50A173C2E9F73226CuriWebp from "../assets/8b4dd16904991c4c2c158aca205b32b3c32578ba.png";
import imgVector from "../assets/26bdf1c71c0b55fbdd0796dad3c45bda58bdae78.png";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b4558] text-[14px] text-nowrap">
      <p className="leading-[20px]">{children}</p>
    </div>
  );
}
type Text2Props = {
  text: string;
  additionalClassNames?: string;
};

function Text2({ text, additionalClassNames = "" }: Text2Props) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap", additionalClassNames)}>
      <p className="leading-[16.8px]">{text}</p>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div className={clsx("content-stretch flex items-start relative shrink-0", additionalClassNames)}>
      <Text2 text={text} additionalClassNames="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal text-[#3b4558]" />
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col justify-center leading-[0] relative shrink-0 text-[14px] w-full", additionalClassNames)}>
      <p className="leading-[20px]">{text}</p>
    </div>
  );
}

function Component6926A65Ae3F6Bdd94306278B6923Fcff53343F0120D57B1EFooterLogo201Svg() {
  return (
    <div className="h-[70px] overflow-clip relative shrink-0 w-[160px]" data-name="6926a65ae3f6bdd94306278b_6923fcff53343f0120d57b1e_footer-logo%20(1).svg">
      <div className="absolute inset-[2.86%_-84.38%_-37.14%_0]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgRectangle} />
      </div>
    </div>
  );
}

function Component6926A65Ae3F6Bdd94306278B6923Fcff53343F0120D57B1EFooterLogo201SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[70px] items-center justify-center overflow-clip relative shrink-0 w-[160px]" data-name="6926a65ae3f6bdd94306278b_6923fcff53343f0120d57b1e_footer-logo%20(1).svg fill">
      <Component6926A65Ae3F6Bdd94306278B6923Fcff53343F0120D57B1EFooterLogo201Svg />
    </div>
  );
}

function Component6926A65Ae3F6Bdd94306278B6923Fcff53343F0120D57B1EFooterLogo201Svg1() {
  return (
    <div className="content-stretch flex items-start max-w-[416px] overflow-clip relative shrink-0" data-name="6926a65ae3f6bdd94306278b_6923fcff53343f0120d57b1e_footer-logo%20(1).svg">
      <Component6926A65Ae3F6Bdd94306278B6923Fcff53343F0120D57B1EFooterLogo201SvgFill />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Text text="Land Every Conversation." additionalClassNames="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal text-[rgba(68,114,148,0.56)]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-full" data-name="Container">
      <Component6926A65Ae3F6Bdd94306278B6923Fcff53343F0120D57B1EFooterLogo201Svg1 />
      <Container />
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="SVG">
      <div className="absolute inset-[5.21%_13.54%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 17.9166">
          <path clipRule="evenodd" d={svgPaths.p32a3700} fill="var(--fill-0, #3B4558)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[20px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Wrapper>28 Spring St. #6000, Princeton, NJ 08540</Wrapper>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[15.547px] relative shrink-0 w-full" data-name="SVG">
      <div className="absolute inset-[3.12%_5.23%_3.13%_5.23%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9067 14.5752">
          <path clipRule="evenodd" d={svgPaths.p1e09c900} fill="var(--fill-0, #3B4558)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col h-[16.8px] items-start relative shrink-0 w-[20px]" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Link">
      <Container5 />
      <div className="flex flex-row items-end self-stretch">
        <Text1 text="info@curiapp.ai" additionalClassNames="flex-col h-full" />
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="SVG">
      <div className="absolute inset-[5.86%_5.87%_49.61%_49.61%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.90349 8.90607">
          <path d={svgPaths.p23cd7f00} fill="var(--fill-0, #3B4558)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[22.43%_22.5%_50.65%_50.58%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.38408 5.38408">
          <path clipRule="evenodd" d={svgPaths.pd7c4900} fill="var(--fill-0, #3B4558)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[15.24%_15.24%_2.74%_2.73%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4049 16.4049">
          <path clipRule="evenodd" d={svgPaths.p1366ff00} fill="var(--fill-0, #3B4558)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[20px]" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Link">
      <Container6 />
      <div className="flex flex-row items-end self-stretch">
        <Text1 text="(609) 215-8800" additionalClassNames="flex-col h-full" />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Link />
      <Link1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start min-h-px min-w-px pb-[8.12px] pt-0 px-0 relative shrink-0" data-name="Container">
      <Container1 />
      <Container7 />
    </div>
  );
}

function Component6924007D50A173C2E9F73226CuriWebp() {
  return (
    <div className="h-[201.92px] max-w-[250px] relative shrink-0 w-[249.98px]" data-name="6924007d50a173c2e9f73226_curi.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[100.01%]" src={img6924007D50A173C2E9F73226CuriWebp} />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[250px] relative shrink-0 w-full" data-name="Container">
      <Component6924007D50A173C2E9F73226CuriWebp />
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[83px] py-0 relative w-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Text text="Connect with us:" additionalClassNames="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold text-[#3b4558]" />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Component6924012Dd867953438Abfb1DLinkedinSvg() {
  return (
    <div className="h-[29px] overflow-clip relative shrink-0 w-[113px]" data-name="6924012dd867953438abfb1d_linkedin.svg">
      <div className="absolute inset-[2.82%_0.69%_3.07%_0.69%]" data-name="Vector">
        <img alt="" className="block max-w-none size-full" height="27.292" src={imgVector} width="111.441" />
      </div>
    </div>
  );
}

function Component6924012Dd867953438Abfb1DLinkedinSvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[29px] items-center justify-center overflow-clip relative shrink-0 w-[113px]" data-name="6924012dd867953438abfb1d_linkedin.svg fill">
      <Component6924012Dd867953438Abfb1DLinkedinSvg />
    </div>
  );
}

function Component6924012Dd867953438Abfb1DLinkedinSvg1() {
  return (
    <div className="content-stretch flex items-start max-w-[129px] overflow-clip relative shrink-0" data-name="6924012dd867953438abfb1d_linkedin.svg">
      <Component6924012Dd867953438Abfb1DLinkedinSvgFill />
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <Component6924012Dd867953438Abfb1DLinkedinSvg1 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[287px] pr-0 py-0 relative shrink-0" data-name="Container">
      <Margin />
      <Link2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[16px] items-end mb-[-1px] pb-[64px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container10 />
      <Container12 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Text2 text="About" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#235e9a]" />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Text2 text="Contact" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#235e9a]" />
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <Text2 text="Privacy Policy" additionalClassNames="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold text-[#235e9a]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-center mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <Link3 />
      <Link4 />
      <Link5 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center mb-[-1px] pb-0 pt-[32.5px] px-0 relative shrink-0 w-full" data-name="Container">
      <Wrapper>{`© 2025 `}</Wrapper>
      <Text1 text="Curi, LLC" />
      <Wrapper>{` All rights reserved.`}</Wrapper>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bottom-[-0.42px] content-stretch flex flex-col items-start left-1/2 pb-[49px] pt-0 px-0 translate-x-[-50%] w-[1280px]" data-name="Container">
      <Container13 />
      <Container14 />
      <Container15 />
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] relative size-full to-[#c7ddf3]" data-name="Footer">
      <Container16 />
    </div>
  );
}