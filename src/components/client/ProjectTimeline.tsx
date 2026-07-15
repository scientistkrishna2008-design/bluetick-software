import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/Card";

interface TimelineStage {
  id: number;
  label: string;
  status: 'completed' | 'current' | 'pending';
}

interface ProjectTimelineProps {
  stages: TimelineStage[];
}

export function ProjectTimeline({ stages }: ProjectTimelineProps) {
  return (
    <Card className="bg-surface/50 border-border h-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6">Project Timeline</h3>
        
        <div className="relative pl-6">
          {/* Vertical connecting line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border" />
          
          <div className="space-y-8">
            {stages.map((stage, idx) => (
              <motion.div 
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Indicator Node */}
                <div 
                  className={`absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-background z-10 transition-colors duration-500 ${
                    stage.status === 'completed' 
                      ? 'border-growbroo-500 text-growbroo-500' 
                      : stage.status === 'current'
                        ? 'border-growbroo-500 text-growbroo-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                        : 'border-border text-transparent'
                  }`}
                >
                  {stage.status === 'completed' && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  )}
                  {stage.status === 'current' && (
                    <div className="w-2 h-2 rounded-full bg-growbroo-500 animate-pulse" />
                  )}
                </div>
                
                {/* Label */}
                <div className={`ml-2 ${
                  stage.status === 'completed' 
                    ? 'text-gray-400' 
                    : stage.status === 'current'
                      ? 'text-growbroo-500 font-bold'
                      : 'text-gray-600'
                }`}>
                  {stage.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
