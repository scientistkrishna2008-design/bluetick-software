import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { CircularProgress } from "../../components/academy/CircularProgress";
import { engineerAcademyModules } from "./EngineerAcademyData";
// We will build these components next
import { ModuleViewer } from "../../components/academy/ModuleViewer";
import { ProjectSimulator } from "../../components/academy/ProjectSimulator";

const BADGES = [
  { id: 'first_project', icon: '🖥', title: 'First Project' },
  { id: 'speed_master', icon: '⚡', title: 'Speed Master' },
  { id: 'responsive', icon: '📱', title: 'Responsive Expert' },
  { id: 'ui_perfect', icon: '🎨', title: 'UI Perfectionist' },
  { id: 'security', icon: '🔒', title: 'Security Champion' },
  { id: 'premium', icon: '🚀', title: 'Premium Developer' },
  { id: 'elite', icon: '👑', title: 'GrowBro Elite Engineer' },
];

export function EngineerAcademy() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [isCertified, setIsCertified] = useState(false);
  
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);

  useEffect(() => {
    if (user) {
      // Load progress from local storage for MVP
      const key = `academy_progress_${user.uid}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCompletedModules(parsed.completedModules || []);
        setUnlockedBadges(parsed.unlockedBadges || []);
        setIsCertified(parsed.isCertified || false);
      }
    }
  }, [user]);

  const saveProgress = (newCompleted: string[], newBadges: string[], cert: boolean) => {
    if (!user) return;
    setCompletedModules(newCompleted);
    setUnlockedBadges(newBadges);
    setIsCertified(cert);
    localStorage.setItem(`academy_progress_${user.uid}`, JSON.stringify({
      completedModules: newCompleted,
      unlockedBadges: newBadges,
      isCertified: cert
    }));
  };

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      const newCompleted = [...completedModules, moduleId];
      // Logic for unlocking badges could go here based on module completion
      let newBadges = [...unlockedBadges];
      if (newCompleted.length === 1 && !newBadges.includes('first_project')) newBadges.push('first_project');
      if (newCompleted.length === 3 && !newBadges.includes('responsive')) newBadges.push('responsive');
      if (newCompleted.length === 5 && !newBadges.includes('ui_perfect')) newBadges.push('ui_perfect');
      
      saveProgress(newCompleted, newBadges, isCertified);
    }
    setActiveModuleId(null);
  };

  const handleSimulatorComplete = () => {
    let newBadges = [...unlockedBadges];
    if (!newBadges.includes('elite')) newBadges.push('elite');
    if (!newBadges.includes('premium')) newBadges.push('premium');
    saveProgress(completedModules, newBadges, true);
    setShowSimulator(false);
    
    // Simulate telling the DB about certification so assignments unlock
    // Ideally this hits a Supabase RPC or update query on creator_verifications
    alert("Congratulations! You are now a GrowBro Verified Engineer! Return to your dashboard to view assignments.");
  };

  const progressPercentage = (completedModules.length / engineerAcademyModules.length) * 100;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16 relative">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-growbroo-500/10 border border-growbroo-500/30 rounded-full text-growbroo-500 text-sm font-bold shadow-[0_0_15px_rgba(34,197,94,0.15)] mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Premium Learning Platform
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">GrowBro Web Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-growbroo-400 to-green-600">Academy</span></h1>
          <p className="text-lg text-gray-400 mb-6 max-w-xl">Learn GrowBro Standards. Build Premium Websites. Deliver With Confidence. Master the process and become eligible for high-ticket client projects.</p>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/dashboard/engineer')} variant="outline" className="border-gray-700 hover:bg-surface-hover">Back to Dashboard</Button>
            {isCertified && (
              <Button className="bg-growbroo-500 hover:bg-growbroo-600 text-black font-bold">View Certificate</Button>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0 bg-surface/50 border border-border p-6 rounded-3xl backdrop-blur-sm flex flex-col items-center">
          <CircularProgress progress={progressPercentage} size={140} strokeWidth={10} />
          <div className="mt-4 text-center">
            <p className="text-xl font-bold text-white">{completedModules.length} / {engineerAcademyModules.length}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Modules Completed</p>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          Achievement Badges
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
          {BADGES.map((badge, idx) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <motion.div 
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-500 ${
                  isUnlocked 
                    ? 'bg-growbroo-500/10 border-growbroo-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                    : 'bg-surface/30 border-border opacity-50 grayscale'
                }`}
              >
                <span className="text-3xl mb-2">{badge.icon}</span>
                <span className="text-xs font-bold text-center leading-tight">{badge.title}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-6">Curriculum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineerAcademyModules.map((mod, idx) => {
            const isCompleted = completedModules.includes(mod.id);
            // Allow first module, or if previous module is completed
            const isLocked = idx > 0 && !completedModules.includes(engineerAcademyModules[idx - 1].id);

            return (
              <Card 
                key={mod.id} 
                className={`transition-all duration-300 ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-growbroo-500/50 cursor-pointer'} ${isCompleted ? 'border-growbroo-500/30 bg-growbroo-500/5' : ''}`}
                onClick={() => !isLocked && setActiveModuleId(mod.id)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-gray-500">MODULE {idx + 1}</span>
                    {isCompleted ? (
                      <span className="w-6 h-6 rounded-full bg-growbroo-500/20 text-growbroo-500 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </span>
                    ) : isLocked ? (
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    ) : (
                      <span className="text-xs text-growbroo-500 font-medium bg-growbroo-500/10 px-2 py-1 rounded">Start</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{mod.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{mod.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {mod.duration}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Project Simulator Section */}
      <div className="mt-16 p-8 rounded-3xl border border-growbroo-500/30 bg-gradient-to-br from-growbroo-500/10 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-growbroo-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Final Stage: Project Simulator</h2>
          <p className="text-gray-300 mb-8 text-lg">Put your knowledge to the test. Receive a mock client brief, build the project, and submit it for AI Verification. Pass the simulator to earn your <span className="text-growbroo-500 font-bold">GrowBro Verified</span> badge.</p>
          
          <Button 
            className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 h-auto font-bold rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            disabled={progressPercentage < 100 || isCertified}
            onClick={() => setShowSimulator(true)}
          >
            {isCertified ? "Simulator Passed 🎉" : progressPercentage < 100 ? "Complete All Modules First" : "Launch Simulator"}
          </Button>
        </div>
      </div>

      {/* Download Center & Certification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* Download Center */}
        <Card className="bg-surface/30 border-border h-full">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-6">Download Center</h2>
            <div className="space-y-3">
              {[
                { name: "Website Delivery Checklist", type: "PDF" },
                { name: "SEO Optimization Guide", type: "PDF" },
                { name: "Performance Tuning Checklist", type: "PDF" },
                { name: "Quality Verification Standards", type: "PDF" },
              ].map((res, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-surface-hover/50 border border-transparent hover:border-border transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-growbroo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    <span className="font-medium text-sm text-gray-300 group-hover:text-white">{res.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-surface px-2 py-1 rounded">{res.type}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-bold text-growbroo-500 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                Mandatory Footer Snippet
              </h3>
              <p className="text-xs text-gray-400 mb-3">Copy and paste this into every client project footer.</p>
              <div className="bg-background p-4 rounded-xl border border-gray-800 font-mono text-xs text-gray-300 relative group overflow-x-auto">
                <pre>{`<div style={{ textAlign: 'center', padding: '1rem', fontSize: '12px', color: '#9CA3AF' }}>
  Designed & Developed by{' '}
  <a 
    href="https://growbro.com" 
    target="_blank" 
    rel="noreferrer" 
    style={{ color: '#22C55E', fontWeight: 'bold', textDecoration: 'none' }}
  >
    GrowBro®
  </a>
</div>`}</pre>
                <button className="absolute top-2 right-2 bg-surface p-2 rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-hover" onClick={(e) => {
                  navigator.clipboard.writeText(`<div style={{ textAlign: 'center', padding: '1rem', fontSize: '12px', color: '#9CA3AF' }}>\n  Designed & Developed by{' '}\n  <a href="https://growbro.com" target="_blank" rel="noreferrer" style={{ color: '#22C55E', fontWeight: 'bold', textDecoration: 'none' }}>GrowBro®</a>\n</div>`);
                  (e.target as any).innerText = "Copied!";
                  setTimeout(() => (e.target as any).innerText = "Copy", 2000);
                }}>Copy</button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certification Card */}
        <Card className={`h-full overflow-hidden transition-all duration-500 ${isCertified ? 'bg-gradient-to-br from-[#0a1910] to-background border-growbroo-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'bg-surface/30 border-border grayscale opacity-50'}`}>
          <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center relative">
            {isCertified && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-growbroo-500/20 blur-[80px] rounded-full pointer-events-none" />
            )}
            
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl relative z-10 ${isCertified ? 'bg-growbroo-500 text-black shadow-[0_0_50px_rgba(34,197,94,0.4)]' : 'bg-gray-800 text-gray-500'}`}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-1 relative z-10">GrowBro Certified Web Engineer</h2>
            <p className="text-gray-400 text-sm mb-8 relative z-10">Official Certification</p>
            
            <div className="w-full bg-background/50 backdrop-blur-md rounded-xl p-4 border border-border/50 text-left relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 uppercase">Engineer</span>
                <span className="text-sm font-bold text-white">{user?.name || 'Loading...'}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 uppercase">Engineer ID</span>
                <span className="text-sm font-mono text-gray-300">{user?.uid?.split('-')[0].toUpperCase() || 'XXX'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase">Status</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${isCertified ? 'bg-growbroo-500/20 text-growbroo-500' : 'bg-red-500/20 text-red-500'}`}>
                  {isCertified ? 'VERIFIED' : 'UNVERIFIED'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {activeModuleId && (
        <ModuleViewer 
          module={engineerAcademyModules.find(m => m.id === activeModuleId)!} 
          onClose={() => setActiveModuleId(null)}
          onComplete={() => handleModuleComplete(activeModuleId)}
        />
      )}

      {showSimulator && (
        <ProjectSimulator 
          onClose={() => setShowSimulator(false)}
          onSuccess={handleSimulatorComplete}
        />
      )}
    </div>
  );
}
