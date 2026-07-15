import { ClientHeader } from "../../components/client/ClientHeader";
import { ProjectStatusCard } from "../../components/client/ProjectStatusCard";
import { ProjectTimeline } from "../../components/client/ProjectTimeline";
import { OverviewCards } from "../../components/client/OverviewCards";
import { AssignedTeam } from "../../components/client/AssignedTeam";
import { QuickActions } from "../../components/client/QuickActions";
import { FileManagerPreview } from "../../components/client/FileManagerPreview";
import { PaymentsCard } from "../../components/client/PaymentsCard";
import { DomainHostingCard } from "../../components/client/DomainHostingCard";
import { SupportCenterCard } from "../../components/client/SupportCenterCard";
import { AnalyticsCards } from "../../components/client/AnalyticsCards";
import { CustomerSuccessCard } from "../../components/client/CustomerSuccessCard";

export function ClientDashboard() {
  // MOCK DATA for High-Fidelity UI Presentation
  const mockClient = {
    clientName: "Sarah",
    businessName: "Acme Corp",
    projectName: "Acme Corporate Website",
    progress: 75,
    currentStage: "Client Review",
    deliveryDate: "Oct 24, 2026"
  };

  const mockTimeline = [
    { id: 1, label: "Project Created", status: "completed" as const },
    { id: 2, label: "Payment Verified", status: "completed" as const },
    { id: 3, label: "Growth Partner Assigned", status: "completed" as const },
    { id: 4, label: "Web Engineer Assigned", status: "completed" as const },
    { id: 5, label: "Development Started", status: "completed" as const },
    { id: 6, label: "Client Review", status: "current" as const },
    { id: 7, label: "GrowBro Verification", status: "pending" as const },
    { id: 8, label: "Final Delivery", status: "pending" as const },
  ];

  const mockTeam = [
    { role: "Growth Partner", name: "David Chen", status: "Online" as const, avatar: "👨‍💼" },
    { role: "Web Engineer", name: "Elena Rodriguez", status: "Busy" as const, avatar: "👩‍💻" },
  ];

  const mockFiles = [
    { name: "Acme_Logo_Final.png", type: "image" as const, size: "2.4 MB", date: "2 hrs ago" },
    { name: "Website_Copy_v2.docx", type: "document" as const, size: "1.1 MB", date: "Yesterday" },
    { name: "Brand_Guidelines.pdf", type: "document" as const, size: "4.5 MB", date: "3 days ago" },
  ];

  const mockPayments = {
    plan: "Business Website Plan",
    total: 25000,
    paid: 12500,
    pending: 12500,
    history: [
      { date: "Oct 10, 2026", amount: 12500, invoiceId: "INV-2026-001" }
    ]
  };

  const mockDomain = {
    domain: "acmecorp.com",
    domainExpiry: "Oct 10, 2027",
    hostingExpiry: "Oct 10, 2027",
    sslStatus: "Active" as const,
    dnsStatus: "Propagated" as const,
    lastBackup: "Today, 04:00 AM"
  };

  return (
    <div className="pb-12 space-y-8">
      {/* Header Section */}
      <ClientHeader {...mockClient} />

      {/* Primary Overview Row */}
      <OverviewCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectStatusCard 
              projectName={mockClient.projectName}
              projectType="Corporate Website"
              plan="Business Website Plan"
              currentStage={mockClient.currentStage}
              estimatedCompletion={mockClient.deliveryDate}
              progress={mockClient.progress}
            />
            <ProjectTimeline stages={mockTimeline} />
          </div>

          <QuickActions />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FileManagerPreview files={mockFiles} />
            <SupportCenterCard />
          </div>

          <AnalyticsCards />

        </div>

        {/* Right Column (Sidebar-ish) */}
        <div className="space-y-8 flex flex-col">
          <div className="flex-none"><AssignedTeam members={mockTeam} /></div>
          <div className="flex-none"><PaymentsCard details={mockPayments} /></div>
          <div className="flex-none"><DomainHostingCard details={mockDomain} /></div>
          <div className="flex-1"><CustomerSuccessCard /></div>
        </div>

      </div>
    </div>
  );
}
