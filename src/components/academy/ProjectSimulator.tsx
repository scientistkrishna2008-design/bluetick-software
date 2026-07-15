import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

interface ProjectSimulatorProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectSimulator({ onClose, onSuccess }: ProjectSimulatorProps) {
  const [step, setStep] = useState<'brief' | 'submission' | 'verifying' | 'results'>('brief');
  const [mockUrl, setMockUrl] = useState("");
  
  // Verification progress states
  const [verificationProgress, setVerificationProgress] = useState({
    ui: 0, perf: 0, res: 0, seo: 0, code: 0
  });

  useEffect(() => {
    if (step === 'verifying') {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress > 100) currentProgress = 100;
        
        setVerificationProgress({
          ui: Math.min(currentProgress + (Math.random() * 10 - 5), 100),
          perf: Math.min(currentProgress + (Math.random() * 5), 100),
          res: Math.min(currentProgress, 100),
          seo: Math.min(currentProgress + (Math.random() * 15), 100),
          code: Math.min(currentProgress + (Math.random() * 2), 100),
        });

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep('results'), 1000);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl relative">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-growbroo-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {step === 'brief' && (
            <motion.div
              key="brief"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-background/80 border-growbroo-500/30 backdrop-blur-sm">
                <CardHeader className="border-b border-border bg-surface/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-growbroo-500 font-mono text-xs tracking-wider uppercase mb-1 block">Simulation Environment</span>
                      <CardTitle className="text-2xl">Client Brief: ABC Bakery</CardTitle>
                    </div>
                    <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white rounded-full">✕</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-surface/30 p-4 rounded-xl border border-border">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Plan Selected</p>
                      <p className="font-bold text-white">Business Website Plan</p>
                    </div>
                    <div className="bg-surface/30 p-4 rounded-xl border border-border">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Deadline</p>
                      <p className="font-bold text-white">72 Hours</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3">Requirements</h3>
                    <ul className="space-y-2 text-gray-300 list-disc list-inside">
                      <li>5 Pages: Home, About, Products, Gallery, Contact.</li>
                      <li>Contact Form & WhatsApp floating button required.</li>
                      <li>Embed Google Maps on the Contact page.</li>
                      <li>Fully mobile responsive with modern, premium aesthetics.</li>
                      <li>Include the GrowBro® mandatory footer.</li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-border flex justify-end">
                    <Button variant="premium" onClick={() => setStep('submission')} className="px-8">Accept Mock Project</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'submission' && (
            <motion.div
              key="submission"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-background/80 border-growbroo-500/30 backdrop-blur-sm">
                <CardHeader className="border-b border-border bg-surface/50">
                  <CardTitle className="text-xl">Submit Mock Project</CardTitle>
                </CardHeader>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Simulate Your Work</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">Pretend you've spent the last 48 hours building the perfect website for ABC Bakery. Paste any mock Vercel URL below to trigger the AI Verification System.</p>
                  
                  <div className="max-w-md mx-auto space-y-4">
                    <Input 
                      placeholder="https://abc-bakery-mock.vercel.app" 
                      value={mockUrl}
                      onChange={(e: any) => setMockUrl(e.target.value)}
                      className="text-center"
                    />
                    <Button 
                      variant="premium" 
                      disabled={!mockUrl.includes('.')} 
                      onClick={() => setStep('verifying')}
                      className="w-full"
                    >
                      Run AI Verification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'verifying' && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-growbroo-400 to-green-600">AI Verification in Progress</h2>
                <p className="text-gray-400">Scanning codebase against GrowBro Premium Standards...</p>
              </div>

              <Card className="bg-surface/30 border-border p-6 max-w-md mx-auto space-y-6">
                <ProgressBar label="UI/UX Aesthetics" progress={verificationProgress.ui} color="bg-purple-500" />
                <ProgressBar label="Performance & Optimization" progress={verificationProgress.perf} color="bg-blue-500" />
                <ProgressBar label="Mobile Responsiveness" progress={verificationProgress.res} color="bg-growbroo-500" />
                <ProgressBar label="SEO & Accessibility" progress={verificationProgress.seo} color="bg-yellow-500" />
                <ProgressBar label="Code Quality" progress={verificationProgress.code} color="bg-pink-500" />
              </Card>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-4xl font-bold mb-4">Verification Passed!</h2>
              <p className="text-xl text-gray-300 mb-8">Excellent work. Your mock project scored <span className="text-green-500 font-bold">98/100</span>.</p>
              
              <Card className="bg-surface/30 border-growbroo-500/30 p-6 max-w-xl mx-auto mb-8 text-left">
                <h3 className="font-bold text-growbroo-500 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  AI Feedback
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Beautiful use of glassmorphism and subtle animations. The mobile layout collapses perfectly without horizontal scrolling. Image optimization saved 2.4MB on the initial load. The mandatory GrowBro footer was detected and properly formatted. Ready for client handoff."
                </p>
              </Card>

              <Button onClick={onSuccess} className="bg-growbroo-500 text-black hover:bg-growbroo-600 font-bold text-lg px-12 py-6 h-auto rounded-xl">
                Claim Verification Badge
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProgressBar({ label, progress, color }: { label: string, progress: number, color: string }) {
  return (
    <div className="text-left">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
        <span className="text-gray-400">{label}</span>
        <span className="text-white">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-background rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}`}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.3 }}
        />
      </div>
    </div>
  );
}
