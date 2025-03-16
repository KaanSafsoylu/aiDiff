"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950 via-indigo-900 to-black" />

      {/* Hexagon grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagonPattern" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="scale(2) rotate(0)">
              <path d="M25,0 L50,14.433756729740643 L50,43.30127018922194 L25,57.73502691896257 L0,43.30127018922194 L0,14.433756729740643 Z"
                    fill="none"
                    stroke="rgba(200, 150, 255, 0.2)"
                    strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
        </svg>
      </div>

      {/* Digital circuit lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => {
          const startX = Math.random() * 100;
          const endX = startX + (Math.random() * 30 - 15);
          const y = Math.random() * 100;
          const thickness = Math.random() * 1.5 + 0.5;

          return (
            <motion.div
              key={i}
              className="absolute bg-violet-400/30"
              style={{
                height: `${thickness}px`,
                width: '0%',
                top: `${y}%`,
                left: `${startX}%`,
              }}
              animate={{
                width: ['0%', `${Math.abs(endX - startX)}%`],
                left: startX < endX ? `${startX}%` : `${endX}%`,
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 2,
              }}
            />
          );
        })}

        {Array.from({ length: 15 }).map((_, i) => {
          const startY = Math.random() * 100;
          const endY = startY + (Math.random() * 30 - 15);
          const x = Math.random() * 100;
          const thickness = Math.random() * 1.5 + 0.5;

          return (
            <motion.div
              key={i + 'v'}
              className="absolute bg-blue-400/30"
              style={{
                width: `${thickness}px`,
                height: '0%',
                left: `${x}%`,
                top: `${startY}%`,
              }}
              animate={{
                height: ['0%', `${Math.abs(endY - startY)}%`],
                top: startY < endY ? `${startY}%` : `${endY}%`,
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 2,
              }}
            />
          );
        })}
      </div>

      {/* Data nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i + 'node'}
            className="absolute rounded-full bg-white/30"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-0 h-[250px] w-[250px] rounded-full bg-blue-500/10 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </div>
  );
}
