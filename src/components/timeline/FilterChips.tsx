const FILTERS = [
  "All",
  "Payments",
  "Development",
  "Verification",
  "Files",
  "Support",
  "Comments",
  "System Events",
  "Assignments",
  "Deployment"
];

export function FilterChips({ activeFilter, setActiveFilter }: { activeFilter: string, setActiveFilter: (f: string) => void }) {
  return (
    <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar border-b border-border/50">
      {FILTERS.map(filter => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
            activeFilter === filter 
              ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
              : "bg-surface/50 text-gray-400 border-border/50 hover:border-gray-500 hover:text-white"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
