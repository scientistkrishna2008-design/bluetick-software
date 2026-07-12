import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useNavigate } from "react-router";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter">Growbroo<span className="text-growbroo-500">.</span></div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/login')} variant="ghost" className="text-gray-300">Sign In</Button>
            <Button onClick={() => navigate('/join')} variant="premium">Join Us</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden flex-grow flex items-center">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-sm mb-8 text-growbroo-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-growbroo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-growbroo-500"></span>
              </span>
              Premium Software Agency
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
              We build <span className="text-gradient">premium</span><br />
              SaaS platforms.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Growbroo designs and develops world-class digital experiences for modern startups.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="premium" className="gap-2" onClick={() => navigate('/join')}>
                Join Growbroo <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                View Portfolio
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-surface/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Our Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Showcasing our recent premium SaaS implementations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-surface border border-border"
              >
                <div className="aspect-video bg-surface-hover w-full overflow-hidden">
                  {/* Placeholder for project image */}
                  <div className="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center text-gray-500 group-hover:scale-105 transition-transform duration-500">
                    Project Preview
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Project Name {item}</h3>
                  <p className="text-sm text-gray-400 mb-4">Fintech SaaS Platform</p>
                  <Button variant="ghost" className="p-0 text-growbroo-500 hover:text-growbroo-400 hover:bg-transparent">
                    View Live <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Why top startups choose us.</h2>
              <p className="text-gray-400 mb-8 text-lg">We don't just write code. We craft experiences that drive growth, retention, and delight.</p>
              
              <div className="space-y-6">
                {['Premium Architecture', 'Glassmorphism UI/UX', 'Framer Motion Animations', 'Enterprise Security'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-growbroo-500/10 flex items-center justify-center text-growbroo-500">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-lg font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-surface/50 border-none p-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </Card>
              <Card className="bg-surface/50 border-none p-6 text-center translate-y-8">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </Card>
              <Card className="bg-surface/50 border-none p-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </Card>
              <Card className="bg-growbroo-500/10 border-growbroo-500/20 p-6 text-center translate-y-8">
                <div className="text-4xl font-bold text-growbroo-500 mb-2">99%</div>
                <div className="text-sm text-growbroo-400">Uptime</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-growbroo-600/10" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to start?</h2>
          <Button size="lg" variant="premium" onClick={() => navigate('/join')}>
            Fill Out the Form to Continue
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12 px-6 text-center">
        <div className="text-2xl font-bold tracking-tighter mb-4 text-gray-400">Growbroo<span className="text-growbroo-500">.</span></div>
        <p className="text-sm text-gray-600 mb-8">© 2026 Growbroo. All rights reserved.</p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </footer>
    </div>
  );
}
