export const PIPELINE = [
  "Lead",
  "Client Qualification",
  "Payment",
  "Project Assignment",
  "Website Development",
  "Client Review",
  "GrowBro Verification",
  "Final Delivery",
  "Commission Release",
  "Support"
];

export const SOPS = [
  {
    id: 1,
    title: "1. CLIENT ONBOARDING SOP",
    purpose: "How every new client enters GrowBro.",
    responsible: "Sales Partner",
    time: "30 Minutes",
    documents: ["Business Details", "Logo", "Photos", "Payment"],
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider text-growbroo-500">Process</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Sales Partner qualifies the lead.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Understand business requirements.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Recommend the correct plan.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Collect business details.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Generate quotation.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Payment received by GrowBro.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Project automatically appears in Admin Dashboard.</li>
        </ul>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4 inline-block">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Target Status</p>
          <p className="text-white font-medium">Ready for Assignment</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "2. PROJECT ASSIGNMENT SOP",
    purpose: "Assign projects fairly.",
    responsible: "GrowBro Admin",
    time: "15 Minutes",
    documents: ["Project Brief"],
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider text-growbroo-500">Rules</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Choose available Website Creator.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Match project complexity.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Assign deadline.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Notify Developer.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Notify Sales Partner.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Update Dashboard.</li>
        </ul>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4 inline-block">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Target Status</p>
          <p className="text-white font-medium">Assigned</p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "3. WEBSITE DEVELOPMENT SOP",
    purpose: "Build the website according to requirements.",
    responsible: "Website Creator",
    time: "3-5 Days",
    documents: ["Assets Folder", "Design System"],
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider text-growbroo-500">Developer Checklist</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Read requirements.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Download assets.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Confirm understanding.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Create first version.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Upload progress.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Update dashboard.</li>
        </ul>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4 inline-block">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Target Status</p>
          <p className="text-white font-medium">Ready for Client Review</p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "4. CLIENT REVIEW SOP",
    purpose: "Ensure the client is happy with the work.",
    responsible: "Sales Partner & Creator",
    time: "24-48 Hours",
    documents: ["Feedback Form", "Preview Link"],
    content: (
      <div className="space-y-4">
        <ul className="space-y-2 text-sm text-gray-300 mb-4">
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Sales Partner receives preview.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Share preview with client.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Collect feedback.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Categorize requests:</li>
        </ul>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-gray-300"><span className="text-green-500 font-bold block mb-1">Minor Changes</span> Colors, text typos, image swaps.</div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-gray-300"><span className="text-yellow-500 font-bold block mb-1">Major Changes</span> Layout shifts, extra pages.</div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-gray-300"><span className="text-red-500 font-bold block mb-1">Out of Scope</span> Features not in original plan.</div>
        </div>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Developer completes revisions.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Update dashboard.</li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    title: "5. GROWBRO VERIFICATION SOP",
    purpose: "Guarantee premium quality standards.",
    responsible: "QA Team / Admin",
    time: "2 Hours",
    documents: ["QA Checklist"],
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider text-growbroo-500">Checklist</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300 mb-6">
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Mobile Responsive</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Desktop Responsive</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> All Buttons Working</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Contact Form</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> WhatsApp Integration</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Google Maps</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Images Optimized</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Speed Tested</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Grammar Checked</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> SEO Basics</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Browser Compatibility</div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span> Final UI Review</div>
        </div>
        
        <div className="bg-growbroo-500/10 border border-growbroo-500/50 p-4 rounded-xl inline-block shadow-[0_0_20px_rgba(34,197,94,0.2)]">
          <p className="text-xs text-growbroo-500 uppercase tracking-wider mb-1 font-bold">When everything passes:</p>
          <p className="text-white font-bold text-lg flex items-center gap-2"><span className="text-green-500">✔</span> GrowBro Verified</p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "6. FINAL DELIVERY SOP",
    purpose: "Hand over the completed project to the client.",
    responsible: "Sales Partner",
    time: "1 Hour",
    documents: ["Delivery Package", "Login Credentials"],
    content: (
      <div className="space-y-4">
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Generate delivery package.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Share website link and credentials.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Confirm client approval.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Provide support instructions.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Close project.</li>
        </ul>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4 inline-block">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Target Status</p>
          <p className="text-white font-medium">Completed</p>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "7. COMMISSION RELEASE SOP",
    purpose: "Payout partners automatically.",
    responsible: "Automated System / Admin",
    time: "Instant",
    documents: ["Payment Proof", "Client Sign-off"],
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider text-growbroo-500">Conditions</h4>
        <ul className="space-y-2 text-sm text-gray-300 mb-4">
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Client approves final delivery.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Project marked as completed.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> Verification passed.</li>
          <li className="flex items-start gap-2"><span className="text-green-500">✓</span> No pending issues or disputes.</li>
        </ul>
        <p className="text-sm text-gray-300 italic p-3 bg-black/40 rounded-lg border border-white/5">
          Commission released automatically. Dashboard updates earnings.
        </p>
      </div>
    )
  },
  {
    id: 8,
    title: "8. SUPPORT TICKET SOP",
    purpose: "Handle post-delivery issues effectively.",
    responsible: "Support Team",
    time: "1-12 Hours",
    documents: ["Issue Log", "Client Complaint"],
    content: (
      <div className="space-y-4">
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> When client raises issue.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Ticket created.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Priority assigned (Low/Med/High).</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Assign responsible person.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Track progress.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Notify customer upon fix.</li>
          <li className="flex items-start gap-2"><span className="text-white/30">•</span> Close ticket.</li>
        </ul>
      </div>
    )
  },
  {
    id: 9,
    title: "9. ESCALATION SOP",
    purpose: "Resolve stuck or high-risk issues.",
    responsible: "Senior Admin",
    time: "Immediate",
    documents: ["Escalation Form"],
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider text-growbroo-500">If issue isn't solved:</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2"><span className="text-red-500">!</span> Automatically notify Admin.</li>
          <li className="flex items-start gap-2"><span className="text-red-500">!</span> Reassign project if necessary.</li>
          <li className="flex items-start gap-2"><span className="text-red-500">!</span> Review issue thoroughly.</li>
          <li className="flex items-start gap-2"><span className="text-red-500">!</span> Contact client directly to calm situation.</li>
          <li className="flex items-start gap-2"><span className="text-red-500">!</span> Resolve.</li>
          <li className="flex items-start gap-2"><span className="text-red-500">!</span> Close escalation.</li>
        </ul>
      </div>
    )
  },
  {
    id: 10,
    title: "10. QUALITY STANDARDS",
    purpose: "Maintain the integrity of the GrowBro brand.",
    responsible: "Entire Team",
    time: "Ongoing",
    documents: ["Brand Guidelines"],
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-yellow-500 mb-2 text-sm uppercase tracking-wider">Golden Rules</h4>
        <div className="bg-yellow-500/5 border border-yellow-500/20 p-5 rounded-xl">
          <ul className="space-y-3 text-sm text-gray-300 font-medium">
            <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold">★</span> Never miss deadlines.</li>
            <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold">★</span> Never skip verification.</li>
            <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold">★</span> Never send unfinished work.</li>
            <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold">★</span> Always communicate professionally.</li>
            <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold">★</span> Always update dashboard.</li>
            <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold">★</span> Always protect client data.</li>
            <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold">★</span> Always maintain GrowBro quality.</li>
          </ul>
        </div>
      </div>
    )
  }
];
