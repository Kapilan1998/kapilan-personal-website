import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

const AboutContent = lazy(() => import('./AboutContent'));

const LazyAbout = () => {
  return (
    <Suspense 
      fallback={
        <div className="min-h-[600px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <AboutContent />
    </Suspense>
  );
};

export default LazyAbout;