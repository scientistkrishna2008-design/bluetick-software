import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "../../lib/supabase";
import { CreateProjectModal } from "../../components/projects/CreateProjectModal";
import { useNavigate } from "react-router";

const mockData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 8000 },
];

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showCreateProject, setShowCreateProject] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch users for mapping
    const { data: usersData } = await supabase.from('users').select('*');
    if (usersData) {
      setUsers(usersData);
      setPendingUsers(usersData.filter(u => u.status === 'Pending'));
    }

    // Fetch projects safely without joins
    const { data: projectsData, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching projects:", error);
    }
    if (projectsData) setProjects(projectsData);
  };

  const markPaid = async (projectId: string, role: 'engineer' | 'growth_partner') => {
    const updatePayload = role === 'engineer' ? { engineer_paid: true } : { growth_partner_paid: true };
    const { error } = await supabase.from('projects').update(updatePayload).eq('id', projectId);
    if (!error) fetchData();
  };

  const approveUser = async (id: string) => {
    const { error } = await supabase.from('users').update({ status: 'Approved' }).eq('id', id);
    if (!error) setPendingUsers(pendingUsers.filter(u => u.id !== id));
  };

  const rejectUser = async (id: string) => {
    const { error } = await supabase.from('users').update({ status: 'Rejected' }).eq('id', id);
    if (!error) setPendingUsers(pendingUsers.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>
          <Button variant="outline" onClick={logout}>Sign Out</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Revenue", value: "$45,231.89", change: "+20.1%" },
            { title: "Active Projects", value: projects.length.toString(), change: "Tracking all stages" },
            { title: "Pending Applications", value: pendingUsers.length.toString(), change: "Needs review" },
            { title: "Growth Partners", value: "24", change: "+12%" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-growbroo-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Project Lifecycle Tracker</h2>
            <Button variant="premium" onClick={() => setShowCreateProject(true)}>+ Start Project</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase bg-surface-hover/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4">Project ID</th>
                      <th className="px-6 py-4">Business</th>
                      <th className="px-6 py-4">Stage</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Engineer</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(p => (
                      <tr key={p.id} className="border-b border-border hover:bg-surface-hover/30">
                        <td className="px-6 py-4">
                          <span className="font-mono text-growbroo-400 block">{p.ticket_number}</span>
                          {p.plan_type && (
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              p.plan_type === 'Plan 2' ? 'bg-growbroo-500/20 text-growbroo-500' : 'bg-gray-800 text-gray-400'
                            }`}>
                              {p.plan_type}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-medium">{p.business_name}</td>
                        <td className="px-6 py-4">Stage {p.current_stage}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-surface border border-border rounded text-xs">{p.stage_1_status}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{users.find(u => u.id === p.engineer_id)?.name || "Unassigned"}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/project/${p.id}`)}>View Master</Button>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-400">No active projects. Start one above!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Management Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Payroll & Payouts</h2>
            <p className="text-sm text-gray-400">Manage team payouts for projects reaching Stage 5 (Payment)</p>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase bg-surface-hover/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4">Project ID & Client</th>
                      <th className="px-6 py-4">Stage</th>
                      <th className="px-6 py-4">Growth Partner Payout</th>
                      <th className="px-6 py-4">Engineer Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.filter(p => p.current_stage >= 5).map(p => (
                      <tr key={p.id} className="border-b border-border hover:bg-surface-hover/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-growbroo-400">{p.ticket_number}</span>
                            {p.plan_type && (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                p.plan_type === 'Plan 2' ? 'bg-growbroo-500/20 text-growbroo-500' : 'bg-gray-800 text-gray-400'
                              }`}>
                                {p.plan_type}
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-xs text-gray-400 mt-1">{p.business_name}</p>
                        </td>
                        <td className="px-6 py-4">Stage {p.current_stage}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <span className="text-gray-300 w-32 truncate block">{users.find(u => u.id === p.growth_partner_id)?.name || "N/A"}</span>
                              <span className="text-xs text-growbroo-500 font-mono">{users.find(u => u.id === p.growth_partner_id)?.gpay_number || "No GPay"}</span>
                            </div>
                            {p.growth_partner_paid ? (
                              <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs font-bold">Paid</span>
                            ) : (
                              <Button size="sm" variant="premium" className="bg-yellow-600 hover:bg-yellow-500 text-white" onClick={() => markPaid(p.id, 'growth_partner')}>
                                Mark Paid
                              </Button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <span className="text-gray-300 w-32 truncate block">{users.find(u => u.id === p.engineer_id)?.name || "N/A"}</span>
                              <span className="text-xs text-growbroo-500 font-mono">{users.find(u => u.id === p.engineer_id)?.gpay_number || "No GPay"}</span>
                            </div>
                            {p.engineer_paid ? (
                              <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs font-bold">Paid</span>
                            ) : (
                              <Button size="sm" variant="premium" className="bg-yellow-600 hover:bg-yellow-500 text-white" onClick={() => markPaid(p.id, 'engineer')}>
                                Mark Paid
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.filter(p => p.current_stage >= 5).length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">No projects have reached Stage 5 for payouts yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts & Pending Users */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Revenue Overview</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis dataKey="name" stroke="#a3a3a3" />
                    <YAxis stroke="#a3a3a3" />
                    <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626' }} itemStyle={{ color: '#0ea5e9' }} />
                    <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent Applications</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingUsers.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No pending applications</p>
                ) : (
                  pendingUsers.map((app) => (
                    <div key={app.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-sm">{app.name}</p>
                        <p className="text-xs text-gray-400">{app.role}</p>
                        <p className="text-xs text-gray-500">{app.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => approveUser(app.id)} size="sm" variant="outline" className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-500/10">✓</Button>
                        <Button onClick={() => rejectUser(app.id)} size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10">✕</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showCreateProject && (
        <CreateProjectModal onClose={() => setShowCreateProject(false)} onSuccess={fetchData} />
      )}
    </div>
  );
}
