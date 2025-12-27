import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import Journey from './Journey';
import Highlights from './Highlights';

const Header = memo(() => (
  <motion.div
    className="text-center mb-12 md:mb-16"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
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
      A backend focused Software Engineer with expertise in Spring Boot microservices,
      DevOps automation, and cloud infrastructure, building scalable enterprise solutions.
    </p>
  </motion.div>
));

Header.displayName = 'Header';

const AboutContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      id="about"
      className="pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-12 lg:pb-16 relative"
      ref={ref}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 600px'
      }}
    >
      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="max-w-6xl mx-auto"
        >
          <Header />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="flex flex-col"
            >
              <Journey />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <Highlights isInView={isInView} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutContent;