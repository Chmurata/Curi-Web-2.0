import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

interface DemoRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    required?: boolean;
}

function CustomSelect({ value, onChange, options, placeholder, required }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-[#235e9a] focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 transition-all font-['Bricolage_Grotesque'] text-sm text-left flex items-center justify-between ${!value ? 'text-gray-600' : 'text-gray-900'
                    }`}
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="max-h-60 overflow-y-auto py-2">
                                {options.map((option) => (
                                    <motion.button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full px-5 py-3 text-left text-sm font-['Bricolage_Grotesque'] transition-all flex items-center justify-between group ${value === option.value
                                            ? 'bg-[#235e9a]/10 text-[#235e9a]'
                                            : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                    >
                                        <span>{option.label}</span>
                                        {value === option.value && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", duration: 0.4 }}
                                            >
                                                <Check className="w-4 h-4 text-[#235e9a]" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        companyName: "",
        companySize: "",
        challenge: "",
        demoFor: "",
        timeframe: "",
        phone: "",
        comments: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        onClose();
    };

    const companySizeOptions = [
        { value: "", label: "Company Size*" },
        { value: "1-10", label: "1-10 employees" },
        { value: "11-50", label: "11-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-500", label: "201-500 employees" },
        { value: "501+", label: "501+ employees" }
    ];

    const challengeOptions = [
        { value: "", label: "The specific challenge(s) I'm most interested in solving is:" },
        { value: "leadership", label: "Leadership Development" },
        { value: "communication", label: "Communication Skills" },
        { value: "culture", label: "Culture Building" },
        { value: "performance", label: "Performance Management" },
        { value: "other", label: "Other" }
    ];

    const demoForOptions = [
        { value: "", label: "The demo is for:*" },
        { value: "myself", label: "Myself" },
        { value: "team", label: "My Team" },
        { value: "organization", label: "My Organization" },
        { value: "client", label: "A Client" }
    ];

    const timeframeOptions = [
        { value: "", label: "Timeframe for purchase:*" },
        { value: "immediate", label: "Immediate (within 1 month)" },
        { value: "short", label: "1-3 months" },
        { value: "medium", label: "3-6 months" },
        { value: "long", label: "6+ months" },
        { value: "exploring", label: "Just exploring" }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex h-[85vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                            {/* LEFT PANEL */}
                            <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#235e9a] via-[#2d6fb5] to-[#1a4a7a] p-12 flex-col justify-center relative overflow-hidden">
                                <motion.div
                                    className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute bottom-20 left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.2, 0.4, 0.2],
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                />

                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Sparkles className="w-12 h-12 text-white/90 mb-6" />
                                        <h2 className="text-4xl font-bold text-white mb-6 font-['Bricolage_Grotesque'] leading-tight">
                                            Book a 15 minute demo
                                        </h2>
                                        <p className="text-white/90 text-base leading-relaxed">
                                            The best way to get a feel for what Curi can do for your workplace is to book a short demo.
                                        </p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* RIGHT PANEL */}
                            <div className="flex-1 flex flex-col">
                                <div className="p-6 lg:p-10 overflow-y-auto flex-1">
                                    <p className="text-[#3b4558] text-xs italic mb-4">
                                        Please fill/select all the mandatory fields marked with ' * '
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-[#235e9a] focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 transition-all font-['Bricolage_Grotesque'] text-sm"
                                            required
                                        />

                                        <input
                                            type="email"
                                            placeholder="Email*"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-[#235e9a] focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 transition-all font-['Bricolage_Grotesque'] text-sm"
                                            required
                                        />

                                        <input
                                            type="text"
                                            placeholder="Company Name*"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-[#235e9a] focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 transition-all font-['Bricolage_Grotesque'] text-sm"
                                            required
                                        />

                                        <CustomSelect
                                            value={formData.companySize}
                                            onChange={(value) => setFormData({ ...formData, companySize: value })}
                                            options={companySizeOptions}
                                            placeholder="Company Size*"
                                            required
                                        />

                                        <CustomSelect
                                            value={formData.challenge}
                                            onChange={(value) => setFormData({ ...formData, challenge: value })}
                                            options={challengeOptions}
                                            placeholder="The specific challenge(s) I'm most interested in solving is:"
                                            required
                                        />

                                        <CustomSelect
                                            value={formData.demoFor}
                                            onChange={(value) => setFormData({ ...formData, demoFor: value })}
                                            options={demoForOptions}
                                            placeholder="The demo is for:*"
                                            required
                                        />

                                        <CustomSelect
                                            value={formData.timeframe}
                                            onChange={(value) => setFormData({ ...formData, timeframe: value })}
                                            options={timeframeOptions}
                                            placeholder="Timeframe for purchase:*"
                                            required
                                        />

                                        <input
                                            type="tel"
                                            placeholder="Best number to reach you at:"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-[#235e9a] focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 transition-all font-['Bricolage_Grotesque'] text-sm"
                                        />

                                        <textarea
                                            placeholder="Any other questions or comments you may have?"
                                            value={formData.comments}
                                            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                            rows={3}
                                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-[#235e9a] focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 transition-all font-['Bricolage_Grotesque'] text-sm resize-none"
                                        />

                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-[#235e9a] text-white py-4 rounded-full font-['Bricolage_Grotesque'] font-normal text-base hover:bg-[#1a4a7a] transition-colors shadow-lg hover:shadow-xl"
                                        >
                                            Submit
                                        </motion.button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence >
    );
}
