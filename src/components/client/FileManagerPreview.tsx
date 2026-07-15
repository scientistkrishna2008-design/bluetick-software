import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

interface FileAsset {
  name: string;
  type: 'image' | 'document' | 'video' | 'archive';
  size: string;
  date: string;
}

export function FileManagerPreview({ files }: { files: FileAsset[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'document': return '📄';
      case 'video': return '🎥';
      case 'archive': return '📦';
      default: return '📁';
    }
  };

  return (
    <Card className="bg-surface/50 border-border h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Recent Files</CardTitle>
        <Button variant="ghost" className="text-xs text-growbroo-500 hover:text-growbroo-400 p-0 h-auto">View All</Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 mb-6 flex-1">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-surface/30 border border-border/50 hover:bg-surface-hover transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity">{getIcon(file.type)}</span>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-growbroo-500 transition-colors line-clamp-1">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                </div>
              </div>
              <Button variant="ghost" className="text-gray-400 hover:text-white p-2 h-auto rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </Button>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-growbroo-500">
          + Upload New File
        </Button>
      </CardContent>
    </Card>
  );
}
