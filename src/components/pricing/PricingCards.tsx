import { CheckCircle2, ShieldCheck, LayoutTemplate, LineChart, CircleDot, Circle, Search, CreditCard, ClipboardList, Monitor, UserCheck, Rocket, PartyPopper, BadgeCheck } from "lucide-react";
import { Card } from "../ui/Card";

interface PricingCardsProps {
  selectable?: boolean;
  selectedPlan?: string;
  onSelectPlan?: (plan: string) => void;
  hideHowItWorks?: boolean;
}

export function PricingCards({ selectable = false, selectedPlan, onSelectPlan, hideHowItWorks = false }: PricingCardsProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto ${selectable ? 'py-4 px-2' : 'py-12 px-4'}`}>
      {!selectable && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Premium Websites. <span className="text-growbroo-500">Honest Pricing.</span>
          </h2>
          <p className="text-gray-400">Two simple plans crafted for businesses of every size.</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Plan 1 */}
        <Card 
          onClick={() => selectable && onSelectPlan?.("Plan 1")}
          className={`bg-surface/30 p-8 rounded-2xl relative overflow-hidden transition-all ${
            selectable ? 'cursor-pointer hover:border-growbroo-500/50' : 'hover:border-growbroo-500/50'
          } ${
            selectable && selectedPlan === "Plan 1" ? 'border-growbroo-500 ring-1 ring-growbroo-500' : 'border-growbroo-500/20'
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {selectable && (
                  <div className="text-growbroo-500">
                    {selectedPlan === "Plan 1" ? <CircleDot size={20} /> : <Circle size={20} className="text-gray-500" />}
                  </div>
                )}
                <div className="inline-block px-3 py-1 border border-growbroo-500/30 text-growbroo-400 text-xs font-bold rounded-full tracking-widest uppercase">
                  Plan 1
                </div>
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
        <Card 
          onClick={() => selectable && onSelectPlan?.("Plan 2")}
          className={`bg-surface shadow-[0_0_30px_rgba(34,197,94,0.1)] p-8 rounded-2xl relative overflow-hidden transition-all ${
            selectable ? 'cursor-pointer hover:border-growbroo-400' : ''
          } ${
            selectable && selectedPlan === "Plan 2" ? 'border-growbroo-400 ring-2 ring-growbroo-500' : 'border-growbroo-500'
          }`}
        >
          <div className="absolute top-0 right-0 bg-growbroo-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-widest uppercase flex items-center gap-1">
            ★ Most Popular
          </div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {selectable && (
                  <div className="text-growbroo-500">
                    {selectedPlan === "Plan 2" ? <CircleDot size={20} /> : <Circle size={20} className="text-gray-500" />}
                  </div>
                )}
                <div className="inline-block px-3 py-1 border border-growbroo-500/50 text-growbroo-500 text-xs font-bold rounded-full tracking-widest uppercase">
                  Plan 2
                </div>
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
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-growbroo-500/30 text-sm text-gray-300 text-center">
          <ShieldCheck size={18} className="text-growbroo-500 flex-shrink-0" />
          <span>Domain (.in / .com) at actuals - approx ₹300 - ₹400 per year (paid by client)</span>
        </div>
      </div>

      {/* How it works */}
      {!hideHowItWorks && (
        <div className="border-t border-border pt-12 mt-12">
          <div className="text-center mb-10">
            <h4 className="text-growbroo-500 text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4">
              <span className="h-[1px] w-8 bg-growbroo-500/50"></span>
              How It Works
              <span className="h-[1px] w-8 bg-growbroo-500/50"></span>
            </h4>
          </div>

          <div className="max-w-2xl mx-auto relative pl-4 sm:pl-8">
            <div className="absolute top-8 bottom-8 left-[2.2rem] sm:left-[3.2rem] w-[2px] bg-growbroo-500/20" />
            
            <div className="space-y-8">
              {/* Pre-Verification Steps */}
              {[
                { icon: Search, title: "Sales Partner Finds Client" },
                { icon: CreditCard, title: "Secure Payment to GrowBro" },
                { icon: ClipboardList, title: "Requirements Collected" },
                { icon: Monitor, title: "Website Creator Builds Website" },
                { icon: UserCheck, title: "Client Reviews & Requests Changes" },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex items-center gap-6">
                  <div className="h-10 w-10 rounded-full bg-surface border border-growbroo-500/30 flex items-center justify-center text-growbroo-500 flex-shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                    <step.icon size={18} />
                  </div>
                  <h5 className="font-bold text-lg text-gray-300">{step.title}</h5>
                </div>
              ))}

              {/* Step 6: GrowBro Verification (Visually Special) */}
              <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pt-4 pb-4">
                <div className="h-14 w-14 -ml-2 rounded-full bg-growbroo-500/10 border-2 border-growbroo-500 flex items-center justify-center text-growbroo-500 flex-shrink-0 shadow-[0_0_30px_rgba(34,197,94,0.4)] sm:mt-6">
                  <ShieldCheck size={28} />
                </div>
                <div className="bg-surface/60 border border-growbroo-500/30 rounded-2xl p-6 w-full shadow-[0_0_30px_rgba(34,197,94,0.08)] relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-growbroo-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <h5 className="font-bold text-2xl text-white mb-6 flex items-center gap-2">
                    GrowBro Verification 
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8 relative z-10">
                    {[
                      "Mobile Responsive",
                      "All Links & Buttons Tested",
                      "Contact Forms Verified",
                      "WhatsApp & Google Maps Checked",
                      "Images Optimized",
                      "Speed Tested",
                      "Spelling & Grammar Reviewed",
                      "Basic SEO Verified",
                      "Final Quality Inspection"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-growbroo-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 bg-growbroo-500/10 border border-growbroo-500 text-growbroo-500 px-5 py-2 rounded-lg font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <BadgeCheck size={18} /> GrowBro Verified
                  </div>
                </div>
              </div>

              {/* Post-Verification Steps */}
              {[
                { icon: Rocket, title: "Final Website Delivery" },
                { icon: PartyPopper, title: "Project Completed" },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex items-center gap-6">
                  <div className="h-10 w-10 rounded-full bg-surface border border-growbroo-500/30 flex items-center justify-center text-growbroo-500 flex-shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                    <step.icon size={18} />
                  </div>
                  <h5 className="font-bold text-lg text-gray-300">{step.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
