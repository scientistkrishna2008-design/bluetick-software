import { Button } from "../ui/Button";

interface FileManagerHeaderProps {
  projectName: string;
  clientName: string;
  storageUsed: string;
  totalFiles: number;
  lastUpdated: string;
}

export function FileManagerHeader({
  projectName,
  clientName,
  storageUsed,
  totalFiles,
  lastUpdated
}: FileManagerHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">{projectName}</h1>
            <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.01 1.763l-9.308 5.378 3.123 5.41h12.37l3.123-5.41zM23.116 13.8l-3.117-5.4h-6.223l6.237 10.8zM12.01 19.167L8.89 13.766H2.664l6.236 10.8z"/>
              </svg>
              Drive Sync
            </span>
          </div>
          <p className="text-gray-400">
            {clientName} <span className="mx-2 text-gray-600">•</span> {totalFiles} Files <span className="mx-2 text-gray-600">•</span> {storageUsed} Used <span className="mx-2 text-gray-600">•</span> Last Updated: {lastUpdated}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <div className="relative group flex-1 lg:flex-none">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-growbroo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Search files..." 
              className="w-full lg:w-64 bg-surface/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-growbroo-500 transition-shadow"
            />
          </div>
          
          <Button variant="outline" className="border-border text-gray-300 hover:text-white shrink-0 hidden sm:flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
            New Folder
          </Button>
          
          <Button variant="premium" className="shrink-0 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Upload Files
          </Button>
        </div>
      </div>
    </div>
  );
}
