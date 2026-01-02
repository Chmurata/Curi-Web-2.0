import imgImage from "../assets/049d866eef659104371bc548534ae33425d02566.png";

function BackgroundShadow() {
  return (
    <div className="bg-black content-stretch flex flex-col h-[456px] items-start justify-center overflow-clip pl-[5.996px] pr-[6.004px] py-[8px] relative rounded-[32px] shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] w-[240px]" data-name="Background+Shadow">
      <div className="h-[443.999px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
          <img alt="" className="absolute h-full left-[-28.79%] max-w-none top-0 w-[157.58%]" src={imgImage} />
        </div>
      </div>
      <div className="absolute bg-black inset-[0_37.5%_95.39%_37.5%] rounded-bl-[10px] rounded-br-[10px]" data-name="Background" />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[57.924px] pt-[57.929px] px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0 size-[492.146px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[135deg]">
          <BackgroundShadow />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Bricolage_Grotesque:Bold',sans-serif] font-bold gap-[56.98px] items-center leading-[0] left-[256px] right-[256px] text-[64px] text-[rgba(11,18,32,0.9)] text-center text-nowrap top-[-0.7px]" data-name="Heading 2">
      <div className="flex flex-col justify-center leading-[57.6px] relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">Culture shifts one</p>
        <p>conversation at a time.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[57.6px] text-nowrap">Let’s start yours.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[384px] min-w-[300px] right-[384px] top-[298.48px]" data-name="Container">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[25.2px] relative shrink-0 text-[#3b4558] text-[18px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="mb-0">One great conversation won’t fix culture — but thousands of</p>
        <p>practiced ones will. We help you build them.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.8px] pt-0 px-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Bricolage_Grotesque:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[16.8px]">Request Demo</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#235e9a] content-stretch flex items-center justify-center max-w-[1280px] pb-[14px] pt-[13px] px-0 relative rounded-[100px] self-stretch shadow-[0px_4px_10px_0px_rgba(22,22,19,0.1)] shrink-0 w-[192px]" data-name="Link">
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex items-start justify-center left-0 right-0 top-[412.75px]" data-name="Container">
      <Link />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[457.55px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container1 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[80px] pb-[128px] pt-[64px] px-0 top-0 w-[1280px]" data-name="Container">
      <Container />
      <Container4 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-gradient-to-r from-[#f2f7fb] relative size-full to-[#c7ddf3]" data-name="Desktop - 7">
      <Container5 />
    </div>
  );
}