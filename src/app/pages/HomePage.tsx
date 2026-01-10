import { Hero } from "../components/Hero";
import { CultureSection } from "../components/CultureSection";
import { InfiniteScroll } from "../components/InfiniteScroll";
import { SayDoGapSection } from "../components/SayDoGapSection";
import { ActivationSection } from "../components/ActivationSection";
import { CultureBehaviorSection } from "../components/CultureBehaviorSection";
import { FlywheelSection } from "../components/FlywheelSection";
import { ProcessSteps } from "../components/ProcessSteps";
import { PerformanceSection } from "../components/PerformanceSection";
import { CultureGrowthSection } from "../components/CultureGrowthSection";
import { FeaturesList } from "../components/FeaturesList";
import { PlansSection } from "../components/PlansSection";
import { QuadrantSection } from "../components/QuadrantSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { OneConversationSection } from "../components/OneConversationSection";

export function HomePage() {
    return (
        <>
            <Hero />
            <CultureSection />
            <InfiniteScroll />
            <SayDoGapSection />
            <ActivationSection />
            <CultureBehaviorSection />
            <FlywheelSection />
            <FeaturesList />
            <PerformanceSection />
            <ProcessSteps />
            <CultureGrowthSection />
            <PlansSection />
            <TestimonialsSection />
            <QuadrantSection />
            <OneConversationSection />
        </>
    );
}
