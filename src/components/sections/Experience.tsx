import { motion, useInView } from 'framer-motion';
import { useRef, useLayoutEffect } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Software Engineer',
    company: 'HomeIt System',
    location: 'Sri Lanka',
    period: 'Present',
    duration: '~1 year',
    type: 'Full-time',
    description: [
      'Leading DevOps initiatives including CI/CD pipeline development with Jenkins',
      'Managing cloud infrastructure on Hetzner Cloud with Docker containerization',
      'Implementing system monitoring solutions using Checkmk',
      'Linux server administration, domain configuration, and security hardening with Cloudflare',
      'Automating deployment processes with Ansible and Dokploy PaaS',
      'Backend development support with Spring Boot applications',
    ],
    technologies: ['Docker', 'Jenkins', 'Ansible', 'Linux', 'Nginx', 'Cloudflare', 'Checkmk', 'Hetzner Cloud'],
  },
  {
    title: 'Associate Software Engineer (Backend)',
    company: 'CodeLantic (Pvt) Ltd',
    location: 'Sri Lanka',
    period: '2022 - 2023',
    duration: '~1.5 years',
    type: 'Full-time',
    description: [
      'Developed robust backend services using Spring Boot framework',
      'Implemented microservices architecture for scalable applications',
      'Collaborated with cross-functional teams on complex projects',
      'Enhanced problem-solving and collaborative engineering skills',
      'Worked with databases including PostgreSQL and MySQL',
    ],
    technologies: ['Spring Boot', 'Java', 'PostgreSQL', 'MySQL', 'REST APIs', 'Microservices', 'Git'],
  },
  {
    title: 'Intern Software Engineer (Backend)',
    company: 'CodeLantic (Pvt) Ltd',
    location: 'Sri Lanka',
    period: '2021 - 2022',
    duration: '~6 months',
    type: 'Internship',
    description: [
      'Learned and applied Spring Boot framework for backend development',
      'Assisted in building RESTful APIs for web applications',
      'Gained hands-on experience with MongoDB and database operations',
      'Participated in code reviews and agile development processes',
      'Collaborated with senior developers on feature implementations',
    ],
    technologies: ['Spring Boot', 'Java', 'MongoDB', 'REST APIs', 'Git', 'Agile'],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;

    const onLoad = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    window.addEventListener('load', onLoad, { once: true });

    const ctx = gsap.context(() => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>('.experience-card'));

      // IMPORTANT: keep cards visible by default.
      // We animate only on ScrollTrigger enter so there is never a "blank section" on first visit.
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 60, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.85,
                delay: index * 0.08,
                ease: 'power3.out',
                overwrite: 'auto',
              }
            );
          },
          onEnterBack: () => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out',
                overwrite: 'auto',
              }
            );
          },
        });
      });
    }, sectionRef);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, []);

  // Alternating dot colors (theme tokens)
  const getDotColor = (index: number) => (index % 2 === 0 ? 'bg-primary' : 'bg-accent');
  const getBadgeColor = (index: number) =>
    index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent';

  return (
    <section id="experience" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-primary mb-4">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional journey in software development and DevOps.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline vertical line - desktop only, positioned to not overlap content */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-primary/50 -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => (
            <div
              key={exp.company + index}
              className={`experience-card relative mb-12 md:mb-16 pl-8 md:pl-0 ${
                index % 2 === 0 
                  ? 'md:pr-12 md:text-right md:ml-0 md:mr-auto md:w-[calc(50%-20px)]' 
                  : 'md:pl-12 md:ml-auto md:w-[calc(50%-20px)]'
              }`}
            >
              {/* Mobile timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-primary/50 md:hidden" />
              
              {/* Timeline dot - mobile */}
              <div
                className={`absolute top-6 left-0 w-4 h-4 ${getDotColor(index)} rounded-full md:hidden shadow-lg -translate-x-1/2`}
              />

              {/* Timeline dot - desktop */}
              <motion.div
                className={`absolute top-6 w-5 h-5 ${getDotColor(index)} rounded-full hidden md:block shadow-lg z-10`}
                style={{
                  left: index % 2 === 0 ? 'auto' : '-30px',
                  right: index % 2 === 0 ? '-30px' : 'auto',
                }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.4 + index * 0.2, type: 'spring', stiffness: 200 }}
              />

              <div className="glass p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 group">
                <div className={`flex flex-wrap items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  <span className={`px-3 py-1 ${getBadgeColor(index)} rounded-full text-sm font-medium`}>
                    {exp.type}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>

                <div className={`flex flex-wrap items-center gap-4 text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                <ul className={`space-y-2 mb-6 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary mt-1.5">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;