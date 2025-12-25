import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle, Navigation } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating error code */}
      <motion.div
        className="absolute text-[20rem] font-bold opacity-5 select-none pointer-events-none"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        404
      </motion.div>

      <div className="text-center relative z-10 px-4">
        {/* Animated error icon */}
        <motion.div
          className="mb-8 relative inline-block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <div className="relative">
            <AlertCircle className="w-32 h-32 text-primary mx-auto" />
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Bouncing 404 number */}
        <motion.div
          className="mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <motion.h1
            className="mb-4 text-8xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Lost in the Digital Space</h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-md mx-auto">
            The page at <code className="px-2 py-1 bg-secondary rounded text-sm font-mono">"{location.pathname}"</code> seems to have drifted into the unknown.
          </p>
        </motion.div>

        {/* Compass animation */}
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Navigation className="w-12 h-12 text-primary/50 mx-auto" />
        </motion.div>

        {/* Home button with hover effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 group shadow-lg"
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <Home className="w-5 h-5" />
            </motion.div>
            Return to Home
            <motion.div
              className="opacity-0 group-hover:opacity-100"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 0.5,
                repeat: 3,
                delay: 0.2
              }}
            >
              →
            </motion.div>
          </a>
        </motion.div>

        {/* Additional help text */}
        <motion.p
          className="mt-8 text-sm text-muted-foreground max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Don't worry, even the best explorers get lost sometimes!
        </motion.p>

        {/* Path trace animation */}
        <motion.div
          className="mt-12 relative h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-md mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="absolute -top-1 w-3 h-3 bg-primary rounded-full"
            animate={{
              left: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Corner decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"
        animate={{
          borderWidth: ["2px", "3px", "2px"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary/30 rounded-br-lg"
        animate={{
          borderWidth: ["2px", "3px", "2px"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default NotFound;