import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* 🌌 BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1f35] to-[#0f4c5c]" />

            {/* ✨ MOVING GLOW */}
            <motion.div
              animate={{ x: [-250, 250] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-[500px] h-[500px] bg-cyan-400/20 blur-3xl rounded-full"
            />

            {/* ✨ SECOND GLOW */}
            <motion.div
              animate={{ y: [-100, 100] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full"
            />

            {/* ✨ GRAIN OVERLAY */}
            <div
              className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://grainy-gradients.vercel.app/noise.svg')",
              }}
            />

            {/* 🎬 LOTTIE */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="w-[260px] h-[260px] z-10"
            >
              <iframe
                src="https://lottie.host/embed/2a396ea2-48e8-4b3e-8545-eeb89b4a36e8/jIUF1YrcGI.lottie"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </motion.div>

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6 z-10"
            >
              <h1 className="text-cyan-100 text-2xl md:text-4xl font-bold tracking-wide">
                Aidil Mubaraq Syah
              </h1>

              <p className="text-cyan-200/80 text-sm md:text-base italic mt-3">
                Building stories, dreams, and future memories ✨
              </p>

              {/* PROGRESS BAR */}
              <div className="w-52 h-1.5 bg-white/10 rounded-full overflow-hidden mt-6 mx-auto backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 animate-[loading_1.8s_infinite]" />
              </div>

              {/* EXTRA STATUS */}
              <p className="text-cyan-100/70 text-xs md:text-sm mt-5 tracking-wide">
                📍 Banda Aceh • 🏃 Keep Running • ✈️ Dream Destinations
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 ANIMATION */}
      <style>
        {`
          @keyframes loading {
            0% {
              width: 0%;
            }
            50% {
              width: 100%;
            }
            100% {
              width: 0%;
            }
          }
        `}
      </style>
    </QueryClientProvider>
  );
};

export default App;