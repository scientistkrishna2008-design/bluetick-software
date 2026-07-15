import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useNavigate } from "react-router";
import { NotificationBell } from "../../components/notifications/NotificationBell";

export function EngineerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stage2Projects, setStage2Projects] = useState<any[]>([]);
  const [stage6Projects, setStage6Projects] = useState<any[]>([]);
  const [completedProjects, setCompletedProjects] = useState<any[]>([]);
  const [pendingAssignments, setPendingAssignments] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [gpayInput, setGpayInput] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<any>(null); // null, 'Pending', 'Verified', 'Rejected'
  const [verificationData, setVerificationData] = useState<any>(null);
  const [isCertified, setIsCertified] = useState(false);

  useEffect(() => {
    if (user) {
      fetchVerificationStatus();
      fetchAssignedWork();
      
      const key = `academy_progress_${user.uid}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isCertified) setIsCertified(true);
      }
    }
  }, [user]);

  const fetchVerificationStatus = async () => {
    if (!user) return;
    const { data } = await supabase.from("creator_verifications").select("*").eq("user_id", user.uid).single();
    if (data) {
      setVerificationStatus(data.status);
      setVerificationData(data);
    } else {
      setVerificationStatus('None');
    }
  };

  const fetchAssignedWork = async () => {
    if (!user) return;
    
    // Fetch Pending Assignments
    const { data: pendingData } = await supabase
      .from("projects")
      .select("*")
      .eq("engineer_id", user.uid)
      .eq("engineer_status", "Pending Acceptance")
      .order("created_at", { ascending: false });
    if (pendingData) setPendingAssignments(pendingData);

    // Fetch Stage 2 projects (Accepted)
    const { data: s2Data } = await supabase
      .from("projects")
      .select("*")
      .eq("engineer_id", user.uid)
      .eq("engineer_status", "Accepted")
      .eq("current_stage", 2)
      .order("created_at", { ascending: false });
    if (s2Data) setStage2Projects(s2Data);

    // Fetch Stage 6 projects (Domain linking)
    const { data: s6Data } = await supabase
      .from("projects")
      .select("*")
      .eq("engineer_id", user.uid)
      .eq("current_stage", 6)
      .order("created_at", { ascending: false });
    if (s6Data) setStage6Projects(s6Data);

    // Fetch Completed projects
    const { data: cData } = await supabase
      .from("projects")
      .select("*")
      .eq("engineer_id", user.uid)
      .gte("current_stage", 9)
      .order("created_at", { ascending: false });
    if (cData) setCompletedProjects(cData);

    // Fetch Correction Tickets
    const { data: tData } = await supabase
      .from("project_corrections")
      .select("*, project:project_id(id, ticket_number, business_name, engineer_id, current_stage)")
      .order("created_at", { ascending: false });
      
    if (tData) {
      const myTickets = tData.filter((t: any) => 
        t.project.engineer_id === user.uid && t.status !== "Approved" && t.status !== "Awaiting Admin Approval"
      );
      setTickets(myTickets);
    }
  };

  const handleAcceptProject = async (projectId: string) => {
    await supabase.from("projects").update({ engineer_status: "Accepted" }).eq("id", projectId);
    fetchAssignedWork();
  };

  const handleDenyProject = async (project: any) => {
    // Unassign and notify admin
    await supabase.from("projects").update({ 
      engineer_status: "Denied",
      engineer_id: null 
    }).eq("id", project.id);

    await supabase.from("notifications").insert({
      user_id: project.admin_id, // Assuming admin_id exists, otherwise we should fetch admins
      title: "Project Assignment Denied",
      message: `Engineer ${user?.name || user?.email} has denied the project ${project.business_name} (${project.ticket_number}). Please reassign.`,
      type: "assignment"
    });

    fetchAssignedWork();
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
              onChange={(e: any) => setGpayInput(e.target.value)}
              className="mb-4"
            />
            <Button variant="premium" className="w-full" onClick={saveGPay}>Save Payment Details</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">Engineer Dashboard</h1>
              {verificationStatus === 'Verified' && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-sm font-bold shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Verified Creator
                </div>
              )}
            </div>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
            {verificationStatus === 'Verified' && verificationData && (
              <div className="flex gap-4 mt-3 text-xs text-gray-500 font-mono">
                <p>ID: {verificationData.id.split('-')[0].toUpperCase()}</p>
                <p>Verified: {new Date(verificationData.created_at).toLocaleDateString()}</p>
                {verificationData.portfolio_score && (
                  <p className="text-green-500">Score: {verificationData.portfolio_score}/10</p>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="text-growbroo-500 border-growbroo-500/50 hover:bg-growbroo-500/10" asChild>
              <a href="tel:7010904686">Get Support</a>
            </Button>
            <NotificationBell />
            <Button variant="outline" onClick={logout}>Sign Out</Button>
          </div>
        </div>

        {verificationStatus !== 'Verified' && verificationStatus !== null && (
          <div className="mb-8 p-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Creator Verification Required</h3>
              <p className="text-sm text-gray-400">Your account is not verified yet. Complete Creator Verification to start receiving GrowBro projects.</p>
            </div>
            <Button 
              className="bg-green-500 hover:bg-green-600 text-black font-bold whitespace-nowrap"
              onClick={() => navigate('/creator-verification')}
            >
              Complete Verification
            </Button>
          </div>
        )}

        {verificationStatus === 'Verified' && !isCertified && (
          <div className="mb-8 p-6 rounded-xl border border-blue-500/30 bg-blue-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Engineer Academy Certification Required</h3>
              <p className="text-sm text-gray-400">You must pass the GrowBro Web Engineer Academy to unlock live client projects.</p>
            </div>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold whitespace-nowrap"
              onClick={() => navigate('/engineer-academy')}
            >
              Go To Academy
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Action Required */}
          <div>
            {verificationStatus === 'Verified' && isCertified ? (
              pendingAssignments.length > 0 && (
                <>
                  <h2 className="text-xl font-bold mb-6 text-purple-500 border-b border-border pb-2">
                    New Assignments
                  </h2>
                  <div className="space-y-4 mb-8">
                    {pendingAssignments.map(project => (
                    <Card key={project.id} className="border-purple-500/50">
                      <CardHeader className="bg-purple-500/5 pb-3">
                        <CardTitle className="flex justify-between items-center text-lg">
                          {project.ticket_number}
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-500">
                            Pending Acceptance
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm font-medium mb-1">{project.business_name}</p>
                        <p className="text-xs text-gray-400 mb-4 line-clamp-2">{project.requirements}</p>
                        <div className="flex gap-3">
                          <Button 
                            className="flex-1 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-white"
                            onClick={() => handleAcceptProject(project.id)}
                          >
                            Accept
                          </Button>
                          <Button 
                            className="flex-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white"
                            onClick={() => handleDenyProject(project)}
                          >
                            Deny
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
              )
            ) : null}

            <h2 className="text-xl font-bold mb-6 text-growbroo-400 border-b border-border pb-2">
              Action Required (Stage 2)
            </h2>
            {stage2Projects.length === 0 ? (
              <p className="text-gray-400 p-4 border border-dashed border-border rounded-lg text-center">
                No initial builds required.
              </p>
            ) : (
              <div className="space-y-4 mb-8">
                {stage2Projects.map(project => (
                  <Card 
                    key={project.id} 
                    className="border-growbroo-500 hover:border-growbroo-400 cursor-pointer transition-colors"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <CardHeader className="bg-growbroo-500/5">
                      <CardTitle className="flex justify-between items-center text-lg">
                        {project.ticket_number}
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                          Build Required
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium">{project.business_name}</p>
                        {project.plan_type && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                            project.plan_type === 'Plan 2' ? 'bg-growbroo-500/20 text-growbroo-500' : 'bg-gray-800 text-gray-400'
                          }`}>
                            {project.plan_type}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Click to view project details and submit live link.</p>
                      
                      <div className="pt-3 border-t border-border mt-3 text-center">
                        <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/30">
                          Payout pending Stage 5
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Stage 6: Domain Linking */}
            {stage6Projects.length > 0 && (
              <>
                <h2 className="text-xl font-bold mb-6 mt-8 text-green-500 border-b border-border pb-2">
                  Action Required (Stage 6)
                </h2>
                <div className="space-y-4 mb-8">
                  {stage6Projects.map(project => (
                    <Card 
                      key={project.id} 
                      className="border-green-500 hover:border-green-400 cursor-pointer transition-colors"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <CardHeader className="bg-green-500/5">
                        <CardTitle className="flex justify-between items-center text-lg">
                          {project.ticket_number}
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                            Domain Setup
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium">{project.business_name}</p>
                          {project.plan_type && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                              project.plan_type === 'Plan 2' ? 'bg-growbroo-500/20 text-growbroo-500' : 'bg-gray-800 text-gray-400'
                            }`}>
                              {project.plan_type}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">Click to connect the final custom domain.</p>

                        <div className="pt-3 border-t border-border mt-3 text-center">
                          {project.engineer_paid ? (
                            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/30">
                              Payment done successfully 🎉
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/30">
                              Payment is being processed
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Active Corrections */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-yellow-500 border-b border-border pb-2">
              Active Corrections (Stage 3)
            </h2>
            {tickets.length === 0 ? (
              <p className="text-gray-400 p-4 border border-dashed border-border rounded-lg text-center">
                No active tickets. You're all caught up!
              </p>
            ) : (
              <div className="space-y-4 mb-8">
                {tickets.map(ticket => (
                  <Card 
                    key={ticket.id} 
                    className="border-yellow-500/50 hover:border-yellow-400 cursor-pointer transition-colors"
                    onClick={() => navigate(`/project/${ticket.project.id}`)}
                  >
                    <CardHeader className="bg-yellow-500/5">
                      <CardTitle className="flex justify-between items-center text-lg">
                        {ticket.project.ticket_number}-C{ticket.correction_number}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'Ready For Review' ? 'bg-blue-500/20 text-blue-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {ticket.status}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm font-medium mb-1">{ticket.project.business_name}</p>
                      <p className="text-sm text-gray-300 line-clamp-2">{ticket.description}</p>
                      <p className="text-xs text-gray-400 mt-2">Click to view project and mark solved.</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Completed Projects */}
            {completedProjects.length > 0 && (
              <>
                <h2 className="text-xl font-bold mb-6 mt-8 text-gray-400 border-b border-border pb-2">
                  Completed & Handed Off
                </h2>
                <div className="space-y-4">
                  {completedProjects.map(project => (
                    <Card 
                      key={project.id} 
                      className="opacity-75 hover:opacity-100 cursor-pointer transition-opacity"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <CardHeader className="bg-surface-hover/30">
                        <CardTitle className="flex justify-between items-center text-lg text-gray-400">
                          {project.ticket_number}
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                            Client Happy 🎉
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium text-gray-400">{project.business_name}</p>
                          {project.plan_type && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                              project.plan_type === 'Plan 2' ? 'bg-growbroo-500/20 text-growbroo-500' : 'bg-gray-800 text-gray-500'
                            }`}>
                              {project.plan_type}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-green-500 font-bold mb-3">{project.final_domain}</p>

                        <div className="pt-3 border-t border-border mt-3 text-center">
                          {project.engineer_paid ? (
                            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/30">
                              Payment done successfully 🎉
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/30">
                              Payment is being processed
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
