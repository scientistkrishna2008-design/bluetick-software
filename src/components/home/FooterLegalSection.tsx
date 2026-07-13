import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Shield, Scale, Clock, CheckCircle, Mail } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

type PolicyType = "tos" | "refund" | "privacy" | "agreement" | "quality" | "contact" | null;

const policies = {
  tos: {
    title: "Terms of Service",
    icon: <Scale className="text-growbroo-500" size={24} />,
    content: (
      <div className="space-y-4 text-gray-300">
        <p>Welcome to GrowBro.</p>
        <p>By purchasing a website or using our services, you agree to our Terms of Service.</p>
        <p>GrowBro provides professional website development services through verified website creators.</p>
        <p>Clients agree to provide accurate information and required content for their website.</p>
        <p>GrowBro reserves the right to refuse projects involving illegal, harmful, fraudulent or prohibited activities.</p>
        <p>Project timelines begin only after receiving the required information and payment.</p>
        <p>The final website is considered delivered once approved by the client.</p>
        <p>GrowBro may update these terms at any time.</p>
      </div>
    )
  },
  refund: {
    title: "Refund Policy",
    icon: <Clock className="text-growbroo-500" size={24} />,
    content: (
      <div className="space-y-4 text-gray-300">
        <p>Website development is a custom digital service.</p>
        <p>Because work begins immediately after project confirmation, refunds are limited.</p>
        <p>If GrowBro has not started development, the client may request a cancellation.</p>
        <p>If development has already started, partial or full refunds depend on the amount of work completed.</p>
        <p>After final delivery and client approval, payments are non-refundable.</p>
        <p>If GrowBro fails to deliver the agreed website, appropriate refunds may be provided after review.</p>
      </div>
    )
  },
  privacy: {
    title: "Privacy Policy",
    icon: <Shield className="text-growbroo-500" size={24} />,
    content: (
      <div className="space-y-4 text-gray-300">
        <p>GrowBro respects your privacy.</p>
        <p>We only collect information necessary to provide our services.</p>
        <p>Information may include:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Name</li>
          <li>Business Name</li>
          <li>Email</li>
          <li>Phone Number</li>
          <li>Website Requirements</li>
        </ul>
        <p>Your information is never sold.</p>
        <p>We only share project information with the assigned website creator when required to complete your project.</p>
        <p>We use industry-standard security practices to protect customer information.</p>
      </div>
    )
  },
  agreement: {
    title: "Service Agreement",
    icon: <FileText className="text-growbroo-500" size={24} />,
    content: (
      <div className="space-y-4 text-gray-300">
        <p>Every GrowBro project follows a standard workflow.</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-growbroo-500" /> Client submits requirements.</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-growbroo-500" /> Payment is confirmed.</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-growbroo-500" /> Website creator is assigned.</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-growbroo-500" /> Website is developed.</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-growbroo-500" /> Client reviews the website.</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-growbroo-500" /> GrowBro performs quality verification.</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-growbroo-500" /> Final delivery is completed.</li>
        </ul>
        <p>Reasonable revisions included within the selected plan.</p>
        <p>Additional features outside the original scope may require additional charges.</p>
      </div>
    )
  },
  quality: {
    title: "GrowBro Quality Promise",
    icon: <CheckCircle className="text-growbroo-500" size={24} />,
    content: (
      <div className="space-y-4 text-gray-300">
        <p>Every website passes GrowBro Verification before delivery.</p>
        <p>Verification includes:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {["Mobile Responsiveness", "Button & Link Testing", "Contact Form Testing", "WhatsApp Integration", "Google Maps Verification", "Image Optimization", "Basic SEO Setup", "Performance Review", "Final Quality Inspection"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-growbroo-500 font-bold">✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    )
  },
  contact: {
    title: "Contact & Support",
    icon: <Mail className="text-growbroo-500" size={24} />,
    content: (
      <div className="space-y-6 text-gray-300">
        <p>Need help?</p>
        <p>Contact the GrowBro Support Team.</p>
        
        <div className="p-4 rounded-xl bg-surface-hover/30 border border-border">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Business Hours</p>
          <p>Monday – Saturday</p>
          <p>9:00 AM – 7:00 PM (IST)</p>
        </div>
        
        <div className="p-4 rounded-xl bg-surface-hover/30 border border-border">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Support Email</p>
          <a href="mailto:support@growbro.com" className="text-growbroo-500 hover:underline">support@growbro.com</a>
        </div>
        
        <div className="p-4 rounded-xl bg-surface-hover/30 border border-border">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Website</p>
          <a href="https://growbro.com" target="_blank" rel="noreferrer" className="text-growbroo-500 hover:underline">growbro.com</a>
        </div>
      </div>
    )
  }
};

export function FooterLegalSection() {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <footer className="bg-[#0B0B0B] border-t border-white/5 relative z-10 pt-24 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-growbroo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[0.2em] text-growbroo-500 mb-2 uppercase">Legal</h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">Trust & Policies</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
          {(Object.entries(policies) as [PolicyType, typeof policies.tos][]).map(([key, policy], i) => (
            <motion.div
              key={key}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              <Card 
                className="group cursor-pointer bg-white/[0.02] border-white/10 hover:border-growbroo-500/50 hover:bg-white/[0.04] transition-all duration-300 h-full flex flex-col items-center justify-center p-8 text-center"
                onClick={() => setActivePolicy(key)}
              >
                <div className="mb-4 p-3 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:scale-110 group-hover:border-growbroo-500/30 group-hover:bg-growbroo-500/10 transition-all duration-300">
                  {policy.icon}
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-growbroo-400 transition-colors">{policy.title}</h4>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center text-center border-t border-white/10 pt-12 text-sm text-gray-500 space-y-2">
          <div className="text-2xl font-bold tracking-tighter text-white/50 mb-2">GrowBro<span className="text-growbroo-500">.</span></div>
          <p className="text-white/60">Helping Businesses Grow Online.</p>
          <p>© 2026 GrowBro. All Rights Reserved.</p>
        </div>
      </div>

      {/* Policy Modal */}
      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setActivePolicy(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-growbroo-500/10 border border-growbroo-500/20 text-growbroo-500">
                    {policies[activePolicy].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{policies[activePolicy].title}</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                  onClick={() => setActivePolicy(null)}
                >
                  <X size={20} />
                </Button>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                {policies[activePolicy].content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
