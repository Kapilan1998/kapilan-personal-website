import { lazy } from 'react';

// Lazy load the main content
const LazyAbout = lazy(() => import('./about/LazyAbout'));

const About = () => {
  return <LazyAbout />;
};

export default About;