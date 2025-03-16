"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ComparisonIllustration() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full max-w-md mx-auto h-28 flex items-center justify-center">
      {/* Left Image Frame */}
      <motion.div
        className="absolute w-20 h-20 bg-white/10 rounded-md flex items-center justify-center overflow-hidden border-2 border-violet-400/40"
        initial={{ x: -20, opacity: 0 }}
        animate={{
          x: -40,
          opacity: 1,
          rotate: [-1, 1, -1],
        }}
        transition={{
          x: { duration: 0.5 },
          opacity: { duration: 0.5 },
          rotate: { duration: 2, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        {/* Stylized website content */}
        <div className="flex flex-col items-center w-full space-y-1 px-1.5">
          <div className="w-full h-1.5 bg-violet-500/60 rounded-sm" />
          <div className="w-3/4 h-1 bg-gray-300/40 rounded-sm" />
          <div className="w-full h-1 bg-gray-300/40 rounded-sm" />
          <div className="w-4/5 h-3 bg-violet-400/40 rounded-sm mt-1" />
          <div className="w-full h-1 bg-gray-300/40 rounded-sm" />
          <div className="w-5/6 h-1 bg-gray-300/40 rounded-sm" />
        </div>
      </motion.div>

      {/* Right Image Frame */}
      <motion.div
        className="absolute w-20 h-20 bg-white/10 rounded-md flex items-center justify-center overflow-hidden border-2 border-indigo-400/40"
        initial={{ x: 20, opacity: 0 }}
        animate={{
          x: 40,
          opacity: 1,
          rotate: [1, -1, 1],
        }}
        transition={{
          x: { duration: 0.5 },
          opacity: { duration: 0.5 },
          rotate: { duration: 2, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        {/* Stylized website content - slightly different */}
        <div className="flex flex-col items-center w-full space-y-1 px-1.5">
          <div className="w-full h-1.5 bg-indigo-500/60 rounded-sm" />
          <div className="w-3/4 h-1 bg-gray-300/40 rounded-sm" />
          <div className="w-full h-1 bg-gray-300/40 rounded-sm" />
          <div className="w-4/5 h-3 bg-blue-400/40 rounded-sm mt-1" /> {/* Different color */}
          <div className="w-full h-1 bg-gray-300/40 rounded-sm" />
          <div className="w-3/4 h-1 bg-gray-300/40 rounded-sm" /> {/* Different width */}
        </div>
      </motion.div>

      {/* Center Magnifying Glass */}
      <motion.div
        className="relative z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: 1,
        }}
        transition={{
          scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: 0.5 }
        }}
      >
        {/* Magnifying glass lens */}
        <div className="w-8 h-8 rounded-full border-2 border-violet-300/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent"></div>
        </div>
        {/* Handle */}
        <motion.div
          className="absolute w-1.5 h-6 bg-violet-300/80 rounded-full"
          style={{
            transformOrigin: "center top",
            top: "50%",
            right: "-2px",
            rotate: "45deg"
          }}
          animate={{ rotate: ["40deg", "50deg", "40deg"] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Comparison Indicators */}
      <div className="absolute w-full h-full flex items-center justify-center">
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-red-500"
          style={{ left: "35%", top: "40%" }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-green-500"
          style={{ right: "35%", bottom: "40%" }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>
    </div>
  );
}
