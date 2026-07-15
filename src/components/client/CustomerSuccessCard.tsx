import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

export function CustomerSuccessCard() {
  return (
    <Card className="bg-gradient-to-b from-growbroo-500/10 to-transparent border-growbroo-500/30 overflow-hidden relative group h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-growbroo-500/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-growbroo-500/30 transition-colors" />
      <CardContent className="p-6 flex flex-col h-full relative z-10 text-center items-center justify-center">
        
        <div className="w-16 h-16 rounded-full bg-growbroo-500 text-black flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          VG
        </div>
        
        <h3 className="text-xl font-bold mb-2">Need Help?</h3>
        <p className="text-sm text-gray-400 mb-6">Your dedicated Customer Success Manager, Vishal, is here to assist you with anything you need.</p>
        
        <div className="bg-surface/50 border border-border rounded-xl p-3 w-full mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg Response Time</p>
          <p className="font-bold text-growbroo-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-growbroo-500 animate-pulse" />
            Under 15 Minutes
          </p>
        </div>

        <div className="w-full space-y-3 mt-auto">
          <Button variant="premium" className="w-full flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            Chat Now
          </Button>
          <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:text-white hover:border-growbroo-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Schedule Call
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
}
