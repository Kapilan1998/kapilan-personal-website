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
                    Uva Wellassa University, I've cultivated expertise across the full software delivery lifecycle from
                    writing clean, maintainable code to orchestrating CI/CD pipelines and managing cloud infrastructure.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    Currently, I contribute at{' '}
                    <a
                        href="https://homeit-system.com/de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                    >
                        HomeIt System
                    </a>
                    , where I architect and maintain production grade systems with a focus on:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground">
                    <li>Developing enterprise Spring Boot applications with PostgreSQL and Hetzner S3</li>
                    <li>Architecting containerized deployments using Docker and orchestration tools</li>
                    <li>Automating infrastructure with Ansible across Proxmox VMs and Hetzner Cloud</li>
                    <li>Implementing CI/CD pipelines for seamless application deployment</li>
                    <li>Configuring monitoring solutions with Checkmk and Matomo analytics</li>
                    <li>Managing DNS, security, and networking with Cloudflare and pfSense</li>
                </ul>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base pt-2">
                    I'm passionate about creating efficient, secure, and scalable systems that drive
                    business value while maintaining operational excellence.
                </p>
            </div>
        </motion.div>
    );
};

export default Journey;