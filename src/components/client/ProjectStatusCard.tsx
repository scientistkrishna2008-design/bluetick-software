import { Card, CardContent } from "../ui/Card";

interface ProjectStatusCardProps {
  projectName: string;
  projectType: string;
  plan: string;
  currentStage: string;
  estimatedCompletion: string;
  progress: number;
}

export function ProjectStatusCard({
  projectName,
  projectType,
  plan,
  currentStage,
  estimatedCompletion,
  progress,
}: ProjectStatusCardProps) {
  return (
    <Card className="bg-surface/50 border-border overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-growbroo-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-growbroo-500/10 transition-colors" />
      <CardContent className="p-6 relative z-10">
        <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
          Project Status
          <span className="text-xs font-bold bg-growbroo-500/10 text-growbroo-500 px-3 py-1 rounded-full border border-growbroo-500/20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-growbroo-500 animate-pulse" />
            {currentStage}
          </span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <span className="text-sm text-gray-400">Project Name</span>
            <span className="font-medium text-white text-right">{projectName}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <span className="text-sm text-gray-400">Type</span>
            <span className="font-medium text-white">{projectType}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <span className="text-sm text-gray-400">Selected Plan</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-growbroo-400 to-green-600">
              {plan}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-gray-400">Est. Completion</span>
            <span className="font-medium text-white">{estimatedCompletion}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
