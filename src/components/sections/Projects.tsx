import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Server, Container, Cloud, Database } from 'lucide-react';

const projects = [
  {
    title: 'CI/CD Pipeline Automation',
    description: 'Designed and implemented a comprehensive CI/CD pipeline using Jenkins, Docker, and Ansible for automated builds, testing, and deployments.',
    icon: Container,
    technologies: ['Jenkins', 'Docker', 'Ansible', 'Shell Scripting'],
    category: 'DevOps',
    color: 'primary',
  },
  {
    title: 'Microservices Backend System',
    description: 'Developed a scalable microservices architecture using Spring Boot with REST APIs, service discovery, and centralized configuration.',
    icon: Server,
    technologies: ['Spring Boot', 'Java', 'PostgreSQL', 'REST API'],
    category: 'Backend',
    color: 'accent',
  },
  {
    title: 'Cloud Infrastructure Setup',
    description: 'Set up and managed cloud infrastructure on Hetzner Cloud with Docker containers, reverse proxy configuration, and SSL certificates.',
    icon: Cloud,
    technologies: ['Hetzner Cloud', 'Nginx', 'Docker', 'Cloudflare'],
    category: 'Cloud',
    color: 'primary',
  },
  {
    title: 'System Monitoring Dashboard',
    description: 'Implemented comprehensive system monitoring using Checkmk with custom alerts, performance metrics, and health checks.',
    icon: Database,
    technologies: ['Checkmk', 'Linux', 'Shell Scripting', 'Monitoring'],
    category: 'DevOps',
    color: 'accent',
  },
];

const Projects = () => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Custom IntersectionObserver for better mobile support
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: '0px 0px -50px 0px', // Adjust for better mobile
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="pt-24 pb-12 md:pt-32 md:pb-16 relative" ref={ref}>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-primary mb-4">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in backend development, 
            DevOps practices, and cloud infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: "easeOut"
                }
              } : {}}
              // Add viewport animation for mobile as fallback
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: index * 0.1,
                  duration: 0.5 
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="project-card group glass p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                project.color === 'primary' ? 'bg-gradient-to-br from-primary/5 to-transparent' : 'bg-gradient-to-br from-accent/5 to-transparent'
              }`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      project.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                    }`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    whileInView={{ 
                      rotate: [0, 10, -10, 0],
                      transition: { 
                        delay: 0.3,
                        duration: 0.8 
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    <project.icon className={`w-7 h-7 ${
                      project.color === 'primary' ? 'text-primary' : 'text-accent'
                    }`} />
                  </motion.div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                  }`}>
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          delay: index * 0.15 + techIndex * 0.05 + 0.3 
                        }
                      } : {}}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          delay: techIndex * 0.05 
                        }
                      }}
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { 
                      opacity: 1,
                      transition: { delay: index * 0.15 + 0.4 }
                    } : {}}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </motion.a>
                  <motion.a
                    href="#"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { 
                      opacity: 1,
                      transition: { delay: index * 0.15 + 0.5 }
                    } : {}}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">
            More projects coming soon...
          </p>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
            whileHover={{ x: 5 }}
          >
            View all on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;