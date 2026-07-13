import { motion } from "framer-motion";
import { ParticleNetwork } from "./ParticleNetwork";

export function FounderSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[#0B0B0B]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-growbroo-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-5/12 relative"
        >
          {/* Floating animation wrapper */}
          <motion.div 
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-[2rem] p-1 bg-gradient-to-b from-growbroo-500/50 to-growbroo-500/5 shadow-[0_0_50px_rgba(34,197,94,0.15)] group"
          >
            {/* Inner glass box */}
            <div className="bg-[#0B0B0B] rounded-[1.8rem] p-2 relative overflow-hidden w-full aspect-[3/4] min-h-[400px] border border-growbroo-500/20 group-hover:border-growbroo-500/40 transition-colors duration-500">
              
              {/* Subtle geometric lines */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-growbroo-500/30 rounded-tr-[1.5rem] opacity-50" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-growbroo-500/30 rounded-bl-[1.5rem] opacity-50" />
              <div className="absolute inset-0 z-10 opacity-70">
                <ParticleNetwork />
              </div>
              
              {/* Inner glow effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(34,197,94,0.1)] rounded-[1.5rem] pointer-events-none z-20" />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-7/12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full border border-growbroo-500/30 bg-growbroo-500/10 text-growbroo-500 text-xs font-bold tracking-widest uppercase mb-6">
              Our Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
              Why GrowBroo Exists
            </h2>
          </motion.div>

          <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
            {[
              "Every small business deserves a powerful online presence.",
              "Many business owners struggle to find affordable, high-quality websites, while talented creators struggle to find clients.",
              "GrowBroo was built to bridge that gap.",
              "We connect businesses with skilled website creators through a simple, transparent process that delivers premium websites quickly, professionally, and at an accessible price.",
              "Our goal isn't just to build websites.",
              "Our goal is to help businesses grow."
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                className={i >= 4 ? "font-medium text-gray-200" : ""}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-8 mt-8 border-t border-border flex items-center gap-4"
          >
            <div>
              <p className="text-white font-bold tracking-wide text-lg">— Sai Krishna</p>
              <p className="text-growbroo-500 text-sm font-bold tracking-wider uppercase mt-1">Founder, GrowBroo</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
