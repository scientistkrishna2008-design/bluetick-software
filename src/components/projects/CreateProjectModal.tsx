import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function CreateProjectModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];
    
    const imageUrls: string[] = [];
    
    for (const file of selectedFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('project_images')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error("Upload error:", uploadError);
        continue;
      }
      
      const { data } = supabase.storage.from('project_images').getPublicUrl(filePath);
      imageUrls.push(data.publicUrl);
    }
    
    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const businessName = formData.get("businessName") as string;
    const clientName = formData.get("clientName") as string;
    const requirements = formData.get("requirements") as string;
    
    // Auto-generate Project ID PROJ-26-XXXX
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticket_number = `PROJ-26-${randomNum}`;
    
    // Get current user to assign growth_partner_id
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    // Upload images if any
    const reference_images = await uploadImages();

    const { error } = await supabase.from("projects").insert({
      ticket_number,
      business_name: businessName,
      client_name: clientName,
      requirements,
      reference_images,
      stage_1_status: "Discussion Completed",
      growth_partner_id: userId
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
      <div className="bg-surface border border-border rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
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
              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-growbro-500 mt-1"
              placeholder="Detailed requirements..."
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-400 block mb-2">Design References (Images)</label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-surface-hover/50 transition-colors">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-growbro-500/20 file:text-growbro-500 hover:file:bg-growbro-500/30 cursor-pointer"
              />
            </div>
            {selectedFiles.length > 0 && (
              <p className="text-xs text-growbro-400 mt-2">{selectedFiles.length} file(s) selected.</p>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="premium" disabled={loading}>
              {loading ? "Creating & Uploading..." : "Submit to Admin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
