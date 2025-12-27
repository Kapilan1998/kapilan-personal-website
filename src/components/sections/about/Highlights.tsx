import { motion } from 'framer-motion';
import { Server, Cloud, Database, Workflow } from 'lucide-react';
import { useRef } from 'react';

const highlights = [
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Building robust Spring Boot microservices with Java, implementing REST APIs, JWT security, and database integrations with MySQL/MongoDB',
    gradient: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Orchestrating containerized deployments with Docker, automating CI/CD pipelines using Jenkins, and managing cloud infrastructure on Hetzner',
    gradient: 'from-purple-500/10 to-pink-500/10'
  },
  {
    icon: Database,
    title: 'System Architecture',
    description: 'Designing scalable distributed systems, implementing microservices patterns, and ensuring high availability with load balancing and failover strategies',
    gradient: 'from-green-500/10 to-emerald-500/10'
  },
  {
    icon: Workflow,
    title: 'Automation & Monitoring',
    description: 'Creating Infrastructure as Code with Ansible, implementing comprehensive monitoring with Checkmk, and automating routine tasks with scheduled jobs',
    gradient: 'from-orange-500/10 to-red-500/10'
  },
];

interface HighlightsProps {
  isInView: boolean;
}

const Highlights = ({ isInView }: HighlightsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-2 gap-4 md:gap-6"
    >
      {highlights.map((item, index) => (
        <motion.div
          key={item.title}
          className="highlight-card border border-gray-300/40 glass p-5 md:p-6 rounded-2xl group hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col relative overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: index * 0.15,
            ease: 'easeOut'
          }}
          whileHover={{ 
            y: -5,
            borderColor: 'rgb(var(--primary) / 0.5)',
            transition: { duration: 0.2 }
          }}
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          <div className="relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <h4 className="font-bold mb-2 md:mb-3 text-base md:text-lg group-hover:text-primary transition-colors">
              {item.title}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Highlights;