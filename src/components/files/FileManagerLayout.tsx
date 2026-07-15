import { useState } from "react";
import { FileManagerSidebar } from "./FileManagerSidebar";
import { motion, AnimatePresence } from "framer-motion";

export function FileManagerLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="flex min-h-screen bg-[#0B0B0B] text-white selection:bg-growbroo-500/30 selection:text-growbroo-200">
      <FileManagerSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <main className="flex-1 min-w-0 relative flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 border-b border-border flex items-center px-4 bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <span className="ml-2 font-bold text-lg">File Manager</span>
        </div>

        {/* Main Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto relative" id="file-manager-scroll-area">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory} // Animate when category changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-[1600px] mx-auto p-4 md:p-8 min-h-full flex flex-col"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
