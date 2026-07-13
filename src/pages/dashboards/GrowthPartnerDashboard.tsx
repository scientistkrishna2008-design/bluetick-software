import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router";
import { CreateProjectModal } from "../../components/projects/CreateProjectModal";
import { Input } from "../../components/ui/Input";
import { PricingCards } from "../../components/pricing/PricingCards";

export function GrowthPartnerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [gpayInput, setGpayInput] = useState("");

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

  const saveGPay = async () => {
    if (!gpayInput) return;
    await supabase.from("users").update({ gpay_number: gpayInput }).eq("id", user?.uid);
    window.location.reload();
  };

  if (user && !user.gpay_number) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
        <Card className="w-full max-w-md border-growbroo-500/50">
          <CardHeader>
            <CardTitle className="text-xl text-growbroo-500">Action Required: Payout Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-6 text-sm">You must enter your GPay or UPI transaction number before accessing your dashboard so we can pay you for your work.</p>
            <Input 
              placeholder="Enter GPay / UPI Number" 
              value={gpayInput}
              onChange={(e) => setGpayInput(e.target.value)}
              className="mb-4"
            />
            <Button variant="premium" className="w-full" onClick={saveGPay}>Save Payment Details</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredProjects = projects.filter(p => 
    p.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ticket_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeProjects = filteredProjects.filter(p => p.current_stage < 9);
  const completedProjects = filteredProjects.filter(p => p.current_stage >= 9);

  const ProjectCard = ({ project }: { project: any }) => (
    <Card 
      className="cursor-pointer hover:border-growbroo-500 transition-colors"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <CardHeader className="bg-surface-hover/30 border-b border-border pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-growbroo-500">{project.business_name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs font-mono text-gray-500">{project.ticket_number}</p>
              {project.plan_type && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  project.plan_type === 'Plan 2' ? 'bg-growbroo-500/20 text-growbroo-500' : 'bg-gray-800 text-gray-400'
                }`}>
                  {project.plan_type}
                </span>
              )}
            </div>
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
             project.current_stage === 4 ? 'Awaiting Final Approval' : 
             project.current_stage === 5 ? 'Payment' : 
             project.current_stage === 6 ? 'Domain & Hosting' : 
             project.current_stage === 7 ? 'Website Live' : 
             project.current_stage === 8 ? 'Completed' : 'Maintenance'}
          </span>
        </div>
        
        {/* Payroll Notification Bar */}
        <div className="pt-3 border-t border-border mt-3 text-center">
          {project.growth_partner_paid ? (
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/30">
              Payment done successfully 🎉
            </span>
          ) : project.current_stage >= 5 ? (
            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/30">
              Payment is being processed
            </span>
          ) : (
            <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/30">
              Payout pending Stage 5
            </span>
          )}
        </div>
        
        {project.final_domain && (
          <div className="pt-3 border-t border-border mt-3 text-center">
            <span className="text-xs text-green-500 font-bold">{project.final_domain}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Growth Partner Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="text-growbroo-500 border-growbroo-500/50 hover:bg-growbroo-500/10" asChild>
              <a href="tel:7010904686">Get Support</a>
            </Button>
            <Button variant="premium" onClick={() => setIsCreateModalOpen(true)}>+ Start New Project</Button>
            <Button variant="outline" onClick={logout}>Sign Out</Button>
          </div>
        </div>

        {/* Pricing Cards Reference at the Top */}
        <div className="mb-12 border-b border-border pb-8">
          <PricingCards />
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <input 
            type="text" 
            placeholder="Search projects by Business, Client, or ID..." 
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-growbroo-500 transition-shadow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-12">
          {/* Active Projects */}
          <div>
            <h2 className="text-xl font-bold mb-6 border-b border-border pb-2 text-growbroo-500">Active Projects</h2>
            {activeProjects.length === 0 ? (
              <p className="text-gray-400 p-8 border border-dashed border-border rounded-lg text-center">
                {searchQuery ? "No active projects match your search." : "You haven't started any projects yet. Click \"+ Start New Project\" to begin!"}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>

          {/* Completed / Archived Projects */}
          {completedProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6 border-b border-border pb-2 text-green-500">Completed & Archived</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75 hover:opacity-100 transition-opacity">
                {completedProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
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
