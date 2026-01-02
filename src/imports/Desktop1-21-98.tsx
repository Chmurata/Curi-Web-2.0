import clsx from "clsx";
import img691Ff6599D057453F0Af831ANewCuriLogoColor201Png from "../assets/6ef73880d3e497417bd99c84f190f87e39533f7e.png";
import imgImage4 from "../assets/6e65abf3d08a75f0b69c8620ea99867692ca6d09.png";
import imgImage3 from "../assets/33d6b0087ad0db618491a22467b7fc99b0109762.png";
import imgImage2 from "../assets/3982c6338f1f9ed9f63b4b955abba43823765b55.png";
import imgImage1 from "../assets/4e2ef1a6e96480b5f2cbf7f4bbd508ed10482700.png";
import imgImageBackground from "../assets/53922b39fa055db8c29b42b37dc1cbe161befe2e.png";
type ImageProps = {
  additionalClassNames?: string;
};

function Image({ children, additionalClassNames = "" }: React.PropsWithChildren<ImageProps>) {
  return (
    <div className={clsx("absolute rounded-[20px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] size-[288px] top-[calc(50%-0.3px)] translate-x-[-50%] translate-y-[-50%]", additionalClassNames)}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">{children}</div>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }} className={clsx("flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-nowrap", additionalClassNames)}>
      <p className="leading-[18px]">{text}</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#fdfdfd] text-[20px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[20px]">6</p>
      </div>
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

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pl-0 pr-[58.77px] pt-[10px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold justify-center leading-[36px] relative shrink-0 text-[#3b4558] text-[36px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Measure the</p>
        <p>Culture Shift</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow />
      <Margin />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal gap-[21px] items-start leading-[0] min-w-[300px] pb-[21.5px] pt-0 px-0 relative shrink-0 text-[#3b4558] text-[15px] text-nowrap w-full" data-name="Paragraph">
      <div className="flex flex-col justify-center leading-[21px] relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Track adoption and progress (engagement, follow-</p>
        <p className="mb-0">through patterns, conversation health indicators)</p>
        <p>to show impact over time.</p>
      </div>
      <div className="flex flex-col justify-center leading-[21px] relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Move beyond annual surveys with real-time,</p>
        <p className="mb-0">anonymized insights into where friction is</p>
        <p className="mb-0">{`occurring and watch your "Say-Do Ratio" improve`}</p>
        <p>over time.</p>
      </div>
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

function Component691Ff6599D057453F0Af831ANewCuriLogoColor201Png() {
  return (
    <div className="h-[48px] relative shrink-0 w-[44.63px]" data-name="691ff6599d057453f0af831a_New_Curi_Logo_color%20(1).png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={img691Ff6599D057453F0Af831ANewCuriLogoColor201Png} />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start overflow-clip relative shrink-0" data-name="Link">
      <Component691Ff6599D057453F0Af831ANewCuriLogoColor201Png />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[calc(50%+0.15px)] top-0 translate-x-[-50%]" data-name="Container">
      <Text text="Home" additionalClassNames="text-[#1f5287]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-[49.7px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip pb-[10px] pt-[8px] px-[16px] relative shrink-0" data-name="Link">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Link1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[calc(50%+0.08px)] top-0 translate-x-[-50%]" data-name="Container">
      <Text text="About" additionalClassNames="text-[#0d0d0d]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-[50.83px]" data-name="Container">
      <Container6 />
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip pb-[10px] pt-[8px] px-[16px] relative shrink-0" data-name="Link">
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Link2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[calc(50%-0.1px)] top-0 translate-x-[-50%]" data-name="Container">
      <Text text="Our Solution" additionalClassNames="text-[#0d0d0d]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-[105.19px]" data-name="Container">
      <Container9 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip pb-[10px] pt-[8px] px-[16px] relative shrink-0" data-name="Link">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Link3 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[calc(50%+0.11px)] top-0 translate-x-[-50%]" data-name="Container">
      <Text text="Contact" additionalClassNames="text-[#0d0d0d]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-[66.78px]" data-name="Container">
      <Container12 />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip pb-[10px] pt-[8px] px-[16px] relative shrink-0" data-name="Link">
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Link4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0" data-name="Container">
      <Container5 />
      <Container8 />
      <Container11 />
      <Container14 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Navigation">
      <Container15 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[16px]">Join Waitlist –</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[16px] items-center left-[-211.03px] overflow-clip top-1/2 translate-y-[-50%]" data-name="Container">
      <div className="h-[16px] shrink-0 w-[210.35px]" data-name="Rectangle" />
      {[...Array(2).keys()].map((_, i) => (
        <Container16 key={i} />
      ))}
      <div className="h-[16px] shrink-0 w-[100.83px]" data-name="Rectangle" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[16px] items-center left-[369.56px] overflow-clip top-1/2 translate-y-[-50%]" data-name="Container">
      <div className="h-[16px] shrink-0 w-[100.83px]" data-name="Rectangle" />
      <div className="h-[16px] shrink-0 w-[100.83px]" data-name="Rectangle" />
      <div className="h-[16px] shrink-0 w-[100.82px]" data-name="Rectangle" />
      <div className="h-[16px] shrink-0 w-[100.83px]" data-name="Rectangle" />
    </div>
  );
}

function Link5() {
  return (
    <div className="bg-[#235e9a] h-[52px] relative rounded-[100px] shrink-0 w-[160px]" data-name="Link">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container17 />
        <Container18 />
        <div className="absolute bg-gradient-to-r from-[#235e9a] inset-[1.92%_84.57%_1.92%_0.63%] rounded-[100px] to-[rgba(35,94,154,0)]" data-name="Gradient" />
        <div className="absolute bg-gradient-to-r from-[rgba(35,94,154,0)] inset-[1.92%_0.63%_1.92%_84.57%] to-[#235e9a]" data-name="Gradient" />
      </div>
      <div aria-hidden="true" className="absolute border border-[#235e9a] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Navigation />
      <Link5 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[594.87px] items-center relative shrink-0 w-full" data-name="Container">
      <Link />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start px-[320px] py-0 relative shrink-0" data-name="Container">
      <Container20 />
    </div>
  );
}

function Banner() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-1/2 px-0 py-[32px] top-0 translate-x-[-50%]" data-name="Banner">
      <Container21 />
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute left-[1059.41px] rounded-[20px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] size-[224px] top-[31.7px]" data-name="image 4">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px]">
        <div className="absolute bg-[#faf2a1] inset-0 rounded-[20px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[20px]">
          <img alt="" className="absolute h-full left-[-25.02%] max-w-none top-0 w-[150.04%]" src={imgImage4} />
        </div>
      </div>
    </div>
  );
}

function Image3() {
  return (
    <Image additionalClassNames="left-[calc(50%+253.41px)]">
      <img alt="" className="absolute h-full left-[-25.02%] max-w-none top-0 w-[150.04%]" src={imgImage3} />
    </Image>
  );
}

function Image2() {
  return (
    <Image additionalClassNames="left-[calc(50%-249.59px)]">
      <img alt="" className="absolute h-full left-[-25.02%] max-w-none top-0 w-[150.04%]" src={imgImage2} />
    </Image>
  );
}

function Image1() {
  return (
    <div className="absolute left-[0.41px] rounded-[20px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] size-[224px] top-[31.7px]" data-name="image 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
        <img alt="" className="absolute h-full left-[-10.01%] max-w-none top-0 w-[150.04%]" src={imgImage1} />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[288px] relative shrink-0 w-full" data-name="Container">
      <Image4 />
      <Image3 />
      <Image2 />
      <Image1 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[320px] right-[320px] top-[416px]" data-name="Margin">
      <Container22 />
    </div>
  );
}

function ImageBackground() {
  return (
    <div className="h-[739.99px] relative rounded-[24px] shrink-0 w-full" data-name="Image+Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
        <img alt="" className="absolute h-full left-[-107.83%] max-w-none top-0 w-[305.66%]" src={imgImageBackground} />
      </div>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col h-[760px] items-start justify-center left-[759.59px] overflow-clip px-[10px] py-[8px] rounded-[32px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] top-[180px] w-[400px]" data-name="Background+Shadow">
      <ImageBackground />
      <div className="absolute bg-black inset-[0_37.5%_95.39%_37.5%] rounded-bl-[10px] rounded-br-[10px]" data-name="Background" />
    </div>
  );
}

function HeroImage() {
  return (
    <div className="absolute contents left-1/2 top-[180px] translate-x-[-50%]" data-name="Hero Image">
      <Margin1 />
      <BackgroundShadow2 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] relative size-full to-[#c7ddf3]" data-name="Desktop - 1">
      <div className="absolute h-[-23px] inset-[1047px_1002.87px_0_19px] pointer-events-none">
        <Container2 />
      </div>
      <Banner />
      <HeroImage />
    </div>
  );
}