// Our Solution Page - Migrated from standalone Our Solutions Page
// Uses shared Header/Footer from main site

import { OneConversationSection } from "../components/OneConversationSection";
import { SolutionsHero, TechCards, FAQSection } from "../components/solutions";

export function OurSolutionPage() {
    return (
        <div className="min-h-screen w-full flex flex-col font-['Bricolage_Grotesque',sans-serif]">
            <SolutionsHero />
            <TechCards />
            <FAQSection />
            <OneConversationSection />
        </div>
    );
}
