import { CheckCircle2, Circle, Clock } from "lucide-react";

interface TimelineProps {
  currentStage: number;
}

const STAGES = [
  "Discussion",
  "Sample Website",
  "Corrections",
  "Final Approval",
  "Payment",
  "Domain & Hosting",
  "Website Live",
  "Project Completed"
];

export function ProjectTimeline({ currentStage }: TimelineProps) {
  return (
    <div className="w-full py-8 px-4 overflow-x-auto">
      <div className="min-w-[800px] flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border z-0" />
        
        {/* Progress Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-bluetick-500 z-0 transition-all duration-500"
          style={{ width: `${(Math.max(0, currentStage - 1) / (STAGES.length - 1)) * 100}%` }}
        />

        {STAGES.map((stage, index) => {
          const stageNum = index + 1;
          const isCompleted = stageNum < currentStage;
          const isActive = stageNum === currentStage;

          return (
            <div key={stage} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted 
                    ? "bg-bluetick-500 text-white" 
                    : isActive 
                      ? "bg-surface border-2 border-bluetick-500 text-bluetick-500" 
                      : "bg-surface border border-border text-gray-500"
                }`}
              >
                {isCompleted ? <CheckCircle2 size={16} /> : isActive ? <Clock size={16} /> : <Circle size={12} />}
              </div>
              <span className={`text-xs whitespace-nowrap font-medium ${
                isActive ? "text-bluetick-500" : isCompleted ? "text-white" : "text-gray-500"
              }`}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
