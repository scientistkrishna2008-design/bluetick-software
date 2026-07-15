import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import { useNavigate } from "react-router";

export function CreatorVerification() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  
  // Step Management
  const [step, setStep] = useState(1);
  
  // Form Data
  const [personal, setPersonal] = useState({ phone: "", city: "", experience: "Junior (1-2 years)" });
  const [portfolios, setPortfolios] = useState([{ name: "", url: "", description: "", role: "", tech: "" }]);
  const [links, setLinks] = useState({ github: "", behance: "", dribbble: "", linkedin: "", website: "" });
  const [declaration, setDeclaration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkStatus();
  }, [user]);

  const checkStatus = async () => {
    if (!user) return;
    const { data } = await supabase.from("creator_verifications").select("status").eq("user_id", user.uid).single();
    if (data) {
      setStatus(data.status);
    }
    setLoading(false);
  };

  const addPortfolio = () => {
    setPortfolios([...portfolios, { name: "", url: "", description: "", role: "", tech: "" }]);
  };

  const updatePortfolio = (index: number, field: string, value: string) => {
    const newPorts = [...portfolios];
    newPorts[index] = { ...newPorts[index], [field]: value };
    setPortfolios(newPorts);
  };

  const removePortfolio = (index: number) => {
    const newPorts = portfolios.filter((_, i) => i !== index);
    setPortfolios(newPorts);
  };

  const submitVerification = async () => {
    if (!declaration) return alert("You must agree to the declaration.");
    setIsSubmitting(true);
    
    try {
      // 1. Insert Verification Record
      const { data: verifData, error: verifError } = await supabase.from("creator_verifications").insert({
        user_id: user?.uid,
        phone: personal.phone,
        city: personal.city,
        experience_level: personal.experience,
        github: links.github,
        behance: links.behance,
        dribbble: links.dribbble,
        linkedin: links.linkedin,
        portfolio_website: links.website,
        status: "Pending"
      }).select().single();

      if (verifError) throw verifError;

      // 2. Insert Portfolios
      const portInserts = portfolios.map(p => ({
        verification_id: verifData.id,
        website_name: p.name,
        live_url: p.url,
        description: p.description,
        role_in_project: p.role,
        technologies: p.tech,
      }));

      const { error: portError } = await supabase.from("creator_portfolios").insert(portInserts);
      if (portError) throw portError;

      // 3. Notify Admins
      await supabase.from("notifications").insert({
        user_id: user?.uid, // Using engineer id so they see it too, normally admin
        title: "Verification Submitted",
        message: "Your portfolio has been submitted successfully for review.",
        type: "verification"
      });

      setStatus("Pending");
    } catch (err: any) {
      console.error(err);
      alert("Error submitting verification: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen pt-24 text-center">Loading...</div>;

  if (status === "Verified") {
    navigate("/dashboard/engineer");
    return null;
  }

  if (status === "Pending") {
    return (
      <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-12 px-6 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-24 h-24 bg-[#22C55E]/20 text-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Thank You!</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Your portfolio has been submitted successfully. Our GrowBro Verification Team will review your work.</p>
          <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl inline-block text-left mb-8">
            <p className="text-sm text-gray-500 mb-1">Estimated Review Time:</p>
            <p className="text-md text-white font-medium mb-3">24–48 Hours</p>
            <p className="text-sm text-gray-500 mb-1">Status:</p>
            <p className="text-md text-[#22C55E] font-bold">Verification Pending</p>
          </div>
          <div>
            <Button variant="outline" onClick={() => navigate("/")}>Return Home</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#22C55E] opacity-5 rounded-[100%] blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">Creator <span className="text-[#22C55E]">Verification</span></h1>
          <p className="text-gray-400">Join the elite network of GrowBro Verified Creators.</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-800 -z-10 rounded-full"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#22C55E] -z-10 rounded-full transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          {[1, 2, 3, 4].map(num => (
            <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-300 ${step >= num ? 'bg-[#22C55E] border-[#22C55E] text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-[#111] border-gray-700 text-gray-500'}`}>
              {num}
            </div>
          ))}
        </div>

        <Card className="bg-[#111111]/80 backdrop-blur-xl border-gray-800 shadow-2xl">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Step 1: Personal Details</h2>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Phone Number</label>
                    <Input value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} placeholder="+1..." className="bg-black/50 border-gray-800 text-white focus:border-[#22C55E] focus:ring-[#22C55E]" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">City / Location</label>
                    <Input value={personal.city} onChange={e => setPersonal({...personal, city: e.target.value})} placeholder="e.g. New York, NY" className="bg-black/50 border-gray-800 text-white focus:border-[#22C55E] focus:ring-[#22C55E]" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Experience Level</label>
                    <select value={personal.experience} onChange={e => setPersonal({...personal, experience: e.target.value})} className="flex h-10 w-full rounded-md border border-gray-800 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]">
                      <option value="Beginner (0-1 years)">Beginner (0-1 years)</option>
                      <option value="Junior (1-2 years)">Junior (1-2 years)</option>
                      <option value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</option>
                      <option value="Senior (5+ years)">Senior (5+ years)</option>
                    </select>
                  </div>

                  <Button className="w-full bg-[#22C55E] hover:bg-[#1ea950] text-black font-bold mt-8" onClick={() => setStep(2)}>Next Step →</Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Step 2: Portfolio Submission</h2>
                  <p className="text-gray-400 text-sm mb-6">Showcase your best work. You can add multiple websites.</p>

                  <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {portfolios.map((port, idx) => (
                      <div key={idx} className="p-5 rounded-xl border border-gray-800 bg-black/30 space-y-4 relative">
                        {portfolios.length > 1 && (
                          <button onClick={() => removePortfolio(idx)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                            ✕
                          </button>
                        )}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Website Name</label>
                          <Input value={port.name} onChange={e => updatePortfolio(idx, 'name', e.target.value)} placeholder="Acme Corp" className="bg-black/50 border-gray-800 text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Live URL</label>
                          <Input value={port.url} onChange={e => updatePortfolio(idx, 'url', e.target.value)} placeholder="https://..." className="bg-black/50 border-gray-800 text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Project Description</label>
                          <textarea value={port.description} onChange={e => updatePortfolio(idx, 'description', e.target.value)} className="w-full bg-black/50 border border-gray-800 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-white" rows={3} placeholder="What was this project about?"></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Your Role</label>
                            <Input value={port.role} onChange={e => updatePortfolio(idx, 'role', e.target.value)} placeholder="Lead Developer" className="bg-black/50 border-gray-800 text-white" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Technologies</label>
                            <Input value={port.tech} onChange={e => updatePortfolio(idx, 'tech', e.target.value)} placeholder="React, Tailwind, Supabase" className="bg-black/50 border-gray-800 text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-gray-500" onClick={addPortfolio}>
                    + Add Another Website
                  </Button>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" className="flex-1 border-gray-800 text-gray-400" onClick={() => setStep(1)}>← Back</Button>
                    <Button className="flex-1 bg-[#22C55E] hover:bg-[#1ea950] text-black font-bold" onClick={() => setStep(3)}>Next Step →</Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Step 3: Optional Links</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Personal Website</label>
                      <Input value={links.website} onChange={e => setLinks({...links, website: e.target.value})} placeholder="https://..." className="bg-black/50 border-gray-800 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">GitHub</label>
                      <Input value={links.github} onChange={e => setLinks({...links, github: e.target.value})} placeholder="github.com/..." className="bg-black/50 border-gray-800 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">LinkedIn</label>
                      <Input value={links.linkedin} onChange={e => setLinks({...links, linkedin: e.target.value})} placeholder="linkedin.com/in/..." className="bg-black/50 border-gray-800 text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Behance</label>
                        <Input value={links.behance} onChange={e => setLinks({...links, behance: e.target.value})} placeholder="behance.net/..." className="bg-black/50 border-gray-800 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Dribbble</label>
                        <Input value={links.dribbble} onChange={e => setLinks({...links, dribbble: e.target.value})} placeholder="dribbble.com/..." className="bg-black/50 border-gray-800 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" className="flex-1 border-gray-800 text-gray-400" onClick={() => setStep(2)}>← Back</Button>
                    <Button className="flex-1 bg-[#22C55E] hover:bg-[#1ea950] text-black font-bold" onClick={() => setStep(4)}>Next Step →</Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Step 4: Declaration</h2>
                  
                  <div className="p-6 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/5">
                    <label className="flex items-start gap-4 cursor-pointer">
                      <div className="pt-1">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-gray-700 text-[#22C55E] focus:ring-[#22C55E] bg-black"
                          checked={declaration}
                          onChange={e => setDeclaration(e.target.checked)}
                        />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">I confirm that the submitted work is my own.</p>
                        <p className="text-sm text-gray-400">I have permission to showcase these projects, and I understand that providing false information will result in immediate ban from the GrowBro network.</p>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" className="w-1/3 border-gray-800 text-gray-400" onClick={() => setStep(3)}>← Back</Button>
                    <Button 
                      className={`flex-1 font-bold ${declaration ? 'bg-[#22C55E] hover:bg-[#1ea950] text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`} 
                      onClick={submitVerification}
                      disabled={!declaration || isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit for Verification"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
