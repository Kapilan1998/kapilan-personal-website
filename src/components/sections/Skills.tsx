import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  // Languages
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', url: 'https://www.java.com', category: 'Languages' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://www.python.org', category: 'Languages' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', category: 'Languages' },
  // { name: 'Php', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', url: 'https://www.php.net/docs.php', category: 'Languages' },
  
  // Backend
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', url: 'https://spring.io/projects/spring-boot', category: 'Backend' },
  { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', url: 'https://flask.palletsprojects.com/', category: 'Backend' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', url: 'https://nodejs.org', category: 'Backend' },
 
  // DevOps
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', url: 'https://www.linux.org', category: 'DevOps' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', url: 'https://www.docker.com', category: 'DevOps' },
  { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', url: 'https://www.jenkins.io', category: 'DevOps' },
  { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', url: 'https://nginx.org', category: 'DevOps' },
  { name: 'Ansible', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg', url: 'https://www.ansible.com', category: 'DevOps' },
  { name: 'Cloudflare', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg', url: 'https://www.cloudflare.com', category: 'DevOps' },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', url: 'https://kubernetes.io', category: 'DevOps' },
  { name: 'Prometheus', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg', url: 'https://prometheus.io', category: 'DevOps' },
  { name: 'Grafana', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg', url: 'https://grafana.com', category: 'DevOps' },
  { name: 'Checkmk', icon: 'checkmk.png', url: 'https://checkmk.com/', category: 'DevOps' },
  { name: 'Proxmox VE', icon: 'proxmox.png', url: 'https://proxmox.com/en/', category: 'DevOps' },
  { name: 'Dokploy', icon: 'dokploy.png', url: 'https://dokploy.com/', category: 'DevOps' },
  
  // Cloud
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', url: 'https://aws.amazon.com', category: 'Cloud' },
  { name: 'Hetzner Cloud', icon: 'hetzner.png', url: 'https://www.hetzner.com/cloud', category: 'Cloud' },
  // Databases
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: 'https://www.postgresql.org', category: 'Databases' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', url: 'https://www.mysql.com', category: 'Databases' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', url: 'https://www.mongodb.com', category: 'Databases' },
  // Tools
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', url: 'https://git-scm.com', category: 'Tools' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', url: 'https://postman.com', category: 'Tools' },
  { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', url: 'https://www.atlassian.com/software/jira', category: 'Tools' },
  { name: 'SonarQube', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg', url: 'https://www.sonarsource.com/products/sonarqube/', category: 'Tools' },
  { name: 'Streamlit', icon: 'streamlit.png', url: 'https://streamlit.io/cloud', category: 'Tools' },
  // Frontend
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', url: 'https://react.dev', category: 'Frontend' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', url: 'https://getbootstrap.com', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', url: 'https://tailwindcss.com', category: 'Frontend' }
];

const categoryConfig: Record<string, { title: string; gradient: string; iconColor: string }> = {
  Languages: { title: 'Languages', gradient: 'from-orange-500/20 to-yellow-500/20', iconColor: 'text-orange-400' },
  Backend: { title: 'Back-End', gradient: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-400' },
  DevOps: { title: 'DevOps & Infrastructure', gradient: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
  Cloud: { title: 'Cloud', gradient: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-400' },
  Databases: { title: 'Databases', gradient: 'from-cyan-500/20 to-blue-500/20', iconColor: 'text-cyan-400' },
  Tools: { title: 'Tech & Tools', gradient: 'from-red-500/20 to-orange-500/20', iconColor: 'text-red-400' },
  Frontend: { title: 'Front-End', gradient: 'from-cyan-500/20 to-purple-500/20', iconColor: 'text-cyan-400' },
};

const orderedCategories = ['Languages', 'Backend', 'Frontend', 'Cloud', 'Databases', 'Tools', 'DevOps'];

const FloatingParticles = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if window is available and screen is large enough
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
          rotateX: 10,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.05,
        }
      );
    });

    // Clean up triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isInView]);

  const renderCategoryCard = (category: string, categoryIndex: number) => {
    const categoryTechs = technologies.filter((tech) => tech.category === category);
    if (categoryTechs.length === 0) return null;
    const config = categoryConfig[category];

    const getGridCols = () => {
      if (category === 'DevOps') {
        return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6';
      }
      return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5';
    };

    return (
      <div
        key={category}
        ref={(el) => (cardsRef.current[categoryIndex] = el)}
        className={`space-y-4 ${category === 'DevOps' ? 'lg:col-span-2' : ''}`}
        style={{ perspective: '1200px' }}
      >
        <motion.h3
          className="text-lg md:text-xl font-bold flex items-center gap-2 justify-center lg:justify-start"
          whileHover={{ x: 5 }}
        >
          <span className={config.iconColor}>●</span>
          {config.title}
        </motion.h3>
        <motion.div
          className={`glass rounded-2xl p-4 md:p-6 bg-gradient-to-b ${config.gradient} relative overflow-hidden group flex flex-col items-center justify-center will-change-transform`}
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{
            scale: 1.01,
            boxShadow: '0 15px 30px -15px hsl(var(--primary)/0.2)',
            rotateX: 2, // small rotation on X-axis for card
            rotateY: 2, // small rotation on Y-axis for card
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Subtle animated border - Disabled on mobile for performance */}
          <div className="hidden lg:block">
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary)/0.2), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className={`grid ${getGridCols()} gap-3 md:gap-4 relative z-10 w-full`}>
            {categoryTechs.map((tech) => (
              <motion.a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 group/item cursor-pointer p-2 md:p-3 rounded-xl hover:bg-background/40 transition-all duration-300 relative text-center"
                whileHover={{ 
                  scale: 1.1, 
                  y: -5, 
                  zIndex: 10,
                  rotateY: 8, // small rotation on Y-axis for tech items
                  rotateX: 5, // small rotation on X-axis for tech items
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-10 h-10 md:w-14 md:h-14 relative flex items-center justify-center"
                  style={{ transform: 'translateZ(0)' }} 
                  whileHover={{
                    rotateZ: [0, -3, 3, -3, 0], 
                  }}
                  transition={{ duration: 0.5 }}
                >

                  {/* enlarging the icon for better visibility */}
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    loading="lazy"
                    className={`w-full h-full object-contain filter drop-shadow-md ${
                      tech.name === 'Checkmk' ? 'scale-[3.5]' :
                      tech.name === 'Hetzner Cloud' ? 'scale-[1.8]' :
                      tech.name === 'Streamlit' ? 'scale-[4.0]' :
                      tech.name === 'Dokploy' ? 'scale-[2.5]' : ''
                    }`}
                  />

                  {/* Glow effect - only on large screens */}
                  <div className="hidden lg:block absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10" />
                </motion.div>
                
                <motion.span 
                  className="font-medium text-[10px] sm:text-xs md:text-sm text-center text-foreground/80 group-hover/item:text-primary transition-colors whitespace-nowrap px-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech.name}
                </motion.span>

                <div className="absolute top-0 right-0 opacity-0 group-hover/item:opacity-100 transition-opacity hidden sm:block">
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-16 md:py-16 lg:py-8 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <FloatingParticles />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-mono text-primary mb-4">
            Technical Skills
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tools & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            A comprehensive toolkit spanning backend development, DevOps practices, and cloud technologies.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {orderedCategories
              .filter(category => ['Languages', 'Backend', 'Frontend', 'Cloud'].includes(category))
              .map((category, index) => renderCategoryCard(category, index))}
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {orderedCategories
              .filter(category => ['Databases', 'Tools'].includes(category))
              .map((category, index) => renderCategoryCard(category, index + 4))}
          </div>

          {orderedCategories
            .filter(category => category === 'DevOps')
            .map((category, index) => renderCategoryCard(category, index + 6))}
        </div>
      </div>
    </section>
  );
};

export default Skills;