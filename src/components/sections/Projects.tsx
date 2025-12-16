import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Server, Container, Cloud, Database, ChevronLeft, ChevronRight } from 'lucide-react';

// Extend the projects array with more example projects
const allProjects = [
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
  {
    title: 'E-commerce Backend API',
    description: 'Built a robust e-commerce backend with payment integration, inventory management, and order processing system.',
    icon: Server,
    technologies: ['Node.js', 'Express', 'MongoDB', 'Stripe API'],
    category: 'Backend',
    color: 'primary',
  },
  {
    title: 'Kubernetes Cluster Management',
    description: 'Deployed and managed Kubernetes clusters for container orchestration with auto-scaling and load balancing.',
    icon: Container,
    technologies: ['Kubernetes', 'Helm', 'AWS EKS', 'Prometheus'],
    category: 'DevOps',
    color: 'accent',
  },
  {
    title: 'Real-time Chat Application',
    description: 'Developed a real-time chat application with WebSocket connections, user authentication, and message persistence.',
    icon: Database,
    technologies: ['Socket.io', 'React', 'Node.js', 'Redis'],
    category: 'Backend',
    color: 'primary',
  },
  {
    title: 'AWS Serverless Architecture',
    description: 'Implemented serverless architecture using AWS Lambda, API Gateway, and DynamoDB for scalable applications.',
    icon: Cloud,
    technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'CloudFormation'],
    category: 'Cloud',
    color: 'accent',
  },
  {
    title: 'Data Analytics Pipeline',
    description: 'Created a data pipeline for processing and analyzing large datasets using Apache Spark and Airflow.',
    icon: Database,
    technologies: ['Apache Spark', 'Airflow', 'Python', 'PostgreSQL'],
    category: 'Backend',
    color: 'primary',
  },
  {
    title: 'Mobile App Backend',
    description: 'Developed RESTful APIs for a mobile application with push notifications and real-time updates.',
    icon: Server,
    technologies: ['FastAPI', 'PostgreSQL', 'Firebase', 'Docker'],
    category: 'Backend',
    color: 'accent',
  },
];

const Projects = () => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  // Calculate pagination
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);

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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
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

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle direct page click
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {currentProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${currentPage}`}
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

        {/* Pagination Controls */}
        {allProjects.length > projectsPerPage && (
          <motion.div 
            className="flex flex-col items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Page Info */}
            <div className="text-sm text-muted-foreground mb-2">
              Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, allProjects.length)} of {allProjects.length} projects
            </div>
            
            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <motion.button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 1 
                    ? 'bg-secondary text-muted-foreground cursor-not-allowed' 
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === totalPages 
                    ? 'bg-secondary text-muted-foreground cursor-not-allowed' 
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Page Indicator Dots (mobile friendly) */}
            <div className="flex items-center gap-2 mt-2 md:hidden">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={`dot-${page}`}
                  onClick={() => handlePageClick(page)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === page
                      ? 'bg-primary w-4'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* GitHub Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">
            Want to see more? Check out my complete portfolio on GitHub.
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