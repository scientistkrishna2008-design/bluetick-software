import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { motion } from "framer-motion";

export function AnalyticsCards() {
  const metrics = [
    { label: "Unique Visitors", value: "2,405", growth: "+14%", icon: "👥", color: "blue" },
    { label: "Page Views", value: "8,291", growth: "+21%", icon: "👁️", color: "purple" },
    { label: "Form Submissions", value: "142", growth: "+5%", icon: "📝", color: "growbroo" },
    { label: "WhatsApp Clicks", value: "89", growth: "+42%", icon: "💬", color: "green" },
  ];

  return (
    <Card className="bg-surface/50 border-border">
      <CardHeader className="pb-4 border-b border-border/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Website Analytics</CardTitle>
          <span className="text-xs text-gray-500 font-medium bg-surface px-2 py-1 rounded">Last 30 Days</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-xl bg-surface/30 border border-border/50 flex flex-col items-center text-center hover:bg-surface-hover transition-colors"
            >
              <div className="text-2xl mb-2">{metric.icon}</div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-white mb-2">{metric.value}</p>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                {metric.growth}
              </span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
