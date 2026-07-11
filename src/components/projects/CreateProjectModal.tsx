import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function CreateProjectModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const businessName = formData.get("businessName") as string;
    const clientName = formData.get("clientName") as string;
    const requirements = formData.get("requirements") as string;
    
    // Auto-generate ticket number BT-26-XXXX
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticket_number = `BT-26-${randomNum}`;

    const { error } = await supabase.from("projects").insert({
      ticket_number,
      business_name: businessName,
      client_name: clientName,
      requirements,
      stage_1_status: "Discussion Completed"
    });

    if (error) {
      console.error(error);
      alert(`Failed to create project: ${error.message || JSON.stringify(error)}`);
    } else {
      onSuccess();
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Start New Project</h2>
        <p className="text-sm text-gray-400 mb-6">Create Stage 1: Initial Discussion</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Business Name</label>
            <Input name="businessName" required placeholder="e.g. Acme Corp" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Client Contact Name</label>
            <Input name="clientName" required placeholder="e.g. Jane Doe" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Requirements & Scope</label>
            <textarea 
              name="requirements" 
              required 
              rows={4}
              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluetick-500 mt-1"
              placeholder="Detailed requirements..."
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="premium" disabled={loading}>
              {loading ? "Creating..." : "Submit to Admin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
