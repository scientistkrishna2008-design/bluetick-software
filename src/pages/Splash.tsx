import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

export function Splash() {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Stage 0: Initial particles appear (0s)
    // Stage 1: Particles collapse & mesh (0.8s)
    const t1 = setTimeout(() => setStage(1), 800);
    // Stage 2: Drawing stroke (1.5s)
    const t2 = setTimeout(() => setStage(2), 1500);
    // Stage 3: Fill solid text (2.2s)
    const t3 = setTimeout(() => setStage(3), 2200);
    // Stage 4: Fade out & navigate (3.2s)
    const t4 = setTimeout(() => setStage(4), 3200);
    const t5 = setTimeout(() => navigate("/home"), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [navigate]);

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B] overflow-hidden"
        >
          {/* Particles & Mesh (Stages 0 & 1) */}
          <AnimatePresence>
            {stage < 2 && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                exit={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 0,
                        x: x * 1.5,
                        y: y * 1.5,
                        scale: 0
                      }}
                      animate={{ 
                        opacity: [0, 1, 0.5],
                        x: stage === 0 ? x : 0,
                        y: stage === 0 ? y : 0,
                        scale: stage === 0 ? [0, 1, 0.8] : 0.2
                      }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="absolute w-1.5 h-1.5 bg-[#22C55E] rounded-full shadow-[0_0_10px_#22C55E]"
                    />
                  );
                })}
                
                {/* Mesh Connecting Lines */}
                {stage === 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 0.5, scale: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute w-32 h-32 border border-[#22C55E]/30 rounded-full flex items-center justify-center"
                  >
                    <div className="w-16 h-16 border border-[#22C55E]/40 rounded-full rotate-45" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG Stroke Drawing (Stage 2) */}
          <AnimatePresence>
            {stage >= 1 && stage < 3 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg width="300" height="100" viewBox="0 0 300 100" className="overflow-visible">
                  <motion.text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    className="text-5xl font-bold tracking-tighter"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    GrowBro
                  </motion.text>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Solid Logo (Stage 3+) */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-5xl font-bold tracking-tighter flex items-center" style={{ fontFamily: "Inter, sans-serif" }}>
                  <span className="text-[#22C55E] drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">G</span>
                  <span className="text-white">rowBro</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
