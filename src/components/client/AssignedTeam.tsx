import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

interface TeamMember {
  role: string;
  name: string;
  status: 'Online' | 'Busy' | 'Offline';
  replyTime?: string;
  avatar: string;
}

export function AssignedTeam({ members }: { members: TeamMember[] }) {
  return (
    <Card className="bg-surface/50 border-border h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Assigned Team</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-surface/30 border border-border/50 hover:border-border transition-colors group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-2xl border border-border overflow-hidden">
                  {member.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background ${
                  member.status === 'Online' ? 'bg-green-500' : member.status === 'Busy' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
              </div>
              <div>
                <p className="text-xs text-growbroo-500 uppercase tracking-wider font-bold mb-0.5">{member.role}</p>
                <p className="font-bold text-white text-sm">{member.name}</p>
                {member.replyTime && (
                  <p className="text-[10px] text-gray-500 mt-0.5">Replies in ~{member.replyTime}</p>
                )}
              </div>
            </div>
            
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-surface rounded-full p-2 h-auto w-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
