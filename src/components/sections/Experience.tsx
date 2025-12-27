import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "HomeIt System",
    location: "Jaffna, Sri Lanka",
    period: "Jan 2025 - Present",
    type: "Full-time",
    dotColor: "bg-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    // Text color change based on dot - green dot → purple text
    textColor: "group-hover:text-purple-500",
    description: [
      "Developed Spring Boot APIs with Java 21 for secure data storage using RSA encryption to Hetzner Cloud S3",
      "Currently focusing on DevOps: Linux administration, Docker containerization, Jenkins CI/CD pipelines",
      "Automated infrastructure management using Ansible for Proxmox VMs/LXC containers and Hetzner Cloud servers",
      "Deployed applications from local development to production using Dokploy platform as a service",
      "Configured and managed domains/subdomains with Nginx, Cloudflare and HAProxy via pfSense",
      "Implemented monitoring solutions with Checkmk for VM/server health monitoring and email alerting",
      "Deployed Matomo analytics for user tracking for websites",
      "Configured mailbox servers",
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
      "Proxmox",
      "PostgreSQL",
      "Spring Boot",
    ],
  },
  {
    title: "Associate Software Engineer (Backend)",
    company: "CodeLantic (Pvt) Ltd",
    location: "Colombo, Sri Lanka",
    period: "Oct 2023 - Jan 2025",
    type: "Full-time",
    dotColor: "bg-violet-500",
    badgeColor: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    // Text color change based on dot - purple dot → green text
    textColor: "group-hover:text-emerald-500",
    description: [
      "Developed Spring Boot microservices using Java 17, implemented REST APIs with inter service communication via Feign Client and API Gateway",
      "Implemented database connectivity with MySQL and MongoDB for different service requirements",
      "Built secure APIs with Spring Security and file handling features (Excel/PDF reports, bulk ZIP downloads) and designed PDF reports using Jaspersoft Studio",
      "Implemented file upload/download functionality to AWS S3 for multimedia content management",
      "Wrote comprehensive unit tests using JUnit5 and participated in code reviews and agile processes",
      "Designed database entities based on ER diagrams",
      "Ensured code quality and followed best practices in microservices development",
    ],
    technologies: [
      "Spring Boot",
      "Java",
      "MySQL",
      "MongoDB",
      "REST APIs",
      "Microservices",
      "AWS S3",
      "JUnit5",
      "Jaspersoft",
    ],
  },
  {
    title: "Intern Software Engineer (Backend)",
    company: "CodeLantic (Pvt) Ltd",
    location: "Colombo, Sri Lanka",
    period: "Mar 2023 - Sep 2023",
    type: "Internship",
    dotColor: "bg-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    // Text color change based on dot - green dot → purple text
    textColor: "group-hover:text-purple-500",
    description: [
      "Developed REST APIs using Spring Boot and Java 8 for fintech domain application",
      "Wrote unit test cases with JUnit5 and implemented database migrations using Flyway",
      "Collaborated with senior developers on feature implementation and code reviews",
      "Created Selenium automation scripts for web application testing and validation",
      "Ensured code quality compliance through SonarQube analysis and best practices",
      "Participated in agile development processes and sprint planning sessions",
      "Gained hands-on experience with modern backend development workflows and tools",
    ],
    technologies: [
      "Spring Boot",
      "Java 8",
      "REST APIs",
      "JUnit5",
      "Flyway",
      "Selenium",
      "SonarQube",
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
            A timeline of my professional journey in software development and DevOps.
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
                className={`relative ${index % 2 === 0
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

                {/* Card with consistent gray border */}
                <div className={`highlight-card p-4 sm:p-5 md:p-6 rounded-xl transition-all duration-300 group border-2 border-gray-300 dark:border-gray-700 hover:shadow-lg hover:scale-[1.01] hover:border-gray-500 dark:hover:border-gray-400`}>
                  <div
                    className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                  >
                    <span
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 ${exp.badgeColor} rounded-full text-xs sm:text-sm font-medium border`}
                    >
                      {exp.type}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Title with color change based on dot */}
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 text-foreground transition-colors duration-300 ${exp.textColor}`}>
                    {exp.title}
                  </h3>

                  <div
                    className={`flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center gap-1.5 sm:gap-2 md:gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                  >
                    <span className={`flex items-center gap-1 text-xs sm:text-sm transition-colors duration-300 ${exp.textColor}`}>
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{exp.company}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      {exp.location}
                    </span>
                  </div>

                  <ul
                    className={`space-y-1.5 sm:space-y-2 mb-4 ${index % 2 === 0 ? "md:text-left" : ""
                      }`}
                  >
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-xs sm:text-sm flex items-start gap-2 group/li"
                      >
                        <span className={`mt-1 sm:mt-1.5 flex-shrink-0 text-primary transition-colors duration-300 ${exp.textColor.replace('group-hover:', 'group-hover/li:')}`}>
                          ▸
                        </span>
                        <span className={`text-foreground/90 transition-colors duration-300 ${exp.textColor.replace('group-hover:', 'group-hover/li:')}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Improved technology tags with better visibility */}
                  <div
                    className={`flex flex-wrap gap-1.5 sm:gap-2 ${index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                  >
                    {exp.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-secondary text-gray-800 dark:text-secondary-foreground rounded-full text-xs sm:text-sm font-medium border-2 border-gray-300 dark:border-secondary-foreground/30 group-hover/tech:border-primary/50 group-hover/tech:bg-primary/10 group-hover/tech:text-primary dark:group-hover/tech:text-primary transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      >
                        {tech}
                      </motion.span>
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