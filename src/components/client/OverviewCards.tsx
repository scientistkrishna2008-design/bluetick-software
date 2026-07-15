import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

export function OverviewCards() {
  const cards = [
    {
      id: 'files',
      icon: '📂',
      title: 'Files',
      mainStat: '12',
      subStat: 'Recent Upload: Logo.png',
      btnLabel: 'Quick Upload',
      color: 'blue'
    },
    {
      id: 'messages',
      icon: '💬',
      title: 'Messages',
      mainStat: '3 Unread',
      subStat: 'Last Reply: 2 mins ago',
      btnLabel: 'Open Chat',
      color: 'growbroo'
    },
    {
      id: 'revisions',
      icon: '📝',
      title: 'Revisions',
      mainStat: '1 Pending',
      subStat: '0 Completed',
      btnLabel: 'Request Revision',
      color: 'yellow'
    },
    {
      id: 'support',
      icon: '🎫',
      title: 'Support',
      mainStat: '0 Open',
      subStat: '1 Resolved',
      btnLabel: 'Raise Ticket',
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.id} className="bg-surface/50 border-border hover:border-gray-600 transition-colors group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{card.icon}</span>
            </div>
            <h4 className="text-gray-400 text-sm mb-1">{card.title}</h4>
            <p className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{card.mainStat}</p>
            <p className="text-xs text-gray-500 mb-6">{card.subStat}</p>
            <Button variant="outline" className={`w-full text-xs py-1.5 h-auto border-${card.color}-500/30 text-${card.color}-400 hover:bg-${card.color}-500 hover:text-white`}>
              {card.btnLabel}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
