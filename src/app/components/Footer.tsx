import svgPaths from "./svg-gjsw9pkadb";
import clsx from "clsx";
import { assets } from "./Imports";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className="flex flex-col font-['Bricolage_Grotesque'] font-normal justify-center leading-[0] relative shrink-0 text-[#3b4558] text-[14px]">
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
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col justify-center leading-[0] relative shrink-0 text-[14px]", additionalClassNames)}>
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
      <Text2 text={text} additionalClassNames="font-['Bricolage_Grotesque'] font-normal text-[#3b4558]" />
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
    <div className="h-[70px] overflow-clip relative shrink-0 w-[160px]" data-name="footer-logo">
      <div className="absolute inset-[2.86%_-84.38%_-37.14%_0]" data-name="Rectangle">
        <img alt="Curi Logo" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={assets.footerLogoRect} />
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20px] flex-shrink-0" data-name="SVG">
      <div className="absolute inset-[5.21%_13.54%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 17.9166">
          <path clipRule="evenodd" d={svgPaths.p32a3700} fill="var(--fill-0, #3B4558)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[15.547px] relative shrink-0 w-[20px] flex-shrink-0" data-name="SVG">
      <div className="absolute inset-[3.12%_5.23%_3.13%_5.23%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9067 14.5752">
          <path clipRule="evenodd" d={svgPaths.p1e09c900} fill="var(--fill-0, #3B4558)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20px] flex-shrink-0" data-name="SVG">
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

export function Footer() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] to-[#c7ddf3] relative w-full py-12 lg:py-16" data-name="Footer">
      <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-8">

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-4 lg:gap-12 mb-8 lg:mb-12">

          {/* Left Column - Logo and Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-3 md:gap-4 lg:gap-6 flex-1 text-center md:text-left">
            {/* Logo */}
            <div className="flex flex-col items-center md:items-start gap-1 scale-75 md:scale-100 origin-center md:origin-left">
              <Component6926A65Ae3F6Bdd94306278B6923Fcff53343F0120D57B1EFooterLogo201Svg />
              <Text text="Land Every Conversation." additionalClassNames="font-['Bricolage_Grotesque'] font-normal text-[rgba(68,114,148,0.56)]" />
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm items-center md:items-start">
              {/* Address */}
              <div className="flex gap-2 items-start text-left">
                <Svg />
                <Wrapper>28 Spring St. #6000, Princeton, NJ 08540</Wrapper>
              </div>

              {/* Email */}
              <div className="flex gap-2 items-center">
                <Svg1 />
                <Text1 text="info@curiapp.ai" />
              </div>

              {/* Phone */}
              <div className="flex gap-2 items-center">
                <Svg2 />
                <Text1 text="319-GET CURI / (319) 438-2874" />
              </div>
            </div>
          </div>

          {/* Middle Column - Animation (Always Visible) */}
          <div className="flex flex-1 items-center justify-center">
            <img
              src={assets.footerAnimation}
              alt="Curi Animation"
              className="w-full max-w-[160px] md:max-w-[180px] lg:max-w-[220px] h-auto"
            />
          </div>

          {/* Right Column - Social */}
          <div className="flex flex-col gap-2 flex-1 items-center md:items-end">
            <Text text="Connect with us:" additionalClassNames="font-['Bricolage_Grotesque'] font-bold text-[#3b4558]" />
            <a href="https://www.linkedin.com/company/curiai/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img alt="LinkedIn" className="h-[29px] w-auto" src={assets.footerLinkedIn} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-center mb-6 border-t border-[rgba(59,69,88,0.2)] pt-6">
          <Text2 text="About" additionalClassNames="font-['Bricolage_Grotesque'] font-semibold text-[#235e9a] cursor-pointer hover:underline" />
          <Text2 text="Contact" additionalClassNames="font-['Bricolage_Grotesque'] font-semibold text-[#235e9a] cursor-pointer hover:underline" />
          <Text2 text="Privacy Policy" additionalClassNames="font-['Bricolage_Grotesque'] font-semibold text-[#235e9a] cursor-pointer hover:underline" />
        </div>

        {/* Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-1 text-center text-[14px] text-[#3b4558]">
          <span>© 2025</span>
          <span className="font-semibold">Curi, LLC</span>
          <span>All rights reserved.</span>
        </div>

      </div>
    </div>
  );
}
