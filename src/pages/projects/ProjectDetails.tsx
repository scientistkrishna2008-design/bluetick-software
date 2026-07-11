import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { ProjectTimeline } from "../../components/projects/ProjectTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [corrections, setCorrections] = useState<any[]>([]);
  const [engineers, setEngineers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Stage 2 inputs
  const [liveLinkInput, setLiveLinkInput] = useState("");

  useEffect(() => {
    fetchProject();
    if (user?.role === 'Administrator') {
      fetchEngineers();
    }
  }, [id, user]);

  const fetchProject = async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setProject(data);
      if (data.current_stage >= 3) {
        fetchCorrections();
      }
    }
    setLoading(false);
  };

  const fetchEngineers = async () => {
    const { data } = await supabase.from("users").select("*").eq("role", "Web Engineer");
    if (data) setEngineers(data);
  };

  const fetchCorrections = async () => {
    const { data } = await supabase
      .from("project_corrections")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });
    if (data) setCorrections(data);
  };

  const updateStage1Status = async (status: string) => {
    if (!project) return;
    const newStage = status === "Admin Approved" ? 2 : 1;
    const { data } = await supabase.from("projects").update({ stage_1_status: status, current_stage: newStage }).eq("id", project.id).select().single();
    if (data) {
      setProject(data);
      if (data.current_stage >= 3) fetchCorrections();
    }
  };

  const assignEngineer = async (engineerId: string) => {
    if (!project) return;
    const { data } = await supabase.from("projects").update({ engineer_id: engineerId }).eq("id", project.id).select().single();
    if (data) setProject(data);
  };

  // Stage 2 Actions
  const submitSampleVersion = async () => {
    if (!liveLinkInput) return alert("Please provide a Live Link");
    
    // Update live link on project
    await supabase.from("projects").update({ live_link: liveLinkInput }).eq("id", project.id);
    
    // In a real app, you'd insert into project_samples here. For prototype, we'll use a special status column if needed, 
    // or just assume if live_link is present, it's submitted. Let's just set the project state optimistically.
    const { data } = await supabase.from("projects").select().eq("id", project.id).single();
    setProject(data);
    alert("Sample Submitted to Admin!");
  };

  const advanceToStage3 = async () => {
    const { data } = await supabase.from("projects").update({ current_stage: 3 }).eq("id", project.id).select().single();
    if (data) {
      setProject(data);
      fetchCorrections();
    }
  };

  const denySample = async () => {
    await supabase.from("projects").update({ live_link: null }).eq("id", project.id);
    const { data } = await supabase.from("projects").select().eq("id", project.id).single();
    setProject(data);
    alert("Sample Denied. Engineer must submit a new link.");
  };

  // Stage 3 Actions
  const createCorrectionTicket = async () => {
    const description = prompt("Enter correction description:");
    if (!description) return;
    
    const correctionNumber = corrections.length + 1;
    await supabase.from("project_corrections").insert({
      project_id: project.id,
      correction_number: correctionNumber,
      description
    });
    fetchCorrections();
  };

  const markTicketSolved = async (correctionId: string) => {
    await supabase.from("project_corrections").update({ status: 'Ready For Review' }).eq("id", correctionId);
    fetchCorrections();
  };

  const approveCorrection = async (correctionId: string) => {
    await supabase.from("project_corrections").update({ status: 'Approved' }).eq("id", correctionId);
    fetchCorrections();
  };

  const advanceToFinalApproval = async () => {
    const { data } = await supabase.from("projects").update({ current_stage: 4 }).eq("id", project.id).select().single();
    if (data) setProject(data);
  };

  const advanceToStage5 = async () => {
    const { data } = await supabase.from("projects").update({ current_stage: 5 }).eq("id", project.id).select().single();
    if (data) setProject(data);
  };

  if (loading) return <div className="min-h-screen pt-24 text-center">Loading...</div>;
  if (!project) return <div className="min-h-screen pt-24 text-center">Project not found</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-400 p-0 hover:bg-transparent hover:text-white">
              ← Back
            </Button>
            <h1 className="text-3xl font-bold">{project.business_name}</h1>
            <p className="text-gray-400">Ticket: <span className="text-bluetick-400 font-mono">{project.ticket_number}</span></p>
          </div>
          
          <div className="text-left md:text-right w-full md:w-auto bg-surface-hover/30 p-4 rounded-xl border border-border">
            <p className="text-sm text-gray-400 mb-2">Client: {project.client_name}</p>
            
            {user?.role === 'Administrator' ? (
              <div className="flex items-center md:justify-end gap-2 mb-3">
                <span className="text-sm text-gray-400">Engineer:</span>
                {project.current_stage === 1 && project.stage_1_status !== 'Advance Paid' && project.stage_1_status !== 'Admin Approved' ? (
                  <span className="text-sm text-yellow-500 font-medium">Advance pending...</span>
                ) : (
                  <select 
                    className="bg-surface border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-bluetick-500 text-bluetick-400"
                    value={project.engineer_id || ""}
                    onChange={(e) => assignEngineer(e.target.value)}
                  >
                    <option value="">-- Unassigned --</option>
                    {engineers.map(eng => (
                      <option key={eng.id} value={eng.id}>{eng.name}</option>
                    ))}
                  </select>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mb-3">Assigned to You</p>
            )}

            {/* Global Live Link */}
            {project.live_link ? (
              <div className="flex items-center md:justify-end gap-2">
                <span className="text-sm text-gray-400">Live URL:</span>
                <a href={project.live_link} target="_blank" rel="noreferrer" className="text-sm text-bluetick-400 hover:underline flex items-center gap-1 bg-bluetick-500/10 px-2 py-1 rounded">
                  View App ↗
                </a>
              </div>
            ) : (
              <div className="text-sm text-yellow-500/80">No Live URL Provided Yet</div>
            )}
          </div>
        </div>

        {/* 7-Stage Timeline */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <ProjectTimeline currentStage={project.current_stage} />
          </CardContent>
        </Card>

        {/* Stage 1: Initial Discussion (Project Brief) */}
        {project.current_stage >= 1 && (
          <Card className="mb-8 border-bluetick-500/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-bluetick-500">Project Brief (Stage 1)</CardTitle>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.current_stage > 1 ? 'bg-green-500/20 text-green-500' :
                project.stage_1_status === 'Admin Approved' ? 'bg-green-500/20 text-green-500' :
                project.stage_1_status === 'Advance Paid' ? 'bg-blue-500/20 text-blue-500' :
                project.stage_1_status === 'Discussion Completed' ? 'bg-blue-500/20 text-blue-500' :
                'bg-yellow-500/20 text-yellow-500'
              }`}>
                {project.current_stage > 1 ? 'Completed' : project.stage_1_status}
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.role !== 'Web Engineer' && (
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-400">Contact</p><p>{project.contact_details || "N/A"}</p></div>
                  <div><p className="text-sm text-gray-400">Budget</p><p>{project.budget || "N/A"}</p></div>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-400 mb-1">Requirements</p>
                <div className="p-4 bg-surface-hover rounded-md text-sm">{project.requirements || "No requirements provided."}</div>
              </div>

              {project.reference_images && project.reference_images.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Design References</p>
                  <div className="flex flex-wrap gap-4">
                    {project.reference_images.map((img: string, idx: number) => (
                      <a key={idx} href={img} target="_blank" rel="noreferrer" className="block group relative rounded-md overflow-hidden border border-border">
                        <img src={img} alt="Reference" className="w-24 h-24 object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-xs text-white">View</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {user?.role === 'Administrator' && project.current_stage === 1 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex gap-4">
                    {project.stage_1_status !== 'Advance Paid' && project.stage_1_status !== 'Admin Approved' ? (
                      <Button variant="premium" onClick={() => updateStage1Status('Advance Paid')}>
                        Mark Advance Paid
                      </Button>
                    ) : (
                      <Button variant="premium" onClick={() => updateStage1Status('Admin Approved')} disabled={!project.engineer_id}>
                        {project.engineer_id ? "Approve & Move to Stage 2" : "Assign an Engineer First"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stage 2: Sample Version */}
        {project.current_stage === 2 && (
          <Card className="mb-8 border-bluetick-500/50">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-bluetick-500">Stage 2: Sample Version</CardTitle>
            </CardHeader>
            <CardContent>
              {user?.role === 'Web Engineer' && !project.live_link && (
                <div className="p-6 border-2 border-dashed border-border rounded-lg bg-surface-hover/20">
                  <h3 className="text-lg font-bold mb-2">Submit Initial Build</h3>
                  <p className="text-sm text-gray-400 mb-4">You have finished the initial sample. Provide the Vercel (or live) URL below to submit it for Admin review.</p>
                  <div className="flex gap-4">
                    <Input 
                      placeholder="https://..." 
                      className="max-w-md"
                      value={liveLinkInput}
                      onChange={e => setLiveLinkInput(e.target.value)}
                    />
                    <Button variant="premium" onClick={submitSampleVersion}>Submit Sample</Button>
                  </div>
                </div>
              )}

              {user?.role === 'Web Engineer' && project.live_link && (
                <div className="p-6 text-center border border-border rounded-lg bg-green-500/10">
                  <p className="text-green-500 font-bold mb-2">Sample Submitted Successfully!</p>
                  <p className="text-sm text-gray-400">Waiting for Admin to review and accept the sample.</p>
                </div>
              )}

              {user?.role === 'Administrator' && (
                <div className="p-6 text-center border-2 border-dashed border-border rounded-lg bg-surface-hover/20">
                  {project.live_link ? (
                    <>
                      <p className="mb-4 text-green-500">Engineer has submitted the sample version!</p>
                      <div className="flex justify-center gap-4">
                        <Button variant="premium" onClick={advanceToStage3}>Accept Sample (Move to Stage 3)</Button>
                        <Button variant="destructive" onClick={denySample}>Deny & Reset Link</Button>
                      </div>
                    </>
                  ) : (
                    <p className="mb-4 text-gray-400">Waiting for the Engineer to submit the sample version link...</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stage 3: Corrections Ticket System */}
        {project.current_stage >= 3 && (
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold">Stage 3: Corrections</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Updates made by the Engineer will automatically reflect on the Live URL.
                </p>
              </div>
              {project.current_stage === 3 && user?.role === 'Administrator' && (
                <div className="flex gap-4">
                  <Button variant="outline" onClick={createCorrectionTicket}>+ Raise Ticket</Button>
                  <Button variant="premium" onClick={advanceToFinalApproval}>Corrections Complete</Button>
                </div>
              )}
            </div>

            {corrections.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-400 border-2 border-dashed border-border rounded-xl bg-surface-hover/20">
                  No corrections raised yet. Client approved sample directly, or waiting for first ticket.
                </CardContent>
              </Card>
            ) : (
              corrections.map((ticket) => (
                <Card key={ticket.id} className={ticket.status === 'Approved' ? 'border-green-500/20 bg-green-500/5' : 'border-border'}>
                  <CardHeader className="flex flex-row justify-between items-center pb-2">
                    <CardTitle className="text-lg">
                      {project.ticket_number}-C{ticket.correction_number}
                    </CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Approved' ? 'bg-green-500/20 text-green-500' :
                      ticket.status === 'Ready For Review' ? 'bg-blue-500/20 text-blue-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {ticket.status}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-bold">Requested Fix</p>
                      <p className="text-sm">{ticket.description}</p>
                    </div>

                    {/* Engineer Action */}
                    {user?.role === 'Web Engineer' && ticket.status === 'Pending' && (
                      <div className="pt-4 border-t border-border mt-4">
                        <Button onClick={() => markTicketSolved(ticket.id)} className="w-full sm:w-auto" variant="premium">
                          Mark Ticket Solved
                        </Button>
                        <p className="text-xs text-gray-400 mt-2">Click this once you've pushed the code to Vercel.</p>
                      </div>
                    )}

                    {/* Admin Action */}
                    {user?.role === 'Administrator' && ticket.status === 'Ready For Review' && (
                      <div className="flex gap-4 pt-4 border-t border-border mt-4">
                        <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white" onClick={() => approveCorrection(ticket.id)}>
                          Verify & Approve Fix
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => supabase.from("project_corrections").update({ status: 'Pending' }).eq("id", ticket.id).then(fetchCorrections)}>
                          Reject (Needs more work)
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Stage 4: Final Approval */}
        {project.current_stage >= 4 && (
          <Card className="mb-8 border-bluetick-500/50">
            <CardHeader><CardTitle className="text-bluetick-500">Stage 4: Final Approval</CardTitle></CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">All corrections complete. Waiting for final admin sign-off.</p>
              {user?.role === 'Administrator' && project.current_stage === 4 && (
                <Button variant="premium" onClick={advanceToStage5}>
                  Give Final Approval (Move to Stage 5)
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
