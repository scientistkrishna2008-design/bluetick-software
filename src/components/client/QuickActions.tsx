import { Card, CardContent } from "../ui/Card";

export function QuickActions() {
  const actions = [
    { label: "Upload Files", icon: "⬆️", desc: "Send assets to team", color: "blue" },
    { label: "Request Revision", icon: "📝", desc: "Submit stage 3 fixes", color: "yellow" },
    { label: "Pay Remaining", icon: "💳", desc: "Clear pending balance", color: "growbroo" },
    { label: "Raise Ticket", icon: "🎫", desc: "Get technical support", color: "red" },
    { label: "Leave Review", icon: "⭐", desc: "Rate your experience", color: "purple" }
  ];

  return (
    <Card className="bg-surface/50 border-border h-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {actions.map((action, idx) => (
            <button 
              key={idx}
              className={`flex flex-col items-center justify-center p-4 rounded-xl bg-surface/30 border border-border hover:border-${action.color}-500/50 hover:bg-${action.color}-500/10 transition-all duration-300 group text-center h-full`}
            >
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{action.icon}</span>
              <span className="font-bold text-sm text-white mb-1 leading-tight">{action.label}</span>
              <span className="text-[10px] text-gray-500 hidden sm:block">{action.desc}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
