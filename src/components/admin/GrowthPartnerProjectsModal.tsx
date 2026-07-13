import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

interface GrowthPartnerProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: any;
}

export function GrowthPartnerProjectsModal({ isOpen, onClose, partner }: GrowthPartnerProjectsModalProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && partner) {
      fetchProjects();
    }
  }, [isOpen, partner]);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('growth_partner_id', partner.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  if (!isOpen || !partner) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col bg-background/95 border-border">
        <CardHeader className="flex flex-row justify-between items-center border-b border-border pb-4">
          <div>
            <CardTitle className="text-xl">Projects for {partner.name}</CardTitle>
            <p className="text-sm text-gray-400 mt-1">{partner.email} • {partner.phone || "No Phone"}</p>
          </div>
          <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0 rounded-full">✕</Button>
        </CardHeader>
        <CardContent className="overflow-y-auto p-0 flex-grow">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No projects assigned to this Growth Partner yet.</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-surface-hover/50 border-b border-border sticky top-0">
                <tr>
                  <th className="px-6 py-4">Project ID</th>
                  <th className="px-6 py-4">Client Business</th>
                  <th className="px-6 py-4">Current Stage</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} className="border-b border-border hover:bg-surface-hover/30">
                    <td className="px-6 py-4 font-mono text-growbroo-400">{p.ticket_number}</td>
                    <td className="px-6 py-4 font-medium">{p.business_name}</td>
                    <td className="px-6 py-4">Stage {p.current_stage}</td>
                    <td className="px-6 py-4">
                      {p.current_stage >= 6 ? (
                        <span className="text-green-500 font-bold">Completed</span>
                      ) : (
                        <span className="text-yellow-500">In Progress</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
