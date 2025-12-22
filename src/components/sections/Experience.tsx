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
    dotColor: "bg-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-500",
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
    dotColor: "bg-violet-400",
    badgeColor: "bg-violet-400/10 text-amber-500",
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
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative"
      ref={ref}
    >
      {/* Removed the top horizontal line */}
      {/* <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" /> */}

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-xs sm:text-sm font-mono text-primary mb-3 sm:mb-4">
            Career Journey
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
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
            <div key={exp.company} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className={`relative ${
                  index % 2 === 0
                    ? "md:pr-6 lg:pr-8 md:text-right md:ml-0 md:mr-auto md:w-1/2"
                    : "md:pl-6 lg:pl-8 md:ml-auto md:w-1/2"
                }`}
              >
                {/* Timeline dot with unique color - hidden on mobile, visible on desktop */}
                <motion.div
                  className={`absolute top-2 sm:top-3 md:top-4 left-0 md:left-auto md:right-0 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 ${exp.dotColor} rounded-full hidden md:block shadow-md sm:shadow-lg`}
                  style={{
                    [index % 2 === 0 ? "right" : "left"]: "-8px",
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                />

                <div className="glass p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl hover:border-primary/20 transition-all duration-300 group mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                  <div
                    className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 ${exp.badgeColor} rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {exp.type}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {exp.title}
                  </h3>

                  <div
                    className={`flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center gap-2 sm:gap-3 md:gap-4 text-muted-foreground mb-3 sm:mb-4 ${
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
                    className={`space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6 ${
                      index % 2 === 0 ? "md:text-left" : ""
                    }`}
                  >
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-xs sm:text-sm flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 sm:mt-1.5 flex-shrink-0">
                          ▸
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`flex flex-wrap gap-1.5 sm:gap-2 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Horizontal line after each card (except the last one) - visible on all screen sizes */}
              {index !== experiences.length - 1 && (
                <div className="absolute -bottom-4 md:-bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;