import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Send, Bot, User, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";

interface MockClientChatProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
  onComplete: () => void;
}

export function MockClientChat({ isOpen, onClose, client, onComplete }: MockClientChatProps) {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && client) {
      setMessages([{ role: 'ai', text: client.initialMessage }]);
      setConversationStage(0);
      setIsFinished(false);
      setInputValue("");
    }
  }, [isOpen, client]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping || isFinished) return;
    
    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking and replying
    setTimeout(() => {
      let aiResponse = "";
      
      if (conversationStage === 0) {
        if (userMsg.toLowerCase().includes("cost") || userMsg.toLowerCase().includes("free")) {
          aiResponse = "I'm not looking to spend a lot of money right now. How much is this going to cost me?";
        } else {
          aiResponse = "I hear you, but why should I trust you guys over some freelancer?";
        }
      } else if (conversationStage === 1) {
        aiResponse = "Hmm, okay. But how long is all this going to take? I'm very busy.";
      } else if (conversationStage === 2) {
        aiResponse = "Alright, you make some fair points. Let's say I'm interested. What's the next step?";
      }

      setIsTyping(false);
      
      if (conversationStage >= 2) {
        setIsFinished(true);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        setConversationStage(prev => prev + 1);
      }
    }, 1500 + Math.random() * 1000);
  };

  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Panel: Client Info */}
        <div className="w-full md:w-1/3 border-r border-white/10 bg-white/[0.02] p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white tracking-tight">Client Profile</h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden"><X size={20}/></Button>
          </div>
          
          <div className="space-y-6 flex-grow">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Business</p>
              <p className="text-lg text-white font-medium">{client.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Difficulty</p>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                client.difficulty === 'Easy' ? 'bg-green-500/20 text-green-500' :
                client.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                client.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-500' :
                'bg-red-500/20 text-red-500'
              }`}>
                {client.difficulty}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Key Objections</p>
              <ul className="space-y-2">
                {client.objections.map((obj: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <AlertCircle size={16} className="text-growbroo-500 shrink-0 mt-0.5" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel: Chat UI */}
        <div className="w-full md:w-2/3 flex flex-col h-full bg-[#050505] relative">
          <div className="hidden md:flex justify-end p-4 absolute top-0 right-0 z-10">
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white"><X size={20}/></Button>
          </div>
          
          {!isFinished ? (
            <>
              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar mt-12 md:mt-0">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === 'user' ? 'bg-growbroo-500 text-white' : 'bg-surface border border-white/10 text-gray-400'
                      }`}>
                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-growbroo-500 text-white rounded-tr-sm' 
                          : 'bg-white/[0.05] border border-white/5 text-gray-200 rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center shrink-0 text-gray-400">
                        <Bot size={16} />
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/5 flex gap-1 items-center rounded-tl-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-[#0A0A0A] border-t border-white/5">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your response to the client..."
                    className="flex-grow bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-growbroo-500 focus:ring-1 focus:ring-growbroo-500 transition-all"
                    disabled={isTyping}
                  />
                  <Button type="submit" disabled={!inputValue.trim() || isTyping} className="bg-growbroo-500 hover:bg-growbroo-600 text-white rounded-xl px-6">
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            // Scorecard UI
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-grow flex flex-col items-center justify-center p-8 overflow-y-auto custom-scrollbar">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border-4 border-green-500/30">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Simulation Complete</h2>
              <p className="text-gray-400 mb-8 text-center max-w-md">You successfully handled the objections and moved the client to the next step. Here is your AI generated scorecard.</p>
              
              <div className="w-full max-w-md space-y-4 mb-8">
                {[
                  { label: "Communication Score", score: 92 },
                  { label: "Confidence Score", score: 88 },
                  { label: "Professionalism Score", score: 95 },
                  { label: "Sales Score", score: 85 },
                  { label: "Objection Handling Score", score: 89 },
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{metric.label}</span>
                      <span className="text-growbroo-500 font-bold">{metric.score}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${metric.score}%` }} 
                        transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                        className="bg-gradient-to-r from-growbroo-600 to-growbroo-400 h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full max-w-md p-6 bg-white/[0.03] border border-white/10 rounded-xl mb-8">
                <h4 className="text-growbroo-500 font-bold mb-3 uppercase tracking-wider text-xs">AI Suggestions</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> You remained professional when they questioned the price.</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Good transition to explaining the workflow.</li>
                  <li className="flex items-start gap-2"><span className="text-yellow-500">!</span> Next time, try to ask more discovery questions before pitching.</li>
                </ul>
              </div>

              <Button variant="premium" size="lg" onClick={() => { onComplete(); onClose(); }} className="w-full max-w-md">
                Finish & Claim Progress
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
