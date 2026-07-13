import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "../ui/Button";

interface PortfolioCardProps {
  name: string;
  url: string;
  imageUrl: string;
  index: number;
}

export function PortfolioCard({ name, url, imageUrl, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl bg-surface border border-border overflow-hidden h-full"
    >
      {/* Static Image Preview */}
      <div className="relative w-full aspect-video overflow-hidden bg-surface-hover">
        <img 
          src={imageUrl} 
          alt={`Preview of ${name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
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
