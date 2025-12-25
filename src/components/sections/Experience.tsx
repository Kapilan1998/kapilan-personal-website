import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "HomeIt System",
    location: "Sri Lanka",
    period: "Present",
    duration: "~1 year",
    type: "Full-time",
    dotColor: "bg-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-500",
    // Purple border for green dot
    borderClass: "border border-emerald-500/20 group-hover:border-purple-500/50",
    // Purple glow for green dot
    glowClass: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    // Purple text for green dot
    textColor: "group-hover:text-purple-500",
    description: [
      "Leading DevOps initiatives including CI/CD pipeline development with Jenkins",
      "Managing cloud infrastructure on Hetzner Cloud with Docker containerization",
      "Implementing system monitoring solutions using Checkmk",
      "Linux server administration, domain configuration, and security hardening with Cloudflare",
      "Automating deployment processes with Ansible and Dokploy PaaS",
      "Backend development support with Spring Boot applications",
    ],
    technologies: [
      "Docker",
      "Jenkins",
      "Ansible",
      "Linux",
      "Nginx",
      "Cloudflare",
      "Checkmk",
      "Hetzner Cloud",
    ],
  },
  {
    title: "Associate Software Engineer (Backend)",
    company: "CodeLantic (Pvt) Ltd",
    location: "Sri Lanka",
    period: "2022 - 2023",
    duration: "~1.5 years",
    type: "Full-time",
    dotColor: "bg-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-500",
    // Green border for purple dot
    borderClass: "border border-violet-500/20 group-hover:border-emerald-500/50",
    // Green glow for purple dot
    glowClass: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    // Green text for purple dot
    textColor: "group-hover:text-emerald-500",
    description: [
      "Developed robust backend services using Spring Boot framework",
      "Implemented microservices architecture for scalable applications",
      "Collaborated with cross-functional teams on complex projects",
      "Enhanced problem-solving and collaborative engineering skills",
      "Worked with databases including PostgreSQL and MySQL",
    ],
    technologies: [
      "Spring Boot",
      "Java",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "Microservices",
      "Git",
    ],
  },
  {
    title: "Intern Software Engineer (Backend)",
    company: "CodeLantic (Pvt) Ltd",
    location: "Sri Lanka",
    period: "2021 - 2022",
    duration: "~6 months",
    type: "Internship",
    dotColor: "bg-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-500",
    // Purple border for green dot
    borderClass: "border border-emerald-500/20 group-hover:border-purple-500/50",
    // Purple glow for green dot
    glowClass: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    // Purple text for green dot
    textColor: "group-hover:text-purple-500",
    description: [
      "Learned and applied Spring Boot framework for backend development",
      "Assisted in building RESTful APIs for web applications",
      "Gained hands-on experience with MongoDB and database operations",
      "Participated in code reviews and agile development processes",
      "Collaborated with senior developers on feature implementations",
    ],
    technologies: [
      "Spring Boot",
      "Java",
      "MongoDB",
      "REST APIs",
      "Git",
      "Agile",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-xs sm:text-sm font-mono text-primary mb-3 sm:mb-4">
            Career Journey
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4">
            A timeline of my professional journey in software development and
            DevOps.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line - hidden on mobile, visible on desktop */}
          <div className="absolute left-0 md:left-1/2 top-8 bottom-0 w-px bg-border md:-translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => (
            <div key={exp.company} className="relative mb-4 sm:mb-6 md:mb-8 last:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative ${
                  index % 2 === 0
                    ? "md:pr-6 md:text-right md:ml-0 md:mr-auto md:w-1/2"
                    : "md:pl-6 md:ml-auto md:w-1/2"
                }`}
              >
                {/* Timeline dot with unique color - hidden on mobile, visible on desktop */}
                <motion.div
                  className={`absolute top-3 sm:top-4 md:top-5 left-0 md:left-auto md:right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${exp.dotColor} rounded-full hidden md:block shadow-md sm:shadow-lg`}
                  style={{
                    [index % 2 === 0 ? "right" : "left"]: "-8px",
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                />

                {/* Card with proper border and glow animation */}
                <div className={`glass p-4 sm:p-5 md:p-6 rounded-xl transition-all duration-500 group ${exp.borderClass} ${exp.glowClass} hover:scale-[1.02]`}>
                  
                  {/* Animated gradient border overlay */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: exp.dotColor.includes('emerald') 
                        ? 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' // Purple gradient for green dots
                        : 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)' // Green gradient for purple dots
                    }}
                    animate={{
                      backgroundPosition: ['200% 0%', '-200% 0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <div
                    className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-3 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 ${exp.badgeColor} rounded-full text-xs sm:text-sm font-medium border border-current/20`}
                    >
                      {exp.type}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Title with hover color change */}
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 transition-colors duration-500 ${exp.textColor}`}>
                    {exp.title}
                  </h3>

                  <div
                    className={`flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center gap-1.5 sm:gap-2 md:gap-3 text-muted-foreground mb-3 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="flex items-center gap-1 text-xs sm:text-sm">
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{exp.company}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      {exp.location}
                    </span>
                  </div>

                  <ul
                    className={`space-y-1.5 sm:space-y-2 mb-4 ${
                      index % 2 === 0 ? "md:text-left" : ""
                    }`}
                  >
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-xs sm:text-sm flex items-start gap-2 group/li"
                      >
                        <span className={`mt-1 sm:mt-1.5 flex-shrink-0 transition-colors duration-500 ${exp.textColor.replace('group-hover:', 'group-hover/li:')}`}>
                          ▸
                        </span>
                        <span className={`transition-colors duration-500 ${exp.textColor.replace('group-hover:', 'group-hover/li:')}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology tags with better visibility */}
                  <div
                    className={`flex flex-wrap gap-1.5 sm:gap-2 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-secondary/80 dark:bg-secondary text-secondary-foreground dark:text-secondary-foreground rounded-full text-xs font-medium border border-border dark:border-secondary-foreground/20 group-hover/tech:bg-primary/10 group-hover/tech:text-primary group-hover/tech:border-primary/30 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Horizontal line after each card (except the last one) */}
              {index !== experiences.length - 1 && (
                <div className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;