import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

export function SupportCenterCard() {
  const tickets = [
    { id: '#TIC-8472', subject: 'Change hero image', status: 'Resolved', date: '2 days ago' },
    { id: '#TIC-8491', subject: 'Email configuration', status: 'Open', date: '5 hours ago' }
  ];

  return (
    <Card className="bg-surface/50 border-border h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/50">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          Support Center
        </CardTitle>
        <Button variant="ghost" className="text-xs text-growbroo-500 hover:text-growbroo-400 p-0 h-auto">View All</Button>
      </CardHeader>
      <CardContent className="pt-6 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface/30 p-3 rounded-lg border border-border/50 text-center">
            <p className="text-xl font-bold text-red-500">1</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Open Ticket</p>
          </div>
          <div className="bg-surface/30 p-3 rounded-lg border border-border/50 text-center">
            <p className="text-xl font-bold text-gray-400">14</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Resolved</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 flex-1">
          {tickets.map((ticket, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-surface/30 border border-border/50 hover:bg-surface-hover transition-colors cursor-pointer">
              <div>
                <p className="text-sm font-medium text-white mb-0.5">{ticket.subject}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{ticket.id}</span>
                  <span className="text-gray-600 text-xs">•</span>
                  <span className="text-xs text-gray-500">{ticket.date}</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                ticket.status === 'Resolved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
              }`}>
                {ticket.status}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          <Button variant="outline" className="flex-1 text-xs border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-growbroo-500">
            Create Ticket
          </Button>
          <Button variant="outline" className="flex-1 text-xs border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-growbroo-500">
            FAQs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
