import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "../ui/Button";

interface ScrollingPreviewProps {
  name: string;
  url: string;
  index: number;
}

export function ScrollingPreview({ name, url, index }: ScrollingPreviewProps) {
  // Use Microlink for full-page screenshot (handles SPAs and Vercel sites better)
  const screenshotUrl = `https://api.microlink.io/?url=${url}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl bg-surface border border-border overflow-hidden h-full"
    >
      {/* Browser / Laptop Mockup Frame */}
      <div className="bg-surface-hover border-b border-border px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto bg-background/50 rounded-md px-3 py-1 text-xs text-gray-500 font-mono w-2/3 text-center truncate">
          {url.replace(/^https?:\/\//, '')}
        </div>
      </div>

      {/* The scrolling window */}
      <div className="relative w-full h-[300px] overflow-hidden bg-background group-hover:shadow-[inset_0_0_20px_rgba(34,197,94,0.1)] transition-shadow">
        {/* We use an img that translates up on hover */}
        <div className="absolute inset-x-0 top-0 w-full transition-transform duration-[10s] ease-linear group-hover:-translate-y-[calc(100%-300px)]">
          <img 
            src={screenshotUrl} 
            alt={`Preview of ${name}`}
            className="w-full object-cover origin-top"
            loading="lazy"
            onError={(e) => {
              // Fallback if screenshot fails
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
            }}
          />
        </div>
        
        {/* Overlay instruction */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Button variant="premium" className="pointer-events-auto gap-2" onClick={() => window.open(url, '_blank')}>
              Visit Website <ExternalLink size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-sm text-gray-400 mb-4">Premium SaaS Platform</p>
        </div>
        <Button variant="ghost" className="p-0 text-growbroo-500 hover:text-growbroo-400 hover:bg-transparent self-start" onClick={() => window.open(url, '_blank')}>
          View Live <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
