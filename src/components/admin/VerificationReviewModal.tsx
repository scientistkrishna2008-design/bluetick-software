import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

interface VerificationReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  verification: any;
  userMap: any[];
  onUpdate: () => void;
}

export function VerificationReviewModal({ isOpen, onClose, verification, userMap, onUpdate }: VerificationReviewModalProps) {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen && verification) {
      fetchPortfolios();
    }
  }, [isOpen, verification]);

  const fetchPortfolios = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('creator_portfolios')
      .select('*')
      .eq('verification_id', verification.id);
    if (data) setPortfolios(data);
    setIsLoading(false);
  };

  const handleAction = async (status: 'Verified' | 'Rejected') => {
    if (!window.confirm(`Are you sure you want to mark this as ${status}?`)) return;
    setIsProcessing(true);
    
    try {
      // 1. Update verification status
      let score = null;
      if (status === 'Verified') {
        const scoreInput = window.prompt("Assign a portfolio score from 1 to 10 (Optional):", "8");
        if (scoreInput && !isNaN(Number(scoreInput))) {
          score = Number(scoreInput);
        }
      }

      await supabase.from('creator_verifications').update({ status, portfolio_score: score }).eq('id', verification.id);
      
      // 2. Notify the creator
      const title = status === 'Verified' ? "Verification Approved! 🎉" : "Verification Rejected";
      const msg = status === 'Verified' 
        ? "Your Creator Verification has been approved! You are now eligible to receive GrowBro projects."
        : "Unfortunately, your portfolio did not meet our requirements at this time. Please update your portfolio and try again later.";
        
      await supabase.from('notifications').insert({
        user_id: verification.user_id,
        title,
        message: msg,
        type: 'verification'
      });

      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
    setIsProcessing(false);
  };

  if (!isOpen || !verification) return null;
  const creator = userMap.find(u => u.id === verification.user_id);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-background/95 border-border shadow-[0_0_50px_rgba(34,197,94,0.1)]">
        <CardHeader className="flex flex-row justify-between items-center border-b border-border pb-4 bg-[#111]">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              Review: {creator?.name}
              <span className={`text-xs px-2 py-1 rounded-full ${verification.status === 'Verified' ? 'bg-green-500/10 text-green-500' : verification.status === 'Rejected' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                {verification.status}
              </span>
            </CardTitle>
            <p className="text-sm text-gray-400 mt-1">{creator?.email} • {verification.phone} • {verification.city}</p>
          </div>
          <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-white">✕</Button>
        </CardHeader>
        <CardContent className="overflow-y-auto p-6 flex-grow bg-[#0B0B0B]">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#111] p-4 rounded-lg border border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Experience</p>
              <p className="font-bold text-white">{verification.experience_level}</p>
            </div>
            <div className="bg-[#111] p-4 rounded-lg border border-gray-800 col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Creator Links</p>
              <div className="flex flex-wrap gap-3">
                {verification.portfolio_website && <a href={verification.portfolio_website} target="_blank" rel="noreferrer" className="text-xs px-3 py-1 bg-surface border border-border rounded hover:border-growbroo-500 transition-colors">Website</a>}
                {verification.github && <a href={`https://${verification.github}`} target="_blank" rel="noreferrer" className="text-xs px-3 py-1 bg-surface border border-border rounded hover:border-growbroo-500 transition-colors">GitHub</a>}
                {verification.linkedin && <a href={`https://${verification.linkedin}`} target="_blank" rel="noreferrer" className="text-xs px-3 py-1 bg-surface border border-border rounded hover:border-growbroo-500 transition-colors">LinkedIn</a>}
                {verification.behance && <a href={`https://${verification.behance}`} target="_blank" rel="noreferrer" className="text-xs px-3 py-1 bg-surface border border-border rounded hover:border-growbroo-500 transition-colors">Behance</a>}
                {verification.dribbble && <a href={`https://${verification.dribbble}`} target="_blank" rel="noreferrer" className="text-xs px-3 py-1 bg-surface border border-border rounded hover:border-growbroo-500 transition-colors">Dribbble</a>}
                {(!verification.portfolio_website && !verification.github && !verification.linkedin && !verification.behance && !verification.dribbble) && <span className="text-sm text-gray-500">No links provided</span>}
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">Submitted Portfolios</h3>
          
          {isLoading ? (
            <div className="text-center text-gray-400 py-8">Loading portfolios...</div>
          ) : portfolios.length === 0 ? (
            <div className="text-center text-gray-400 py-8 border border-dashed border-gray-800 rounded-lg">No portfolios submitted.</div>
          ) : (
            <div className="space-y-4">
              {portfolios.map(p => (
                <div key={p.id} className="bg-[#111] border border-gray-800 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-white">{p.website_name}</h4>
                      <a href={p.live_url} target="_blank" rel="noreferrer" className="text-sm text-growbroo-500 hover:underline">{p.live_url}</a>
                    </div>
                    <span className="text-xs px-2 py-1 bg-surface text-gray-400 rounded border border-gray-800">
                      Role: {p.role_in_project}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{p.description}</p>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tech Stack</p>
                    <p className="text-sm text-gray-300 font-mono">{p.technologies}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {verification.status === 'Pending' && (
            <div className="mt-8 pt-6 border-t border-gray-800 flex gap-4 justify-end sticky bottom-0 bg-[#0B0B0B] py-2">
              <Button 
                variant="outline" 
                className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                onClick={() => handleAction('Rejected')}
                disabled={isProcessing}
              >
                Reject Portfolio
              </Button>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-black font-bold"
                onClick={() => handleAction('Verified')}
                disabled={isProcessing}
              >
                Approve & Verify Creator
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
