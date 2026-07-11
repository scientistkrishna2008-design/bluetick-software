import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

export function Splash() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => navigate("/home"), 1000); // Navigate after fade out
    }, 3000); // 3 seconds splash

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.8, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Glowing effect behind logo */}
            <div className="absolute inset-0 bg-bluetick-500 blur-[60px] opacity-20 rounded-full" />
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter relative z-10 flex">
              <motion.span 
                animate={{ color: ["#ffffff", "#0284c7", "#ffffff"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Blue
              </motion.span>
              <motion.span 
                animate={{ color: ["#0284c7", "#ffffff", "#0284c7"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Tick
              </motion.span>
              <span className="text-bluetick-500">.</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 text-gray-400 tracking-widest text-sm uppercase"
          >
            Premium Software
          </motion.div>
          
          {/* Subtle particles effect (simplified with CSS) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  y: Math.random() * 100 + 50,
                  x: (Math.random() - 0.5) * window.innerWidth 
                }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: -100 
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-bluetick-400 rounded-full blur-[1px]"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
