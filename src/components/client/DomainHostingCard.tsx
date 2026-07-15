import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

interface DomainDetails {
  domain: string;
  domainExpiry: string;
  hostingExpiry: string;
  sslStatus: 'Active' | 'Pending' | 'Expired';
  dnsStatus: 'Propagated' | 'Pending';
  lastBackup: string;
}

export function DomainHostingCard({ details }: { details: DomainDetails }) {
  return (
    <Card className="bg-surface/50 border-border h-full">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          Domain & Hosting
          <span className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Online
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        <div className="flex justify-between items-center pb-4 border-b border-border/30">
          <span className="text-sm text-gray-400">Primary Domain</span>
          <span className="font-bold text-white text-right break-all ml-4">
            <a href={`https://${details.domain}`} target="_blank" rel="noreferrer" className="hover:text-growbroo-500 hover:underline">
              {details.domain}
            </a>
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface/30 p-3 rounded-lg border border-border/50">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SSL Certificate</p>
            <p className={`font-bold text-sm ${details.sslStatus === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>
              {details.sslStatus === 'Active' ? '🔒 Active' : `⏳ ${details.sslStatus}`}
            </p>
          </div>
          <div className="bg-surface/30 p-3 rounded-lg border border-border/50">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">DNS Status</p>
            <p className={`font-bold text-sm ${details.dnsStatus === 'Propagated' ? 'text-green-500' : 'text-yellow-500'}`}>
              {details.dnsStatus === 'Propagated' ? '✅ Propagated' : `⏳ ${details.dnsStatus}`}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Domain Expiry</span>
            <span className="text-sm font-medium text-white">{details.domainExpiry}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Hosting Expiry</span>
            <span className="text-sm font-medium text-white">{details.hostingExpiry}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Last Backup</span>
            <span className="text-sm font-medium text-white">{details.lastBackup}</span>
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <Button variant="outline" className="flex-1 text-xs text-gray-300 border-border hover:border-growbroo-500 hover:text-white">
            Manage DNS
          </Button>
          <Button variant="outline" className="flex-1 text-xs text-gray-300 border-border hover:border-growbroo-500 hover:text-white">
            Renew Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
