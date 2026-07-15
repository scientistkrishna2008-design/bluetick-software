import { useState } from "react";

export interface FileItem {
  id: string;
  name: string;
  category: string;
  uploader: string;
  date: string;
  version: string;
  size: string;
  starred: boolean;
  type: 'image' | 'document' | 'video' | 'archive' | 'code';
}

interface FileTableProps {
  files: FileItem[];
  onFileClick: (file: FileItem) => void;
}

export function FileTable({ files, onFileClick }: FileTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'document': return '📄';
      case 'video': return '🎥';
      case 'archive': return '📦';
      case 'code': return '💻';
      default: return '📁';
    }
  };

  return (
    <div className="bg-surface/30 border border-border/50 rounded-2xl overflow-hidden flex-1">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-surface/50 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4 font-medium w-8"></th>
              <th className="px-6 py-4 font-medium">File Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Version</th>
              <th className="px-6 py-4 font-medium">Size</th>
              <th className="px-6 py-4 font-medium">Uploaded By</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {files.map((file) => (
              <tr 
                key={file.id} 
                className="hover:bg-surface-hover/80 transition-colors cursor-pointer group"
                onClick={() => onFileClick(file)}
                onMouseEnter={() => setHoveredRow(file.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-6 py-4">
                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className={`transition-colors ${file.starred ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400 opacity-0 group-hover:opacity-100'}`}
                  >
                    ★
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getIcon(file.type)}</span>
                    <span className="font-medium text-white group-hover:text-growbroo-500 transition-colors truncate max-w-[250px]">
                      {file.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-surface px-2 py-1 rounded border border-border/50 text-gray-300">
                    {file.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
                    {file.version}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{file.size}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-growbroo-500/20 text-growbroo-500 flex items-center justify-center text-[10px] font-bold">
                      {file.uploader.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-300">{file.uploader}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{file.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className={`flex items-center justify-end gap-2 transition-opacity ${hoveredRow === file.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-white hover:bg-surface rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    </button>
                    <button onClick={(e) => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-white hover:bg-surface rounded">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l3 1.989c.3.197.68.204.982.02a3 3 0 10-.982-5.388m0 5.388l-3-1.99a3 3 0 010-5.368m0 5.368l3 1.989c.3.197.68.204.982.02a3 3 0 10-.982-5.388"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
