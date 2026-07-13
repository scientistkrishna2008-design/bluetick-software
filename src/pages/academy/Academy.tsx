import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Lock, Unlock, ChevronDown, CheckCircle2, Play, Award, BrainCircuit } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { MockClientChat } from "../../components/academy/MockClientChat";

import { MODULES, MOCK_CLIENTS, BADGES } from "./academyData";

export function Academy() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [activeClient, setActiveClient] = useState<any | null>(null);
  const [simulationsCompleted, setSimulationsCompleted] = useState(0);

  const progressPercentage = Math.round((completedModules.length / MODULES.length) * 100);
  const isCertified = completedModules.length === MODULES.length && simulationsCompleted > 0;

  const toggleModule = (id: number) => {
    if (!completedModules.includes(id)) {
      setCompletedModules([...completedModules, id]);
    }
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white relative overflow-hidden pb-24 pt-20">
      {/* Background Particles/Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-growbroo-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 pt-12 relative z-10 max-w-5xl">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-growbroo-500 blur-xl opacity-50 rounded-full" />
              <div className="w-16 h-16 bg-surface border border-growbroo-500/30 rounded-full flex items-center justify-center relative z-10">
                <GraduationCap className="text-growbroo-500" size={32} />
              </div>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            GrowBro Partner Academy
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-growbroo-400 font-medium mb-2">
            Learn. Sell. Earn. Grow.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to become a successful GrowBro Sales Partner.
          </motion.p>
        </div>

        {/* Progress Tracker */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="mb-16">
          <Card className="bg-white/[0.02] border-white/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div className="h-full bg-growbroo-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 1 }} />
            </div>
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <motion.circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#22C55E" strokeWidth="8" 
                      strokeLinecap="round"
                      initial={{ strokeDasharray: 283, strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 - (283 * progressPercentage) / 100 }}
                      transition={{ duration: 1 }}
                    />
                  </svg>
                  <div className="absolute text-xl font-bold">{progressPercentage}%</div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Academy Progress</h3>
                  <p className="text-gray-400 text-sm">Modules Completed: <span className="text-white font-bold">{completedModules.length} / {MODULES.length}</span></p>
                </div>
              </div>
              
              <div className="flex gap-8 text-center md:text-right">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Est. Time</p>
                  <p className="text-lg font-medium text-white">45 Minutes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Current Rank</p>
                  <p className="text-lg font-medium text-growbroo-500">Beginner</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievement Badges */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Award className="text-growbroo-500" /> Achievements</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar snap-x">
            {BADGES.map((badge, i) => (
              <motion.div 
                key={badge.id}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className={`snap-start shrink-0 w-32 h-32 rounded-2xl flex flex-col items-center justify-center p-4 relative border transition-all ${
                  badge.unlocked 
                    ? 'bg-growbroo-500/10 border-growbroo-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:border-growbroo-500/50' 
                    : 'bg-white/[0.02] border-white/5 opacity-50 grayscale backdrop-blur-sm'
                }`}
              >
                {!badge.unlocked && <Lock size={14} className="absolute top-3 right-3 text-white/20" />}
                <div className={`mb-3 ${badge.unlocked ? 'text-growbroo-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'text-gray-500'}`}>
                  {badge.icon}
                </div>
                <p className="text-xs font-bold text-center text-gray-200 mb-1">{badge.title}</p>
                <p className="text-[10px] text-center text-gray-500 leading-tight">{badge.condition}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Academy Modules */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CheckCircle2 className="text-growbroo-500" /> Training Modules</h2>
          <div className="space-y-3">
            {MODULES.map((mod, i) => {
              const isCompleted = completedModules.includes(mod.id);
              const isExpanded = expandedModule === mod.id;
              
              return (
                <motion.div key={mod.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card 
                    className={`cursor-pointer transition-all duration-300 overflow-hidden border ${
                      isExpanded ? 'bg-white/[0.05] border-white/20 shadow-lg' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                    }`}
                    onClick={() => toggleModule(mod.id)}
                  >
                    <div className="p-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isCompleted ? 'bg-growbroo-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-surface border border-white/10 text-gray-500'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{mod.id}</span>}
                        </div>
                        <div>
                          <h4 className={`font-bold transition-colors ${isExpanded ? 'text-white' : 'text-gray-200'}`}>{mod.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{mod.time} read</p>
                        </div>
                      </div>
                      <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 pt-0"
                        >
                          <div className="pt-4 border-t border-white/10 text-gray-300 text-sm leading-relaxed">
                            {mod.content}
                            <div className="mt-6">
                              <Button variant="outline" size="sm" className="border-growbroo-500/30 text-growbroo-400 hover:bg-growbroo-500 hover:text-white" onClick={(e) => { e.stopPropagation(); toggleModule(mod.id); }}>
                                Mark as Completed
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mock Client Simulator */}
        <div className="mb-24 relative">
          <div className="absolute -left-10 top-20 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <BrainCircuit className="text-growbroo-500" size={32} />
              Practice Before You Sell
            </h2>
            <p className="text-gray-400">Build confidence by talking to AI-powered mock clients before meeting real customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_CLIENTS.map((client, i) => (
              <motion.div key={client.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-gradient-to-br from-white/[0.05] to-transparent border-white/10 hover:border-growbroo-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all h-full group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Mock Client {client.id}</p>
                        <h3 className="text-xl font-bold text-white">{client.name}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        client.difficulty === 'Easy' ? 'bg-green-500/20 text-green-500 border border-green-500/20' :
                        client.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/20' :
                        client.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/20' :
                        'bg-red-500/20 text-red-500 border border-red-500/20'
                      }`}>
                        {client.difficulty}
                      </span>
                    </div>
                    
                    <div className="mb-6 flex-grow">
                      <div className="relative p-4 rounded-xl bg-black/40 border border-white/5 italic text-gray-300 text-sm mb-4">
                        <span className="absolute -top-3 left-4 text-4xl text-white/10 font-serif">"</span>
                        {client.initialMessage}
                        <span className="absolute -bottom-5 right-4 text-4xl text-white/10 font-serif">"</span>
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        <div>
                          <p className="text-[10px] text-growbroo-500 font-bold uppercase tracking-wider mb-1">Conversation Goal</p>
                          <p className="text-xs text-gray-300">{client.goal}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider mb-1">Winning Outcome</p>
                          <p className="text-xs text-gray-300">{client.outcome}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-white/5 hover:bg-growbroo-500 hover:text-white border border-white/10 group-hover:border-growbroo-500/50 transition-all gap-2"
                      onClick={() => setActiveClient(client)}
                    >
                      <Play size={16} /> Start Practice
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certification */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className={`overflow-hidden relative border ${isCertified ? 'bg-growbroo-500/5 border-growbroo-500/30' : 'bg-white/[0.02] border-white/10'}`}>
            {isCertified && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-growbroo-500/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
            )}
            <CardContent className="p-8 md:p-12 text-center relative z-10">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 border-4 ${
                isCertified ? 'bg-growbroo-500/20 border-growbroo-500 text-growbroo-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]' : 'bg-surface border-white/10 text-gray-600'
              }`}>
                {isCertified ? <Unlock size={32} /> : <Lock size={32} />}
              </div>
              
              <h2 className={`text-3xl font-bold mb-4 ${isCertified ? 'text-white' : 'text-gray-400'}`}>
                GrowBro Certified Sales Partner
              </h2>
              
              <div className="max-w-md mx-auto mb-8 text-left space-y-3 bg-black/40 p-6 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Requirements</p>
                <div className={`flex items-center gap-2 text-sm ${completedModules.length === MODULES.length ? 'text-green-500' : 'text-gray-400'}`}>
                  {completedModules.length === MODULES.length ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border border-gray-600" />}
                  Complete all 13 modules
                </div>
                <div className={`flex items-center gap-2 text-sm ${simulationsCompleted > 0 ? 'text-green-500' : 'text-gray-400'}`}>
                  {simulationsCompleted > 0 ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border border-gray-600" />}
                  Pass at least one mock client simulation
                </div>
              </div>

              <Button 
                variant="premium" 
                size="lg" 
                disabled={!isCertified}
                className={!isCertified ? 'opacity-50 cursor-not-allowed bg-surface hover:bg-surface border-white/10' : ''}
              >
                {isCertified ? 'Unlock Certificate' : 'Complete Requirements to Unlock'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

      </div>

      <MockClientChat 
        isOpen={!!activeClient} 
        onClose={() => setActiveClient(null)} 
        client={activeClient}
        onComplete={() => setSimulationsCompleted(prev => prev + 1)}
      />
    </div>
  );
}
