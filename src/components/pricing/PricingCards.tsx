import { CheckCircle2, ShieldCheck, LayoutTemplate, LineChart, Users, Wallet, Laptop, CheckCircle, Award } from "lucide-react";
import { Card } from "../ui/Card";

export function PricingCards() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Premium Websites. <span className="text-growbroo-500">Honest Pricing.</span>
        </h2>
        <p className="text-gray-400">Two simple plans crafted for businesses of every size.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Plan 1 */}
        <Card className="bg-surface/30 border-growbroo-500/20 p-8 rounded-2xl relative overflow-hidden transition-all hover:border-growbroo-500/50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="inline-block px-3 py-1 border border-growbroo-500/30 text-growbroo-400 text-xs font-bold rounded-full mb-4 tracking-widest uppercase">
                Plan 1
              </div>
              <h3 className="text-3xl font-bold mb-2">Starter Website</h3>
              <p className="text-gray-400 text-sm max-w-[250px]">A perfect website to showcase your business and get more customers.</p>
            </div>
            <div className="h-14 w-14 bg-surface border border-growbroo-500/30 rounded-xl flex items-center justify-center text-growbroo-500 flex-shrink-0">
              <LayoutTemplate size={28} />
            </div>
          </div>

          <div className="mb-8">
            <span className="text-5xl font-bold">₹4,500</span>
            <p className="text-growbroo-500 text-xs font-bold tracking-widest mt-2 uppercase">One Time Payment</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
            {[
              "Up to 5 Pages",
              "WhatsApp Integration",
              "Mobile Responsive",
              "Basic SEO Setup",
              "Contact / Enquiry Form",
              "Fast & Secure",
              "Google Maps Integration"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-growbroo-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Plan 2 */}
        <Card className="bg-surface border-growbroo-500 shadow-[0_0_30px_rgba(34,197,94,0.1)] p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-growbroo-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-widest uppercase flex items-center gap-1">
            ★ Most Popular
          </div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="inline-block px-3 py-1 border border-growbroo-500/50 text-growbroo-500 text-xs font-bold rounded-full mb-4 tracking-widest uppercase">
                Plan 2
              </div>
              <h3 className="text-3xl font-bold mb-2">Business Website</h3>
              <p className="text-gray-400 text-sm max-w-[280px]">A dynamic website with admin panel to manage and grow your business.</p>
            </div>
            <div className="h-14 w-14 bg-surface border border-growbroo-500/50 rounded-xl flex items-center justify-center text-growbroo-500 flex-shrink-0">
              <LineChart size={28} />
            </div>
          </div>

          <div className="mb-8">
            <span className="text-5xl font-bold">₹7,500</span>
            <p className="text-growbroo-500 text-xs font-bold tracking-widest mt-2 uppercase">One Time Payment</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
            {[
              "Everything in Starter",
              "Enquiry Management",
              "Admin Panel",
              "Image / Content Updates",
              "Manage Products / Services",
              "Basic SEO Setup",
              "Blog / News Management"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-growbroo-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Domain Info */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-growbroo-500/30 text-sm text-gray-300">
          <ShieldCheck size={18} className="text-growbroo-500" />
          Domain (.in / .com) at actuals - approx ₹300 - ₹400 per year (paid by client)
        </div>
      </div>

      {/* How it works */}
      <div className="border-t border-border pt-12 mt-12">
        <div className="text-center mb-10">
          <h4 className="text-growbroo-500 text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4">
            <span className="h-[1px] w-8 bg-growbroo-500/50"></span>
            How It Works
            <span className="h-[1px] w-8 bg-growbroo-500/50"></span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center relative">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-border z-0 border-dashed border-t" />
          
          {[
            { icon: Users, title: "1. Sales Partner", desc: "Finds & talks to the client, explains the plan & collects requirements." },
            { icon: Wallet, title: "2. Payment", desc: "Client makes the payment to Growbroo." },
            { icon: Laptop, title: "3. Website Creator", desc: "Builds the website as per requirements." },
            { icon: CheckCircle, title: "4. Client Approval", desc: "Sales Partner shares the website with the client and ensures complete satisfaction." },
            { icon: Award, title: "5. Payout", desc: "After delivery, payouts are processed to Sales Partner & Website Creator." }
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className="h-12 w-12 bg-surface border border-border rounded-full flex items-center justify-center text-growbroo-500 mb-4 shadow-xl">
                <step.icon size={20} />
              </div>
              <h5 className="font-bold text-sm mb-2">{step.title}</h5>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
