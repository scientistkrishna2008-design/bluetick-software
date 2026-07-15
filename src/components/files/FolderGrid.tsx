import { motion } from "framer-motion";

interface Folder {
  id: string;
  name: string;
  fileCount: number;
  lastUpdated: string;
}

export function FolderGrid({ folders }: { folders: Folder[] }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm uppercase tracking-wider font-bold text-gray-500 mb-4 px-1">Project Folders</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {folders.map((folder, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={folder.id}
            className="bg-surface/30 border border-border/50 hover:bg-surface-hover hover:border-growbroo-500/50 rounded-xl p-4 cursor-pointer transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-growbroo-500/5 blur-[20px] rounded-full pointer-events-none group-hover:bg-growbroo-500/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-3 relative z-10">
              <svg className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
              </button>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-medium text-white mb-1 truncate group-hover:text-growbroo-500 transition-colors">{folder.name}</h3>
              <p className="text-xs text-gray-500">{folder.fileCount} files <span className="mx-1">•</span> {folder.lastUpdated}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
