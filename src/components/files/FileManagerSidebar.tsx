import { motion } from "framer-motion";

const SIDEBAR_CATEGORIES = [
  { id: "all", label: "All Files", icon: "📂" },
  { id: "images", label: "Images", icon: "🖼" },
  { id: "logos", label: "Logos", icon: "🎨" },
  { id: "documents", label: "Documents", icon: "📄" },
  { id: "videos", label: "Videos", icon: "🎥" },
  { id: "invoices", label: "Invoices", icon: "🧾" },
  { id: "development", label: "Development", icon: "💻" },
  { id: "final", label: "Final Delivery", icon: "📦" },
];

export function FileManagerSidebar({ 
  isOpen, 
  onClose,
  activeCategory,
  setActiveCategory
}: { 
  isOpen: boolean; 
  onClose: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
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
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }} // Fallback for initial render
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="font-bold tracking-tight text-xl">
            Project Files
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          
          <div className="px-4 mb-6">
            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3 px-2">Folders</h3>
            <nav className="space-y-1">
              {SIDEBAR_CATEGORIES.map((item) => {
                const isActive = activeCategory === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCategory(item.id);
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
                        layoutId="activeTabFiles"
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

          <div className="px-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3 px-2">Quick Filters</h3>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveCategory("starred");
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  activeCategory === "starred" ? "text-yellow-400 font-medium bg-yellow-400/10 border border-yellow-400/30" : "text-gray-400 hover:text-yellow-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <span className="text-lg">⭐</span>
                <span className="text-sm">Starred</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory("trash");
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  activeCategory === "trash" ? "text-red-400 font-medium bg-red-400/10 border border-red-400/30" : "text-gray-400 hover:text-red-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <span className="text-lg">🗑</span>
                <span className="text-sm">Trash</span>
              </button>
            </nav>
          </div>

        </div>

        <div className="p-6 border-t border-border">
          <div className="bg-surface/50 p-4 rounded-xl border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/30">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.01 1.763l-9.308 5.378 3.123 5.41h12.37l3.123-5.41zM23.116 13.8l-3.117-5.4h-6.223l6.237 10.8zM12.01 19.167L8.89 13.766H2.664l6.236 10.8z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Sync Engine</p>
              <p className="text-sm font-bold text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
