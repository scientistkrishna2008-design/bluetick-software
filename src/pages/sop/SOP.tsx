import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Search, Printer, ChevronDown, User, Clock, FileText, Activity } from "lucide-react";
import { PIPELINE, SOPS } from "./sopData";

export function SOP() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSOPs, setExpandedSOPs] = useState<number[]>([]);

  const toggleSOP = (id: number) => {
    setExpandedSOPs(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const filteredSOPs = useMemo(() => {
    return SOPS.filter(sop => 
      sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-20 pb-24 relative overflow-hidden">
      {/* Print Styles injected locally */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #sop-print-area, #sop-print-area * { visibility: visible; }
          #sop-print-area { position: absolute; left: 0; top: 0; width: 100%; color: black !important; background: white !important; }
          .no-print { display: none !important; }
          .print-card { page-break-inside: avoid; border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
          .print-text-dark { color: #333 !important; }
        }
      `}</style>

      {/* Background Particles/Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-growbroo-500/10 blur-[150px] rounded-full pointer-events-none no-print" />
      
      <div className="container mx-auto px-6 pt-8 max-w-7xl relative z-10" id="sop-print-area">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <Settings className="text-growbroo-500" size={24} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-print-dark">Standard Operating Procedures</h1>
                <p className="text-growbroo-400 font-medium text-sm tracking-widest uppercase mt-1">GrowBro SOP v1.0</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-2xl text-print-dark">
              Every successful project follows the same professional process to ensure quality, speed, and consistency.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-3 no-print">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Last Updated: Today</p>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <Printer size={16} /> Print to PDF
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Sidebar */}
          <div className="lg:w-1/3 shrink-0 space-y-8 no-print">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Search SOPs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-growbroo-500/50 transition-colors"
              />
            </div>

            {/* Visual Pipeline */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Activity className="text-growbroo-500" size={20} />
                Project Lifecycle
              </h3>
              
              <div className="space-y-1 relative before:absolute before:inset-0 before:ml-4 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {PIPELINE.map((stage, i) => (
                  <div key={i} className="flex items-center gap-4 relative z-10 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-growbroo-500 group-hover:border-growbroo-500/50 group-hover:text-white transition-all shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-white transition-colors" />
                    </div>
                    <div className="py-3">
                      <p className="text-sm text-gray-400 group-hover:text-white font-medium transition-colors">{stage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - SOP Cards */}
          <div className="lg:w-2/3 space-y-4">
            {filteredSOPs.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border border-white/5 rounded-2xl bg-white/[0.01]">
                No SOPs found matching "{searchQuery}"
              </div>
            ) : (
              filteredSOPs.map((sop, idx) => {
                const isExpanded = expandedSOPs.includes(sop.id);
                return (
                  <motion.div 
                    key={sop.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`print-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? 'bg-white/[0.03] border-white/20 shadow-lg' 
                        : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div 
                      className="p-6 cursor-pointer flex items-start justify-between gap-4 group"
                      onClick={() => toggleSOP(sop.id)}
                    >
                      <div>
                        <h2 className="text-xl font-bold text-white mb-1 group-hover:text-growbroo-400 transition-colors">{sop.title}</h2>
                        <p className="text-sm text-gray-400">{sop.purpose}</p>
                      </div>
                      <ChevronDown 
                        size={24} 
                        className={`text-gray-500 transition-transform duration-300 shrink-0 mt-1 no-print ${isExpanded ? 'rotate-180 text-white' : ''}`} 
                      />
                    </div>

                    <AnimatePresence>
                      {(isExpanded || typeof window === 'undefined') && ( // Render for print basically
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6"
                        >
                          <div className="pt-6 border-t border-white/10">
                            
                            {/* Meta Info Grid */}
                            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 text-growbroo-500 mb-1">
                                  <User size={14} />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">Responsible</span>
                                </div>
                                <p className="text-sm font-medium text-white">{sop.responsible}</p>
                              </div>
                              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 text-blue-500 mb-1">
                                  <Clock size={14} />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">Est. Time</span>
                                </div>
                                <p className="text-sm font-medium text-white">{sop.time}</p>
                              </div>
                              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 text-purple-500 mb-1">
                                  <FileText size={14} />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">Required Docs</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {sop.documents.map((doc, i) => (
                                    <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">{doc}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Main SOP Content */}
                            <div className="prose prose-invert max-w-none print-text-dark">
                              {sop.content}
                            </div>
                            
                            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4 no-print">
                              <span className="text-xs text-gray-500 font-bold tracking-wider">SOP ID: {String(sop.id).padStart(3, '0')}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-growbroo-500 animate-pulse" />
                                <span className="text-xs text-growbroo-500 font-medium">Active Standard</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
