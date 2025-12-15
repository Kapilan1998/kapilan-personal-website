import { motion, useInView } from 'framer-motion';
import { useRef, useLayoutEffect } from 'react';
import { Code2, Server, Cloud, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Building robust microservices with Spring Boot & Java',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Docker, Jenkins, Ansible & cloud-native deployments',
  },
  {
    icon: Code2,
    title: 'System Architecture',
    description: 'Designing scalable, fault-tolerant distributed systems',
  },
  {
    icon: Shield,
    title: 'Security & Reliability',
    description: 'Implementing security hardening & monitoring',
  },
];

const About = () => {
  const ref = useRef(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useLayoutEffect(() => {
    if (!highlightsRef.current) return;
    
    const cards = highlightsRef.current.querySelectorAll('.highlight-card');
    
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: highlightsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-primary mb-4"
              whileHover={{ scale: 1.05 }}
            >
              About Me
            </motion.span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Engineering <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-balance px-4">
              A results-driven Software Engineer specializing in backend systems, 
              DevOps automation, and cloud infrastructure with a passion for building 
              production-grade, enterprise-ready solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Profile Image for About Section */}
              <motion.div 
                className="flex justify-center lg:hidden mb-6"
                variants={floatVariants}
                animate="animate"
              >
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-primary/30 glow-primary">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div 
                className="glass p-6 md:p-8 rounded-2xl"
                whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary) / 0.5)' }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
                  Holding a <span className="text-foreground font-medium">BSc (Hons) in Computer Science & Technology</span> from 
                  Uva Wellassa University, I've cultivated expertise across the full software delivery lifecycle—from 
                  writing clean, maintainable code to orchestrating CI/CD pipelines and managing cloud infrastructure.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  At <span className="text-primary font-medium">HomeIt System</span>, I architect containerized deployments 
                  using Docker, automate infrastructure provisioning with Ansible, and maintain high-availability systems 
                  on Hetzner Cloud. My focus is on operational excellence—ensuring zero-downtime releases, proactive 
                  monitoring with Checkmk, and robust security through Cloudflare integration.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-2 md:gap-3"
                variants={containerVariants}
              >
                {['Problem Solver', 'Team Player', 'Quick Learner', 'Detail Oriented'].map((trait, index) => (
                  <motion.span
                    key={trait}
                    className="px-3 md:px-4 py-2 glass rounded-full text-xs md:text-sm font-medium cursor-default"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: 'hsl(var(--primary) / 0.2)',
                      color: 'hsl(var(--primary))'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <div 
              ref={highlightsRef}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="highlight-card glass p-4 md:p-6 rounded-2xl group hover:border-primary/50 transition-all duration-300 cursor-pointer"
                >
                  <motion.div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </motion.div>
                  <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
