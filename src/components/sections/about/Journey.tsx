import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Journey = () => {
    return (
        <motion.div
            className="highlight-card border border-gray-300/40 p-6 md:p-8 rounded-2xl h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className="text-xl md:text-2xl font-bold mb-4">My Expertise</h3>
            <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    Holding a <span className="text-foreground font-medium">BSc (Hons) in Computer Science & Technology</span> from
                    Uva Wellassa University, I built my development foundation at <span className="text-purple-500 font-medium">CodeLantic</span>, progressing from Trainee to
                    Associate Software Engineer over nearly two years — building production RESTful APIs in Java and Spring
                    Boot microservice architectures, working across relational (MySQL) and non-relational (MongoDB)
                    databases, and maintaining quality through JUnit5 and Mockito testing.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    At <span className="text-primary font-medium">HomeIt System</span>, I continue building and
                    maintaining Spring Boot services while extending into Node.js/Express
                    backend development, encrypted cloud data pipelines, Redis caching, and event-driven messaging with
                    Apache Kafka, alongside frontend delivery with Next.js and React. In parallel, I own the cloud and
                    DevOps side of the stack:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground">
                    <li>Linux administration and core networking across Hetzner Cloud VMs and a clustered Proxmox environment</li>
                    <li>Infrastructure automation with Ansible and containerized workloads with Docker</li>
                    <li>CI/CD pipelines through Jenkins, with foundational exposure to AWS and Kubernetes</li>
                    <li>Routing and load balancing with Nginx, Cloudflare and pfSense/HAProxy</li>
                    <li>Security tooling including SIEM/intrusion detection, zero trust mesh VPN access and centralized patch management</li>
                    <li>Production monitoring and alerting with Checkmk and Matomo analytics</li>
                </ul>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base pt-2">
                    I'm comfortable taking ownership across the full engineering lifecycle from building and shipping
                    applications to running and securing the infrastructure they live on.
                </p>
            </div>
        </motion.div>
    );
};

export default Journey;