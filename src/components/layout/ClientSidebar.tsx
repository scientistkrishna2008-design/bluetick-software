import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", path: "/dashboard/client" },
  { id: "projects", label: "My Projects", icon: "📁", path: "/dashboard/client/projects" },
  { id: "messages", label: "Messages", icon: "💬", path: "/dashboard/client/messages" },
  { id: "files", label: "Files", icon: "📂", path: "/dashboard/client/files" },
  { id: "payments", label: "Payments", icon: "💳", path: "/dashboard/client/payments" },
  { id: "hosting", label: "Domain & Hosting", icon: "🌐", path: "/dashboard/client/hosting" },
  { id: "support", label: "Support", icon: "🎫", path: "/dashboard/client/support" },
  { id: "analytics", label: "Analytics", icon: "📊", path: "/dashboard/client/analytics" },
  { id: "profile", label: "Profile", icon: "👤", path: "/dashboard/client/profile" },
];

export function ClientSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

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
          <Link to="/dashboard/client" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            Grow<span className="text-growbroo-500">Bro</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? "text-white font-medium bg-white/5" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-growbroo-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="text-xl opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border">
          <div className="bg-surface p-4 rounded-xl border border-border">
            <p className="text-xs text-gray-400 mb-1">Need help?</p>
            <p className="text-sm font-bold text-white mb-3">Contact Success Manager</p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors border border-white/10">
              Schedule Call
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
