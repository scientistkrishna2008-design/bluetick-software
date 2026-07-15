import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export interface TimelineEvent {
  id: string;
  type: 'system' | 'user' | 'file' | 'comment';
  user: { name: string; role: string; avatar?: string };
  timestamp: string;
  title: string;
  description?: string;
  file?: { name: string; size: string; type: string };
  comments?: { id: string; user: string; text: string }[];
}

export function EventFeed({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {events.map((event, idx) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative flex items-start md:justify-between mb-8 group"
        >
          {/* Timeline Dot */}
          <div className="absolute left-5 md:left-1/2 -translate-x-1/2 mt-1.5 z-10">
            <div className="w-3 h-3 rounded-full bg-growbroo-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] border-2 border-[#0B0B0B] group-hover:scale-150 transition-transform duration-300" />
          </div>

          {/* Left Side (Time on desktop) */}
          <div className="hidden md:block w-1/2 pr-12 text-right mt-1">
            <p className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{event.timestamp}</p>
          </div>

          {/* Right Side (Content) */}
          <div className="w-full pl-12 md:pl-0 md:w-1/2 md:pl-12">
            <div className="bg-surface/50 border border-border/50 hover:border-growbroo-500/30 rounded-2xl p-5 hover:bg-surface-hover/80 transition-all duration-300 relative overflow-hidden group/card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-growbroo-500/5 blur-[40px] rounded-full pointer-events-none group-hover/card:bg-growbroo-500/10 transition-colors" />
              
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center font-bold text-xs border border-border shrink-0">
                  {event.user.avatar || event.user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    by {event.user.name} <span className="text-gray-600">({event.user.role})</span>
                    <span className="md:hidden ml-2">{event.timestamp}</span>
                  </p>
                </div>
              </div>

              {event.description && (
                <div className="text-sm text-gray-300 bg-[#0a0a0a]/50 p-3 rounded-lg border border-border/50 mb-3 relative z-10">
                  "{event.description}"
                </div>
              )}

              {event.file && (
                <div className="flex items-center justify-between bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 mb-3 relative z-10 cursor-pointer hover:bg-blue-500/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {event.file.type === 'image' ? '🖼️' : event.file.type === 'pdf' ? '📄' : '📁'}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{event.file.name}</p>
                      <p className="text-xs text-gray-500">{event.file.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white shrink-0 scale-90">
                    Preview
                  </Button>
                </div>
              )}

              {/* Comments Section */}
              <div className="relative z-10 mt-4 border-t border-border/50 pt-3">
                {event.comments && event.comments.length > 0 ? (
                  <div className="space-y-3 mb-3">
                    {event.comments.map(comment => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center font-bold text-[10px] shrink-0 border border-border mt-0.5">
                          {comment.user.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400">{comment.user}</p>
                          <p className="text-sm text-gray-300">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    className="flex-1 bg-surface border border-border rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-growbroo-500 transition-colors"
                  />
                  <Button variant="ghost" className="rounded-full text-growbroo-500 hover:bg-growbroo-500/10 px-3">
                    Post
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
