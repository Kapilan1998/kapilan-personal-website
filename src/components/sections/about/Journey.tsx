import { motion } from 'framer-motion';

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
                    Associate Software Engineer over nearly two years — delivering fintech REST APIs in Java and Spring
                    Boot, decomposing a monolith into independently deployable microservices communicating through Feign
                    Client, WebClient and an API Gateway and modelling data across MySQL (Flyway managed migrations) and
                    MongoDB, with 80%+ test coverage through JUnit 5 and Mockito.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    At <span className="text-primary font-medium">HomeIt System</span>, I continue building Spring Boot
                    services including RSA encrypted file transfer to Hetzner S3, backed by PostgreSQL with Flyway
                    migrations, Redis caching and Apache Kafka for asynchronous processing, while extending into
                    Node.js/Express backends and shipping production Next.js, React and TypeScript frontends monitored
                    with Sentry. More recently I've been building LLM powered features using function calling over
                    access scoped, read only tools. In parallel, I own the cloud and DevOps side of the stack:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground">
                    <li>Ansible automation across Proxmox, Hetzner Cloud and AWS  25+ VMs and LXC containers provisioned, cutting server setup from ~2 hours to 15 minutes</li>
                    <li>AWS infrastructure with EC2 inside a VPC, RDS and S3 under IAM least privilege access, plus working knowledge of Kubernetes</li>
                    <li>A two node Proxmox HA cluster with encrypted incremental off-site backups via Proxmox Backup Server which is 65% lower infrastructure spend at 99% uptime</li>
                    <li>Docker based Jenkins CI/CD publishing to Nexus and deploying through Dokploy, taking deployments from 30–40 minutes down to 5–10</li>
                    <li>Network and access control with Nginx, HAProxy, Traefik, pfSense, Cloudflare Zero Trust and Headscale/Tailscale with per user ACLs</li>
                    <li>Security and observability across 10+ production hosts with Wazuh SIEM, CrowdSec, PatchMon, Checkmk, Prometheus/Grafana and Sentry</li>
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