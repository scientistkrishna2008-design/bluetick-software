import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router";
import { CreateProjectModal } from "../../components/projects/CreateProjectModal";

export function GrowthPartnerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;
    
    // Fetch all projects assigned to this growth partner
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("growth_partner_id", user.uid)
      .order("created_at", { ascending: false });
      
    if (data) setProjects(data);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Growth Partner Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="premium" onClick={() => setIsCreateModalOpen(true)}>+ Start New Project</Button>
            <Button variant="outline" onClick={logout}>Sign Out</Button>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6">Your Projects</h2>
        
        {projects.length === 0 ? (
          <p className="text-gray-400 p-8 border border-dashed border-border rounded-lg text-center">
            You haven't started any projects yet. Click "+ Start New Project" to begin!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card 
                key={project.id} 
                className="cursor-pointer hover:border-bluetick-500 transition-colors"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <CardHeader className="bg-surface-hover/30 border-b border-border pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-bluetick-500">{project.business_name}</CardTitle>
                      <p className="text-xs font-mono text-gray-500 mt-1">{project.ticket_number}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-bold">
                      S{project.current_stage}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Client:</span>
                    <span>{project.client_name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-right text-xs">
                      {project.current_stage === 1 ? project.stage_1_status : 
                       project.current_stage === 2 ? 'Building Sample' : 
                       project.current_stage === 3 ? 'Corrections Phase' : 
                       project.current_stage === 4 ? 'Awaiting Final Approval' : 'Completed'}
                    </span>
                  </div>
                  
                  {project.live_link && (
                    <div className="pt-3 border-t border-border mt-3 text-center">
                      <span className="text-xs text-green-500">Live Link Available</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onSuccess={fetchProjects} 
        />
      )}
    </div>
  );
}
