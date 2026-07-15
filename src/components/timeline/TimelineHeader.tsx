import { Button } from "../ui/Button";

interface TimelineHeaderProps {
  projectName: string;
  ticketNumber: string;
}

export function TimelineHeader({ projectName, ticketNumber }: TimelineHeaderProps) {
  return (
    <div className="mb-8 space-y-6">
      
      {/* Top Header Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{projectName}</h1>
          <p className="text-gray-400">
            Project Timeline <span className="mx-2 text-gray-600">•</span> {ticketNumber}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <div className="relative group flex-1 lg:flex-none">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-growbroo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Search activity..." 
              className="w-full lg:w-64 bg-surface/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-growbroo-500 transition-shadow"
            />
          </div>
          
          <Button variant="outline" className="border-border text-gray-300 hover:text-white shrink-0 hidden sm:flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Blocker Card (Waiting Status) */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex items-start gap-4 relative z-10">
          <div className="text-3xl animate-pulse">⏳</div>
          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-1">Waiting for Client</h3>
            <p className="text-yellow-500/80 text-sm">Client has not uploaded the business logo and branding assets.</p>
          </div>
        </div>
        <Button variant="outline" className="shrink-0 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black relative z-10">
          Send Reminder Ping
        </Button>
      </div>

    </div>
  );
}
