import { motion } from "framer-motion";

const SIDEBAR_SECTIONS = [
  { id: "activity", label: "Activity", icon: "📜" },
  { id: "team", label: "Team Activity", icon: "👥" },
  { id: "comments", label: "Comments", icon: "💬" },
  { id: "attachments", label: "Attachments", icon: "📎" },
];

export function TimelineSidebar({ 
  isOpen, 
  onClose,
  activeSection,
  setActiveSection
}: { 
  isOpen: boolean; 
  onClose: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}) {

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-border z-50 flex flex-col transition-transform duration-300 lg:translate-x-0"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }} // Fallback
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="font-bold tracking-tight text-xl flex items-center gap-2">
            <span className="text-growbroo-500">⚡</span>
            Timeline
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-4 mb-6">
            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3 px-2">Views</h3>
            <nav className="space-y-1">
              {SIDEBAR_SECTIONS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group ${
                      isActive 
                        ? "text-white font-medium bg-growbroo-500/10 border border-growbroo-500/30" 
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabTimeline"
                        className="absolute left-0 w-1 h-6 bg-growbroo-500 rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="px-4 border-t border-border/50 pt-6">
             <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3 px-2 text-red-500/80">Admin Logs</h3>
             <button
                onClick={() => {
                  setActiveSection("audit");
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  activeSection === "audit" ? "text-red-400 font-medium bg-red-400/10 border border-red-400/30" : "text-gray-400 hover:text-red-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <span className="text-lg">🔒</span>
                <span className="text-sm">Audit Log</span>
              </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
