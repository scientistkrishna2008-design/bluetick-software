

export function ProjectHealthPanel() {
  const teamStatus = [
    { role: "Client", name: "Sarah M.", status: "Online", color: "bg-green-500" },
    { role: "Growth Partner", name: "David Chen", status: "Away", color: "bg-yellow-500" },
    { role: "Web Engineer", name: "Elena R.", status: "Online", color: "bg-green-500" },
    { role: "Admin", name: "System", status: "Online", color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Quick Metrics */}
      <div className="bg-surface/30 border border-border/50 rounded-2xl p-6">
        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-4">Project Health</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Current Stage</span>
            <span className="text-sm font-bold text-growbroo-500 bg-growbroo-500/10 px-2 py-1 rounded">Development</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Today's Activities</span>
            <span className="text-sm font-bold text-white">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Files Uploaded</span>
            <span className="text-sm font-bold text-white">142</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Open Tasks</span>
            <span className="text-sm font-bold text-yellow-500">2</span>
          </div>
        </div>
      </div>

      {/* Team Activity */}
      <div className="bg-surface/30 border border-border/50 rounded-2xl p-6">
        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-4">Team Presence</h3>
        
        <div className="space-y-4">
          {teamStatus.map((member, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center font-bold border border-border">
                  {member.name.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0B0B0B] ${member.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{member.name}</p>
                <p className="text-xs text-gray-500 truncate">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-surface/30 border border-border/50 rounded-2xl p-6">
        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-4">Key Milestones</h3>
        
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          <div className="relative flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 z-10">
              <span className="text-[10px]">🎉</span>
            </div>
            <p className="text-sm font-medium text-white">Project Started</p>
          </div>
          <div className="relative flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 z-10">
              <span className="text-[10px]">💸</span>
            </div>
            <p className="text-sm font-medium text-white">First Payment</p>
          </div>
          <div className="relative flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center border border-border z-10">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
            </div>
            <p className="text-sm font-medium text-gray-400">UI Approved</p>
          </div>
          <div className="relative flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center border border-border z-10">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
            </div>
            <p className="text-sm font-medium text-gray-400">Website Delivered</p>
          </div>
        </div>
      </div>

    </div>
  );
}
