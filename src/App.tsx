import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

// scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // only scroll to top on route change, not on initial load with hash
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

// scroll restoration component
function ScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    // saving scroll position before refresh
    const saveScrollPosition = () => {
      sessionStorage.setItem(`scrollPosition_${location.pathname}`, window.scrollY.toString());
    };

    // restore scroll position on mount
    const savedPosition = sessionStorage.getItem(`scrollPosition_${location.pathname}`);
    if (savedPosition) {
      // use setTimeout to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
        // clear after restoring
        sessionStorage.removeItem(`scrollPosition_${location.pathname}`);
      }, 0);
    }

    window.addEventListener('beforeunload', saveScrollPosition);
    
    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [location.pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ScrollRestoration />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
