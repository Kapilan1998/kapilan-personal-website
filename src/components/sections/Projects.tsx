import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, GitBranch, MessageSquareMore, Sparkles, Trophy, ChevronLeft, ChevronRight, Receipt, Webhook, Shield, ShoppingCart, Database, FileCheck, BookOpen } from 'lucide-react';

// Extend the projects array with more example projects
const allProjects = [
  {
    title: 'Ansible GitHub CI/CD Automation',
    description: 'End to end DevOps automation using Ansible to create Java application, generate GitHub repo, push code, create Jenkins job, trigger pipeline, integrate SonarQube analysis, and display results.All automated via Ansible playbooks.',
    icon: GitBranch,
    technologies: ['Ansible', 'Jenkins', 'SonarQube', 'Java', 'Docker'],
    category: 'DevOps',
    color: 'primary',
    githubUrl: 'https://github.com/Kapilan1998/ansible-github-automation',
    liveDemoUrl: '',
    documentationUrl: ''
  },
  {
    title: 'Chat Application using DragonFlyDB',
    description: 'Real time chat application built with Spring Boot and WebSocket, utilizing DragonFlyDB for Redis compatible message storage. Features a fully automated Jenkins CI/CD pipeline with Docker builds, SonarQube code analysis and automated deployment to Docker Hub.',
    icon: MessageSquareMore,
    technologies: ['Spring Boot', 'WebSocket', 'Redis', 'Docker', 'Jenkins', 'SonarQube', 'Webhook'],
    category: 'Backend, Devops',
    color: 'accent',
    githubUrl: 'https://github.com/Kapilan1998/Chat-Application-using-DragonFlyDB',
    liveDemoUrl: '',
    documentationUrl: ''
  },
  {
    title: 'Spring Boot AI Assistant with Ollama Integration',
    description: 'AI based Spring Boot application using Ollama to run local AI models (DeepSeek), delivering real time streaming responses via Flux for progressive output display. Integrated with automated security pipeline using Jenkins scheduled jobs and Dependency Track for SBOM analysis and vulnerability monitoring.',
    icon: Sparkles,
    technologies: ['Spring Boot', 'Ollama', 'Flux API', 'Jenkins', 'Dependency Tracker', 'SBOM Analysis', 'Docker'],
    category: 'Backend, Devops',
    color: 'primary',
    githubUrl: 'https://github.com/Kapilan1998/spring-boot-with-deep-seek',
    liveDemoUrl: '',
    documentationUrl: 'https://medium.com/@sriranjankapilan/run-local-ai-models-in-spring-boot-using-ollama-512e6a555494'
  },
  {
    title: 'Asia Cup 2025 Cricket Statistics Dashboard',
    description: 'Real time sports analytics dashboard visualizing Asia Cup 2025 cricket data with interactive charts (bar, pie, scatter plots), team filtering and performance metrics using Streamlit for web interface and Plotly for visualizations.',
    icon: Trophy,
    technologies: ['Streamlit', 'Plotly', 'Pandas', 'Python', 'NumPy', 'HTML/CSS'],
    category: 'Full Stack',
    color: 'accent',
    githubUrl: 'https://github.com/Kapilan1998/asia-cup-2025-python-dashboard',
    liveDemoUrl: 'https://asia-cup-2025-python-dashboard.streamlit.app/',
    documentationUrl: 'https://medium.com/@sriranjankapilan/interactive-cricket-analytics-building-the-asia-cup-2025-dashboard-with-python-streamlit-plotly-4aba1d02e04f'
  },
  {
    title: 'Secure Role Based Authentication with Next.js & Clerk',
    description: 'Full stack authentication system implementing role based access control with Clerk. Features social login integration, middleware-protected routes for admin/moderator roles, TypeScript type safety and comprehensive user session management.',
    icon: Shield,
    technologies: ['Next.js', 'Clerk Authentication', 'TypeScript', 'Tailwind CSS'],
    category: 'Frontend',
    color: 'primary',
    githubUrl: 'https://github.com/Kapilan1998/nextjs-role-based-auth-clerk',
    liveDemoUrl: 'https://nextjs-auth-clerk.netlify.app/',
    documentationUrl: 'https://medium.com/@sriranjankapilan/building-a-secure-next-js-app-with-clerk-auth-social-login-and-role-management-26c11d3f3cdb'
  },
  {
    title: 'E-Commerce Shopping Cart Backend System',
    description: 'RESTful API backend for an E-commerce shopping cart system, featuring Spring Security JWT authentication, shopping cart functionality, order management, product categorization, image uploads and role based access control for secure operations.',
    icon: ShoppingCart,
    technologies: ['Spring Boot', 'JWT Authentication', 'MySQL'],
    category: 'Backend',
    color: 'accent',
    githubUrl: 'https://github.com/Kapilan1998/simple-shopping-card-project',
    liveDemoUrl: '',
    documentationUrl: ''
  },
  {
    title: 'Real Time Tic-Tac-Toe Game with WebSocket',
    description: 'Full stack multiplayer Tic-Tac-Toe game with real time WebSocket communication, MySQL database storage, player management and game result tracking. Features live game updates, player matchmaking and historical result viewing.',
    icon: Webhook,
    technologies: ['Spring Boot', 'WebSocket', 'Thymeleaf', 'MySQL', 'STOMP', 'JavaScript', 'HTML/CSS'],
    category: 'Full Stack',
    color: 'primary',
    githubUrl: 'https://github.com/Kapilan1998/tic-tac-toe-application/tree/develop/final',
    liveDemoUrl: '',
    documentationUrl: ''
  },
  {
    title: 'AI Powered Resume Analyzer with NLP',
    description: 'End to end NLP pipeline for resume analysis. Text extraction from PDF/DOCX, skill recognition with spaCy, semantic matching using TF-IDF and cosine similarity and ATS score computation with interactive Plotly visualizations.',
    icon: FileCheck,
    technologies: ['Python', 'spaCy', 'Scikit learn', 'Streamlit', 'NLP', 'Machine Learning'],
    category: 'Full Stack, Machine Learning',
    color: 'accent',
    githubUrl: 'https://github.com/Kapilan1998/Resume-Analyser',
    liveDemoUrl: '',
    documentationUrl: ''
  },
  {
    title: 'Smart Expense Tracker',
    description: 'Production ready Flask Full stack application implementing secure authentication with Flask Login, database management via Flask SQLAlchemy ORM and security features with Werkzeug. Features expense tracking, category management, and analytics dashboard.',
    icon: Receipt,
    technologies: ['Flask', 'Python', 'SQLite', 'Bootstrap', 'Flask Login', 'Flask SQLAlchemy', 'Werkzeug'],
    category: 'Full Stack',
    color: 'primary',
    githubUrl: 'https://github.com/Kapilan1998/Flask-smart-expense-tracker',
    liveDemoUrl: '',
    documentationUrl: ''
  },
  {
    title: 'Spring Batch Data Processing System',
    description: 'Automated CSV to MySQL data processing with Spring Batch, scheduled execution, REST triggers and batch job tracking for efficient data ingestion.',
    icon: Database,
    technologies: ['Spring Batch', 'Spring Scheduler', 'MySQL', 'REST API'],
    category: 'Backend',
    color: 'accent',
    githubUrl: 'https://github.com/Kapilan1998/spring-batch-csv-to-mysql-scheduler',
    liveDemoUrl: '',
    documentationUrl: 'https://medium.com/@sriranjankapilan/automating-csv-to-mysql-data-pipelines-with-spring-batch-and-spring-scheduler-1ef43f4969e3'
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
              className="highlight-card project-card group glass p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${project.color === 'primary' ? 'bg-gradient-to-br from-primary/5 to-transparent' : 'bg-gradient-to-br from-accent/5 to-transparent'
                }`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${project.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
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
                    <project.icon className={`w-7 h-7 ${project.color === 'primary' ? 'text-primary' : 'text-accent'
                      }`} />
                  </motion.div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
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

                <div className="flex gap-4 flex-wrap">
                  {/* View Code Button - Only show if githubUrl exists */}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
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
                  )}

                  {/* Live Demo Button - Only show if liveDemoUrl exists */}
                  {project.liveDemoUrl && (
                    <motion.a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  )}

                  {/* Documentation Button - Only show if documentationUrl exists */}
                  {project.documentationUrl && (
                    <motion.a
                      href={project.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0 }}
                      animate={isInView ? {
                        opacity: 1,
                        transition: { delay: index * 0.15 + 0.6 }
                      } : {}}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <BookOpen className="w-4 h-4" />
                      Documentation
                    </motion.a>
                  )}
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentPage === 1
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
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${currentPage === page
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentPage === totalPages
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
                  className={`w-2 h-2 rounded-full transition-all ${currentPage === page
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
            href="https://github.com/Kapilan1998"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
            whileHover={{ x: 5 }}
          >
            View all on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;