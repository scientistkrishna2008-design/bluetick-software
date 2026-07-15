import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DragDropZoneProps {
  children: React.ReactNode;
}

export function DragDropZone({ children }: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateUpload();
    }
  }, []);

  const simulateUpload = () => {
    setIsUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);
  };

  return (
    <div 
      className="relative min-h-full flex flex-col"
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {children}

      <AnimatePresence>
        {isDragging && !isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 rounded-2xl border-2 border-dashed border-growbroo-500 bg-growbroo-500/10 backdrop-blur-sm flex flex-col items-center justify-center m-4"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-4xl mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)] border border-growbroo-500/30"
            >
              ⬆️
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Drop files to upload</h2>
            <p className="text-gray-300">Files will sync directly to Google Drive</p>
          </motion.div>
        )}

        {isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-4 z-50 mx-auto max-w-md bg-surface border border-border rounded-xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-growbroo-500/10 blur-[30px] rounded-full pointer-events-none" />
            <h3 className="font-bold text-lg mb-1">Uploading 3 Files...</h3>
            <p className="text-xs text-gray-400 mb-4 flex justify-between">
              <span>{Math.min(progress, 100)}% Complete</span>
              <span>12 MB/s • ~4s left</span>
            </p>
            
            <div className="h-2 w-full bg-background rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-growbroo-600 to-growbroo-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
