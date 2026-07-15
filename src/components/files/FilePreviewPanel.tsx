import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import type { FileItem } from "./FileTable";

interface FilePreviewPanelProps {
  file: FileItem | null;
  onClose: () => void;
}

export function FilePreviewPanel({ file, onClose }: FilePreviewPanelProps) {
  return (
    <AnimatePresence>
      {file && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-[#0f0f0f] border-l border-border z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-bold text-lg">File Preview</h3>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-surface">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Preview Box */}
              <div className="w-full aspect-square bg-surface border border-border rounded-xl flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <Button variant="premium" className="scale-90">Full Screen</Button>
                </div>
                <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {file.type === 'image' ? '🖼️' : file.type === 'document' ? '📄' : '📁'}
                </span>
                <p className="text-gray-400 text-sm">Preview not available</p>
              </div>

              {/* Details */}
              <div>
                <h4 className="font-bold text-xl mb-1 text-white truncate">{file.name}</h4>
                <p className="text-sm text-gray-500">{file.size} • Uploaded {file.date}</p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Download
                </Button>
                <Button variant="outline" className="border-border text-gray-300 hover:text-white">
                  Copy Link
                </Button>
              </div>

              {/* Properties Table */}
              <div className="bg-surface/30 rounded-xl border border-border/50 overflow-hidden">
                <div className="p-3 border-b border-border/50 flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase font-bold">Category</span>
                  <span className="text-sm text-white font-medium">{file.category}</span>
                </div>
                <div className="p-3 border-b border-border/50 flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase font-bold">Uploaded By</span>
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <div className="w-4 h-4 rounded-full bg-growbroo-500/20 text-growbroo-500 flex items-center justify-center text-[8px]">{file.uploader.charAt(0)}</div>
                    {file.uploader}
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase font-bold">Drive Sync</span>
                  <span className="text-sm text-green-500 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Synced
                  </span>
                </div>
              </div>

              {/* Version History */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3">Version History</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-growbroo-500/30">
                    <div className="flex items-center gap-3">
                      <span className="bg-growbroo-500 text-black text-xs font-bold px-2 py-0.5 rounded">v2</span>
                      <span className="text-sm font-medium">Current Version</span>
                    </div>
                    <span className="text-xs text-gray-400">Just now</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30 border border-transparent">
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-800 text-gray-400 text-xs font-bold px-2 py-0.5 rounded">v1</span>
                      <span className="text-sm text-gray-400 line-through decoration-gray-500">Original Upload</span>
                    </div>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-[#0a0a0a]">
              <Button variant="outline" className="w-full text-blue-400 border-blue-500/30 hover:bg-blue-500 hover:text-white flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.01 1.763l-9.308 5.378 3.123 5.41h12.37l3.123-5.41zM23.116 13.8l-3.117-5.4h-6.223l6.237 10.8zM12.01 19.167L8.89 13.766H2.664l6.236 10.8z"/>
                </svg>
                Open in Google Drive
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
