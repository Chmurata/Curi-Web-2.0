import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CultureSection } from "./components/CultureSection";
import { InfiniteScroll } from "./components/InfiniteScroll";
import { SayDoGapSection } from "./components/SayDoGapSection";

import { ActivationSection } from "./components/ActivationSection";
import { FlywheelSection } from "./components/FlywheelSection";
import { ProcessSteps } from "./components/ProcessSteps";
import { PerformanceSection } from "./components/PerformanceSection";
import { CultureGrowthSection } from "./components/CultureGrowthSection";
import { FeaturesList } from "./components/FeaturesList";
import { PlansSection } from "./components/PlansSection";
import { QuadrantSection } from "./components/QuadrantSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { OneConversationSection } from "./components/OneConversationSection";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Main Content */}
      <div className="relative font-sans antialiased text-slate-900 bg-white selection:bg-blue-200">
        {/* Global Background & Animated Glows */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#F2F7FB_0%,#C7DDF3_100%)]" />

          {/* Animated Glow Orbs */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/2 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-400/2 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
          <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] bg-indigo-300/2 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 overflow-x-clip">
          <Header />
          <main>
            <Hero />
            <CultureSection />
            <InfiniteScroll />
            <SayDoGapSection />

            <ActivationSection />
            <FlywheelSection />
            <FeaturesList />
            <ProcessSteps />
            <PerformanceSection />
            <CultureGrowthSection />
            <PlansSection />
            <TestimonialsSection />
            <QuadrantSection />
            <OneConversationSection />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
