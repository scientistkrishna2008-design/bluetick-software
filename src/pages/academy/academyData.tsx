import { Target, Users, Rocket, Star, Award } from "lucide-react";

export const MODULES = [
  { 
    id: 1, 
    title: "Welcome to GrowBro", 
    time: "5 min", 
    content: (
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white mb-2">What is GrowBro?</h4>
        <p>GrowBro is a premium platform connecting small businesses with highly skilled website creators, facilitated by our certified Sales Partners (you).</p>
        
        <h4 className="text-lg font-bold text-white mt-4 mb-2">Our Mission & Vision</h4>
        <p><strong>Mission:</strong> To give every small business an affordable, premium online presence.</p>
        <p><strong>Vision:</strong> A world where no local business is left behind in the digital age due to budget or technical barriers.</p>
        
        <h4 className="text-lg font-bold text-white mt-4 mb-2">Why GrowBro was created</h4>
        <p>Many business owners struggle to find affordable, high-quality websites, while talented creators struggle to find clients. We bridge this gap.</p>
        
        <h4 className="text-lg font-bold text-white mt-4 mb-2">How our ecosystem works</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Businesses:</strong> Receive premium, verified websites at transparent prices.</li>
          <li><strong>Sales Partners:</strong> Find clients, collect requirements, and earn significant commissions.</li>
          <li><strong>Website Creators:</strong> Focus entirely on building without worrying about sales or client management.</li>
          <li><strong>GrowBro Verification:</strong> We ensure quality standards are met before any website is delivered.</li>
        </ul>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-6">
          <h5 className="font-bold text-growbroo-500 mb-2">✓ Key Takeaways</h5>
          <ul className="space-y-1 text-sm">
            <li>GrowBro removes the friction between businesses and developers.</li>
            <li>Your role is to educate business owners and close sales.</li>
            <li>We handle all technical execution and quality control.</li>
          </ul>
        </div>
      </div>
    ) 
  },
  { 
    id: 2, 
    title: "Understanding Our Services", 
    time: "8 min", 
    content: (
      <div className="space-y-6">
        <p>GrowBro offers two transparent, highly-optimized website plans.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
            <h4 className="text-xl font-bold text-white mb-1">Starter Plan</h4>
            <div className="text-growbroo-500 font-bold text-lg mb-3">₹4,500 <span className="text-sm font-normal text-gray-400">(One Time)</span></div>
            <p className="text-sm text-gray-400 mb-4"><strong>Best For:</strong> Small local businesses needing a digital storefront.</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Premium Website</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Mobile Responsive</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> WhatsApp Integration</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Google Maps</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Contact Form & Gallery</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> SEO Basics</li>
            </ul>
          </div>

          <div className="bg-growbroo-500/10 border border-growbroo-500/30 p-5 rounded-xl relative overflow-hidden">
            <div className="absolute -right-6 -top-6 text-growbroo-500/20"><Star size={100} /></div>
            <h4 className="text-xl font-bold text-white mb-1">Business Plan</h4>
            <div className="text-growbroo-500 font-bold text-lg mb-3">₹7,500 <span className="text-sm font-normal text-gray-400">(One Time)</span></div>
            <p className="text-sm text-gray-400 mb-4"><strong>Best For:</strong> Growing businesses needing content control.</p>
            <p className="text-sm font-bold text-white mb-2">Everything in Starter, plus:</p>
            <ul className="space-y-2 text-sm relative z-10">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Admin Dashboard</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Update Products & Services</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Dynamic Pages</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Better Scalability</li>
            </ul>
          </div>
        </div>
      </div>
    ) 
  },
  { 
    id: 3, 
    title: "Ideal Customers", 
    time: "6 min", 
    content: (
      <div className="space-y-4">
        <p>To succeed as a Sales Partner, you must target businesses that actually need our services. Here are the most profitable niches:</p>
        
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {[
            { n: "Restaurants & Cafes", r: "Menu display, table booking, location" },
            { n: "Clinics & Doctors", r: "Trust building, appointment booking" },
            { n: "Salons & Spas", r: "Service lists, pricing, visual gallery" },
            { n: "Gyms", r: "Trainer profiles, class schedules" },
            { n: "Tuition Centres", r: "Course details, student testimonials" },
            { n: "Jewellery Shops", r: "Premium catalog display" },
            { n: "Boutiques", r: "Showcasing new collections" },
            { n: "Hardware/Cycle Shops", r: "Local search discovery via SEO" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg">
              <h5 className="font-bold text-white text-sm">{item.n}</h5>
              <p className="text-xs text-gray-400">{item.r}</p>
            </div>
          ))}
        </div>

        <div className="bg-growbroo-500/10 border border-growbroo-500/20 p-4 rounded-xl mt-6">
          <h5 className="font-bold text-white mb-2">Targeting Checklist:</h5>
          <ul className="space-y-2 text-sm">
            <li><span className="text-growbroo-500">✓</span> Do they rely heavily on local walk-ins?</li>
            <li><span className="text-growbroo-500">✓</span> Do they currently lack a professional website?</li>
            <li><span className="text-growbroo-500">✓</span> Are their competitors already online?</li>
          </ul>
        </div>
      </div>
    ) 
  },
  { 
    id: 4, 
    title: "Sales Conversation Guide", 
    time: "12 min", 
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-growbroo-500 font-bold uppercase tracking-wider text-xs mb-2">Section 1: First Impression</h4>
          <p className="text-sm">Dress professionally. Maintain eye contact. Smile. Confidence is key.</p>
        </div>

        <div>
          <h4 className="text-growbroo-500 font-bold uppercase tracking-wider text-xs mb-2">Section 2: Opening Script</h4>
          <div className="p-4 bg-black/40 border border-white/10 rounded-xl italic text-gray-300">
            "Hello Sir/Madam, I'm from GrowBro. We help local businesses build premium websites that attract more customers and increase trust online. Can I take just two minutes to show you something?"
          </div>
        </div>

        <div>
          <h4 className="text-growbroo-500 font-bold uppercase tracking-wider text-xs mb-2">Section 3: Discovery Questions</h4>
          <p className="text-sm mb-3">Ask these to uncover their pain points:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Where do most of your customers find you?</li>
            <li>Do customers frequently call to ask for your location or menu?</li>
            <li>Are your competitors currently outranking you on Google?</li>
            <li>Have you ever tried to build a website before? Why didn't it work out?</li>
          </ul>
        </div>

        <div>
          <h4 className="text-growbroo-500 font-bold uppercase tracking-wider text-xs mb-2">Section 4: Explaining Pricing</h4>
          <p className="text-sm">Always position the ₹4,500 not as an expense, but as an <strong>investment</strong>. "If this website brings you just 2 new customers a month, it pays for itself instantly."</p>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
          <h4 className="font-bold text-red-500 mb-2">Things NEVER To Say</h4>
          <ul className="space-y-1 text-sm">
            <li>"We are cheap." (Say: "We are highly cost-effective.")</li>
            <li>"I don't know." (Say: "Let me confirm that with my technical team.")</li>
            <li>"It will be done tomorrow." (Never overpromise timelines.)</li>
          </ul>
        </div>
      </div>
    ) 
  },
  { 
    id: 5, 
    title: "Handling Customer Objections", 
    time: "10 min", 
    content: (
      <div className="space-y-4">
        <p>Every successful salesperson masters objection handling. Here are real scenarios.</p>

        {[
          { q: "I already use Instagram.", a: "Instagram is great for engaging existing followers, but a website is your permanent digital address. You don't own your Instagram page, but you own your website. Plus, Google searches prioritize websites, not Instagram posts." },
          { q: "I don't need a website.", a: "You might not need one today, but your future customers expect it. A business without a website looks outdated compared to competitors." },
          { q: "It's too expensive.", a: "Let's look at the ROI. Our Starter plan is a one-time ₹4,500. A single newspaper ad costs more than that and lasts one day. Your website works 24/7." },
          { q: "I'll think about it later.", a: "I completely understand. However, the longer you wait, the more local search traffic goes to your competitors. Let's get started with a small advance today." },
          { q: "My nephew makes websites.", a: "That's great! But will he provide professional support, enterprise-grade mobile responsiveness, and SEO optimization? We offer guaranteed quality verification." },
        ].map((obj, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <p className="font-bold text-white mb-2">Customer: <span className="font-normal italic text-gray-400">"{obj.q}"</span></p>
            <p className="text-sm text-growbroo-400"><strong>Response:</strong> {obj.a}</p>
          </div>
        ))}
      </div>
    ) 
  },
  { 
    id: 6, 
    title: "Collecting Client Requirements", 
    time: "5 min", 
    content: (
      <div className="space-y-4">
        <p>Once the client pays, you must collect accurate data. Missing data delays the project.</p>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-growbroo-500 rounded-full"/> Business Name & Logo</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-growbroo-500 rounded-full"/> Phone & WhatsApp Number</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-growbroo-500 rounded-full"/> Exact Address & Google Maps Link</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-growbroo-500 rounded-full"/> List of Products/Services</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-growbroo-500 rounded-full"/> High-Quality Photos</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-growbroo-500 rounded-full"/> Social Media Links</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-growbroo-500 rounded-full"/> Brand Colors / Preferences</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-growbroo-500 rounded-full"/> About Us / Business Description</div>
        </div>
        <p className="text-sm text-gray-400 mt-4 border-t border-white/10 pt-4"><strong>Why this matters:</strong> The website creator cannot start building without this exact information. Collecting it quickly ensures fast delivery.</p>
      </div>
    ) 
  },
  { 
    id: 7, 
    title: "GrowBro Workflow", 
    time: "4 min", 
    content: (
      <div className="space-y-6">
        <p>Understand exactly how a project moves through our system.</p>
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {[
            "Sales Partner closes the deal",
            "Requirement & Advance Payment Collected",
            "Assigned to Website Creator",
            "Development Phase",
            "Client Review & Revisions",
            "GrowBro Quality Verification",
            "Final Payment & Delivery",
            "Commission Release"
          ].map((step, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-surface text-gray-400 group-[.is-active]:bg-growbroo-500 group-[.is-active]:text-white group-[.is-active]:border-growbroo-500/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(34,197,94,0.2)] z-10">
                {i + 1}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="font-bold text-sm">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) 
  },
  { 
    id: 8, 
    title: "Payment Rules", 
    time: "5 min", 
    content: (
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <h4 className="font-bold text-white mb-2">Payment Milestones</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><strong>Advance Payment:</strong> 50% must be collected before development begins. Non-negotiable.</li>
            <li><strong>Final Payment:</strong> 50% collected after client approval, prior to final domain handover.</li>
          </ul>
        </div>
        
        <div className="bg-growbroo-500/10 border border-growbroo-500/20 p-4 rounded-xl">
          <h4 className="font-bold text-growbroo-500 mb-2">Commission Rules</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Your commission is locked upon advance payment.</li>
            <li>Commission is released to your dashboard <strong>only after</strong> final project delivery and full payment collection.</li>
          </ul>
        </div>
        
        <p className="text-sm text-gray-400 mt-2"><strong>Refunds:</strong> Advances are non-refundable once development has started. Inform clients clearly.</p>
      </div>
    ) 
  },
  { 
    id: 9, 
    title: "GrowBro Quality Verification", 
    time: "3 min", 
    content: (
      <div className="space-y-4">
        <p>Every website must pass our strict internal audit before it reaches the client. This protects our brand reputation.</p>
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          {[
            "100% Mobile Responsive",
            "Zero Broken Links",
            "Forms Routing Correctly",
            "WhatsApp API Working",
            "Google Maps Embedded",
            "Images Compressed (WebP)",
            "Fast Loading Speed (<3s)",
            "Grammar & Spell Check",
            "Basic SEO Meta Tags",
            "Final Visual Polish"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
              <span className="text-growbroo-500 font-bold shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ) 
  },
  { 
    id: 10, 
    title: "Professional Behaviour", 
    time: "2 min", 
    content: (
      <div className="space-y-4">
        <p>You represent the GrowBro brand. Your behavior directly impacts our reputation.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-green-500 mb-2 uppercase text-xs tracking-wider">The Do's</h4>
            <ul className="space-y-2 text-sm">
              <li>✓ Dress professionally for in-person meetings.</li>
              <li>✓ Reply to client messages within 2 hours.</li>
              <li>✓ Be completely honest about what we provide.</li>
              <li>✓ Maintain accurate project records.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-red-500 mb-2 uppercase text-xs tracking-wider">The Don'ts</h4>
            <ul className="space-y-2 text-sm">
              <li>✗ Never overpromise technical features.</li>
              <li>✗ Never guarantee specific Google rankings.</li>
              <li>✗ Never argue with a client. Stay calm.</li>
              <li>✗ Never ignore follow-ups.</li>
            </ul>
          </div>
        </div>
      </div>
    ) 
  },
  { 
    id: 11, 
    title: "Ready To Use Resources", 
    time: "2 min", 
    content: (
      <div className="space-y-4">
        <p>Copy and paste these templates to save time.</p>
        
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <h5 className="font-bold text-white mb-2 text-sm">WhatsApp Introduction</h5>
          <p className="text-sm italic text-gray-400 bg-black/50 p-3 rounded border border-white/5">
            "Hi [Name], I noticed [Business Name] doesn't have a website yet. I'm with GrowBro, and we help local businesses get premium websites up in just 3 days for a very low cost. Would you be open to a quick 2-min chat?"
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <h5 className="font-bold text-white mb-2 text-sm">Requirement Request</h5>
          <p className="text-sm italic text-gray-400 bg-black/50 p-3 rounded border border-white/5">
            "Thank you for choosing GrowBro! To get started immediately, please send over: 1. Your Logo 2. Phone number for WhatsApp 3. 5-10 high quality photos of your business 4. A short description of what you do."
          </p>
        </div>
      </div>
    ) 
  },
  { 
    id: 12, 
    title: "Frequently Asked Questions", 
    time: "5 min", 
    content: (
      <div className="space-y-4">
        {[
          { q: "Do they have to pay monthly?", a: "No, the Starter and Business plans are one-time payments for development. (Note: Domain/Hosting renewals apply yearly after the first year)." },
          { q: "Can we build e-commerce sites?", a: "Currently, our standard plans do not cover full e-commerce. You can request a custom quote via the admin dashboard for complex requirements." },
          { q: "How long does a website take?", a: "Once requirements and advance are collected, our creators deliver the first draft within 3-5 business days." },
          { q: "What if the client wants changes?", a: "Reasonable UI/text revisions are included. Complete redesigns after approval incur extra charges." }
        ].map((faq, i) => (
          <div key={i} className="mb-4 pb-4 border-b border-white/5 last:border-0">
            <h5 className="font-bold text-white text-sm mb-1">Q: {faq.q}</h5>
            <p className="text-sm text-gray-400">A: {faq.a}</p>
          </div>
        ))}
      </div>
    ) 
  },
  { 
    id: 13, 
    title: "Become a Certified GrowBro Partner", 
    time: "1 min", 
    content: (
      <div className="space-y-4 text-center py-6">
        <Award size={48} className="text-growbroo-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">You're Almost There</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-6">By becoming certified, you agree to uphold the GrowBro Professional Standards, Code of Conduct, and pricing integrity.</p>
        <p className="text-sm text-growbroo-400 font-bold">Requirement: Complete the Mock Client Simulator below to unlock your certificate.</p>
      </div>
    ) 
  }
];

export const MOCK_CLIENTS = [
  {
    id: 1,
    name: "Bakery Owner",
    difficulty: "Easy",
    initialMessage: "I already get enough customers from my Instagram page. Why do I need a website?",
    objections: ["Relies on social media", "Doesn't see value", "Low technical knowledge"],
    goal: "Explain how a website builds permanent trust and captures Google search traffic.",
    outcome: "Client understands the difference between rented social media and owned web property."
  },
  {
    id: 2,
    name: "Clinic Owner",
    difficulty: "Medium",
    initialMessage: "I looked at your pricing. Your website is too expensive for my small clinic.",
    objections: ["Price sensitivity", "Needs to see ROI", "Busy schedule"],
    goal: "Shift focus from 'expense' to 'investment' and patient trust.",
    outcome: "Client realizes a single new patient covers the entire website cost."
  },
  {
    id: 3,
    name: "Gym Owner",
    difficulty: "Hard",
    initialMessage: "Sounds good, but I'm too busy right now. I'll think about it later next year.",
    objections: ["Procrastination", "Doesn't feel urgency", "Needs lead generation proof"],
    goal: "Create urgency by pointing out competitor advantages.",
    outcome: "Client agrees to start a small Starter plan to secure their online presence now."
  },
  {
    id: 4,
    name: "Restaurant Owner",
    difficulty: "Expert",
    initialMessage: "I don't need a website. People just walk in or use Zomato.",
    objections: ["Relies on third-party apps", "Doesn't want to pay commissions", "Stubborn mindset"],
    goal: "Highlight Zomato's high commissions and the value of direct orders/reservations.",
    outcome: "Client wants to bypass third-party fees and control their own brand."
  }
];

export const BADGES = [
  { id: 1, title: "First Lead", icon: <Target size={24} />, condition: "Unlock after first qualified lead.", unlocked: true },
  { id: 2, title: "First Client", icon: <Users size={24} />, condition: "Unlock after first successful sale.", unlocked: false },
  { id: 3, title: "First Delivery", icon: <Rocket size={24} />, condition: "Unlock after project completion.", unlocked: false },
  { id: 4, title: "5 Projects", icon: <Star size={24} />, condition: "Unlock after five completed websites.", unlocked: false },
  { id: 5, title: "10 Projects", icon: <Star size={24} />, condition: "Unlock after ten completed websites.", unlocked: false },
  { id: 6, title: "Elite Partner", icon: <Award size={24} />, condition: "Unlock after consistently high customer ratings.", unlocked: false },
];
