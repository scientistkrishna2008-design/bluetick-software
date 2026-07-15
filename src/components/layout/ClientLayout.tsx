import { useState } from "react";
import { Outlet } from "react-router";
import { ClientSidebar } from "./ClientSidebar";
import { motion } from "framer-motion";

export function ClientLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0B0B] text-white selection:bg-growbroo-500/30 selection:text-growbroo-200">
      <ClientSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 min-w-0 relative flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 border-b border-border flex items-center px-4 bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <span className="ml-2 font-bold text-lg">Client Portal</span>
        </div>

        {/* Main Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto p-4 md:p-8"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
