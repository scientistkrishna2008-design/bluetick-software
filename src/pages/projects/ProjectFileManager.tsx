import { useState } from "react";
import { FileManagerLayout } from "../../components/files/FileManagerLayout";
import { FileManagerHeader } from "../../components/files/FileManagerHeader";
import { FolderGrid } from "../../components/files/FolderGrid";
import { FileTable } from "../../components/files/FileTable";
import type { FileItem } from "../../components/files/FileTable";
import { FilePreviewPanel } from "../../components/files/FilePreviewPanel";
import { DragDropZone } from "../../components/files/DragDropZone";

export function ProjectFileManager() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  // MOCK DATA
  const headerData = {
    projectName: "Acme Corporate Website",
    clientName: "Sarah M. (Acme Corp)",
    storageUsed: "1.2 GB of 15 GB",
    totalFiles: 142,
    lastUpdated: "2 mins ago"
  };

  const mockFolders = [
    { id: "logos", name: "Logos", fileCount: 4, lastUpdated: "Oct 12" },
    { id: "content", name: "Client Content", fileCount: 23, lastUpdated: "Oct 14" },
    { id: "images", name: "Product Images", fileCount: 89, lastUpdated: "Yesterday" },
    { id: "videos", name: "Videos", fileCount: 3, lastUpdated: "Last week" },
    { id: "docs", name: "Documents", fileCount: 12, lastUpdated: "2 days ago" },
    { id: "contracts", name: "Contracts", fileCount: 2, lastUpdated: "Oct 1" },
    { id: "invoices", name: "Invoices", fileCount: 1, lastUpdated: "Oct 10" },
    { id: "dev", name: "Development", fileCount: 8, lastUpdated: "Today" },
    { id: "final", name: "Final Delivery", fileCount: 0, lastUpdated: "Pending" },
  ];

  const mockFiles: FileItem[] = [
    { id: "f1", name: "Acme_Logo_Final.png", category: "Logos", uploader: "Sarah M.", date: "Today, 10:30 AM", version: "v3", size: "2.4 MB", starred: true, type: "image" },
    { id: "f2", name: "Website_Copy_v2.docx", category: "Client Content", uploader: "Sarah M.", date: "Yesterday", version: "v2", size: "1.1 MB", starred: false, type: "document" },
    { id: "f3", name: "Brand_Guidelines.pdf", category: "Documents", uploader: "David Chen", date: "3 days ago", version: "v1", size: "4.5 MB", starred: true, type: "document" },
    { id: "f4", name: "Homepage_Hero_Video.mp4", category: "Videos", uploader: "Elena R.", date: "Last week", version: "v1", size: "124 MB", starred: false, type: "video" },
    { id: "f5", name: "Invoice_001_Oct.pdf", category: "Invoices", uploader: "Admin", date: "Oct 10, 2026", version: "v1", size: "320 KB", starred: true, type: "document" },
    { id: "f6", name: "Custom_Cursor_Script.js", category: "Development", uploader: "Elena R.", date: "Today, 1:15 PM", version: "v4", size: "12 KB", starred: false, type: "code" },
    { id: "f7", name: "Client_Assets.zip", category: "Client Content", uploader: "Sarah M.", date: "Oct 14, 2026", version: "v1", size: "84 MB", starred: false, type: "archive" },
  ];

  return (
    <FileManagerLayout>
      <DragDropZone>
        <div className="flex-1 flex flex-col h-full relative z-10">
          <FileManagerHeader {...headerData} />
          
          <FolderGrid folders={mockFolders} />
          
          <h2 className="text-sm uppercase tracking-wider font-bold text-gray-500 mb-4 px-1">Recent Files</h2>
          <FileTable files={mockFiles} onFileClick={setSelectedFile} />
        </div>
      </DragDropZone>

      <FilePreviewPanel 
        file={selectedFile} 
        onClose={() => setSelectedFile(null)} 
      />
    </FileManagerLayout>
  );
}
