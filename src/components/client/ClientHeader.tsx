import { motion } from "framer-motion";

interface ClientHeaderProps {
  clientName: string;
  businessName: string;
  projectName: string;
  progress: number;
  currentStage: string;
  deliveryDate: string;
}

export function ClientHeader({
  clientName,
  businessName,
  projectName,
  progress,
  currentStage,
  deliveryDate,
}: ClientHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            👋 Welcome back, {clientName}
          </h1>
          <p className="text-gray-400 text-lg">
            {businessName} <span className="text-gray-600 mx-2">•</span> {projectName}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Expected Delivery</p>
          <p className="font-bold text-white bg-surface py-1.5 px-4 rounded-lg border border-border inline-block">
            {deliveryDate}
          </p>
        </div>
      </div>

      <div className="bg-surface/30 border border-border rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-growbroo-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex justify-between items-end mb-4 relative z-10">
          <div>
            <p className="text-sm font-bold text-growbroo-500 uppercase tracking-wider mb-1">Current Stage</p>
            <p className="text-xl font-bold text-white">{currentStage}</p>
          </div>
          <span className="text-2xl font-bold text-white">{progress}%</span>
        </div>
        
        <div className="h-3 w-full bg-background rounded-full overflow-hidden relative z-10 border border-border/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-growbroo-600 to-growbroo-400 relative"
          >
            {/* Shimmer effect */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
