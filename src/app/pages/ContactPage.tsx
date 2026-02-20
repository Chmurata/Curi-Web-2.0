import { useState } from "react";
import { motion } from "motion/react";
import { FAQSection } from "../components/solutions/FAQSection";
import { OneConversationSection } from "../components/OneConversationSection";
import { ChevronRight, MessageSquare, Mail, Phone } from "lucide-react";

export function ContactPage() {
    return (
        <div className="w-full min-h-screen bg-[#DDEAF8] flex flex-col">
            {/* Main Contact Section */}
            <div className="flex-1 flex flex-col items-center pt-32 pb-20 px-6">

                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="font-['Bricolage_Grotesque'] font-bold text-4xl md:text-5xl lg:text-6xl text-[#0b1220] tracking-tight leading-tight mb-4">
                        Let's level up your culture, together.
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-[#3b4558] font-medium">
                        <p>You can reach us online at</p>
                        <a href="#" className="text-[#235e9a]">linkedin.com/company/curi</a>
                    </div>
                    {/* LinkedIn Icon */}
                    <div className="flex justify-center mt-3">
                        <div className="w-6 h-6 bg-[#0077B5] rounded-sm text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:scale-110 transition-transform duration-300">in</div>
                    </div>
                </div>

                {/* Contact Form Card */}
                <div className="bg-white rounded-[32px] p-6 md:p-12 w-full max-w-[640px] shadow-sm mt-8">
                    <div className="text-center mb-10">
                        <h2 className="font-['Bricolage_Grotesque'] font-normal text-xl md:text-2xl text-[#0b1220]">
                            Let's level up your culture, together.
                        </h2>
                        <p className="text-[#3b4558] text-sm mt-2">
                            You can reach us anytime via <a href="mailto:info@curiapp.ai" className="text-[#235e9a]">info@curiapp.ai</a>
                        </p>
                    </div>

                    <form className="space-y-4">
                        {/* Radio Group */}
                        <div className="flex flex-col gap-6 mb-10">
                            <label className="text-base font-bold text-[#0b1220]">
                                My role is:*
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="role" className="w-5 h-5 accent-[#235e9a] focus:ring-[#235e9a]" defaultChecked />
                                    <span className="text-[15px] text-[#3b4558]">HR Manager/Leadership</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="role" className="w-5 h-5 accent-[#235e9a] focus:ring-[#235e9a]" />
                                    <span className="text-[15px] text-[#3b4558]">Partner/reseller</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="role" className="w-5 h-5 accent-[#235e9a] focus:ring-[#235e9a]" />
                                    <span className="text-[15px] text-[#3b4558]">Manager/Employee</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="role" className="w-5 h-5 accent-[#235e9a] focus:ring-[#235e9a]" />
                                    <span className="text-[15px] text-[#3b4558]">Strategy & consulting</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="role" className="w-5 h-5 accent-[#235e9a] focus:ring-[#235e9a]" />
                                    <span className="text-[15px] text-[#3b4558]">Investor</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="role" className="w-5 h-5 accent-[#235e9a] focus:ring-[#235e9a]" />
                                    <span className="text-[15px] text-[#3b4558]">Other</span>
                                </label>
                            </div>
                        </div>

                        {/* Full Name */}
                        <input
                            type="text"
                            className="w-full px-5 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 focus:border-[#235e9a] transition-all text-[15px] text-[#3b4558] placeholder:text-[#9ca3af]"
                            placeholder="Full Name"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            className="w-full px-5 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 focus:border-[#235e9a] transition-all text-[15px] text-[#3b4558] placeholder:text-[#9ca3af]"
                            placeholder="Email*"
                            required
                        />

                        {/* Company Name */}
                        <input
                            type="text"
                            className="w-full px-5 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 focus:border-[#235e9a] transition-all text-[15px] text-[#3b4558] placeholder:text-[#9ca3af]"
                            placeholder="Company Name*"
                            required
                        />

                        {/* Phone number */}
                        <input
                            type="tel"
                            className="w-full px-5 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 focus:border-[#235e9a] transition-all text-[15px] text-[#3b4558] placeholder:text-[#9ca3af]"
                            placeholder="Phone number"
                        />

                        {/* Message */}
                        <textarea
                            className="w-full px-5 py-4 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#235e9a]/20 focus:border-[#235e9a] transition-all text-[15px] text-[#3b4558] placeholder:text-[#9ca3af] min-h-[180px] resize-y"
                            placeholder="Message*"
                            required
                        />

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 0.99 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-[#235e9a] text-white font-bold py-4 rounded-full text-base border border-transparent hover:bg-white hover:text-[#235e9a] hover:border-[#235e9a] transition-all duration-300"
                        >
                            Submit
                        </motion.button>
                    </form>
                </div>

                {/* Support Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[640px] mt-6">
                    {/* Email Card */}
                    <a
                        href="mailto:info@curiapp.ai"
                        className="bg-white rounded-[24px] p-6 flex items-start gap-4 shadow-sm border border-transparent hover:border-[#235e9a] hover:scale-[0.99] transition-all duration-300 cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-[#235e9a] rounded-[12px] flex items-center justify-center text-white shrink-0">
                            <Mail size={24} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-[#0b1220] text-lg font-['Bricolage_Grotesque']">Send us a email</h3>
                            <p className="text-[#235e9a] font-medium">info@curiapp.ai</p>
                        </div>
                    </a>

                    {/* Phone Card */}
                    <a
                        href="tel:6092158800"
                        className="bg-white rounded-[24px] p-6 flex items-start gap-4 shadow-sm border border-transparent hover:border-[#235e9a] hover:scale-[0.99] transition-all duration-300 cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-[#235e9a] rounded-[12px] flex items-center justify-center text-white shrink-0">
                            <Phone size={24} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-[#0b1220] text-lg font-['Bricolage_Grotesque']">Give us a call</h3>
                            <p className="text-[#235e9a] font-medium">(609) 215-8800</p>
                        </div>
                    </a>
                </div>

            </div>

            {/* FAQ Section */}
            <div className="w-full bg-[#DDEAF8] pb-20">
                <FAQSection />
            </div>

            {/* CTA Section */}
            <div className="w-full bg-[#DDEAF8]">
                <OneConversationSection />
            </div>
        </div>
    );
}

