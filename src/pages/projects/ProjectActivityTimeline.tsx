import { useState } from "react";
import { TimelineLayout } from "../../components/timeline/TimelineLayout";
import { TimelineHeader } from "../../components/timeline/TimelineHeader";
import { FilterChips } from "../../components/timeline/FilterChips";
import { EventFeed } from "../../components/timeline/EventFeed";
import type { TimelineEvent } from "../../components/timeline/EventFeed";
import { ProjectHealthPanel } from "../../components/timeline/ProjectHealthPanel";

export function ProjectActivityTimeline() {
  const [activeFilter, setActiveFilter] = useState("All");

  const headerData = {
    projectName: "Acme Corporate Website",
    ticketNumber: "TKT-9912",
  };

  const mockEvents: TimelineEvent[] = [
    {
      id: "ev1",
      type: 'user',
      user: { name: "Sarah M.", role: "Client" },
      timestamp: "Today, 10:42 AM",
      title: "Requested a Revision",
      description: "Please change the hero banner image to the new one I just uploaded.",
      comments: [
        { id: "c1", user: "Elena R.", text: "I'll take care of this right away!" }
      ]
    },
    {
      id: "ev2",
      type: 'file',
      user: { name: "Sarah M.", role: "Client" },
      timestamp: "Today, 10:30 AM",
      title: "Uploaded File",
      file: { name: "Acme_Logo_Final.png", size: "2.4 MB", type: "image" }
    },
    {
      id: "ev3",
      type: 'system',
      user: { name: "System Admin", role: "Automated" },
      timestamp: "Yesterday, 4:30 PM",
      title: "Growth Partner Assigned",
      description: "Rahul Kumar has been assigned to oversee this project."
    },
    {
      id: "ev4",
      type: 'system',
      user: { name: "Finance System", role: "Automated" },
      timestamp: "Oct 10, 2026, 11:05 AM",
      title: "Payment Verified",
      file: { name: "Invoice_001_Oct.pdf", size: "320 KB", type: "pdf" }
    }
  ];

  return (
    <TimelineLayout>
      <div className="flex-1 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Left Column (Main Timeline) */}
        <div className="flex-1 min-w-0">
          <TimelineHeader {...headerData} />
          <FilterChips activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          
          <div className="mt-8">
             <EventFeed events={mockEvents} />
          </div>
        </div>

        {/* Right Column (Health Panel) */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-8">
            <ProjectHealthPanel />
          </div>
        </div>

      </div>
    </TimelineLayout>
  );
}
