import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type FAQ = {
    id: string;
    question: string;
    answer: string;
};

const faqData: FAQ[] = [
    {
        id: "1",
        question: "Is Curi a coach or a learning tool?",
        answer: "Curi functions as both a coach and a learning tool, depending on how you interact with it. It not only helps you identify and resolve conflicts within your inputs but also guides you in avoiding similar conflicts in the future, supporting your growth every step of the way.",
    },
    {
        id: "2",
        question: "What types of issues can Curi support?",
        answer: "Curi helps resolve workplace conflicts related to communication, personality differences, behavior, and attitudes. It also addresses team dynamics and collaboration challenges, while providing strategies to prevent future issues.",
    },
    {
        id: "3",
        question: "How does Curi empower Managers to be more effective?",
        answer: "Curi enhances HR effectiveness by promoting open communication and enabling timely resolution of employee concerns. It helps identify potential conflicts early, providing insights into team dynamics that foster a supportive workplace culture.",
    },
    {
        id: "4",
        question: "What type of organization is the best fit for Curi?",
        answer: "Curi is best suited for organizations that prioritize employee engagement and effective communication, particularly those facing misunderstandings, remote work challenges, or small conflicts. It benefits companies of all sizes looking to enhance collaboration and foster a positive workplace culture.",
    },
    {
        id: "5",
        question: "Is Curi secure?",
        answer: "Absolutely, Curi is built with robust security protocols to ensure the safety and confidentiality of all user data and interactions. It complies with industry standards for data protection and privacy, giving organizations the confidence to use the platform to enhance communication and address workplace challenges effectively.",
    },
    {
        id: "6",
        question: "How do my people access Curi?",
        answer: "Curi provides a range of flexible pricing plans designed to accommodate organizations of all sizes. Participants in our Beta program will receive discounted pricing, and should inquire when applying to participate in the Beta program.",
    },
];

function FAQCard({ item }: { item: FAQ }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="bg-white rounded-[20px] w-full overflow-hidden">
            <div
                className="p-[32px] flex flex-col cursor-pointer"
                onClick={toggle}
            >
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-[#0b1220] text-[20px] md:text-[24px] font-['Bricolage_Grotesque',sans-serif] font-medium leading-tight">
                        {item.question}
                    </h3>
                    <button
                        className="text-[#235e9a] text-[16px] font-semibold ml-4 shrink-0 focus:outline-none"
                    >
                        {isOpen ? "Less" : "More"}
                    </button>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="text-[#3b4558] text-[16px] leading-[1.5]">
                                {item.answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export function FAQSection() {
    return (
        <div className="w-full py-[128px] px-4 md:px-[64px] flex flex-col items-center">
            <div className="max-w-[1000px] w-full flex flex-col gap-[72px]">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-[48px] md:text-[64px] font-bold text-[#0b1220] leading-[1.1] font-['Bricolage_Grotesque',sans-serif]">
                        Frequently asked<br />questions
                    </h2>
                </div>

                {/* List */}
                <div className="flex flex-col gap-[32px] w-full">
                    {faqData.map((item) => (
                        <FAQCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
