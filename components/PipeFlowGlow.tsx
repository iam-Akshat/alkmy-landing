"use client";

import React, { useState, useEffect, JSX } from "react";
import {
  Brain,
  BarChart,
  FileText,
  Database,
  Code,
  Lightbulb,
  Sparkles,
} from "lucide-react";

// A map of icons to use for the animation
const ICONS: Record<string, (props: any) => JSX.Element> = {
  brain: (props) => <Brain {...props} />,
  chart: (props) => <BarChart {...props} />,
  file: (props) => <FileText {...props} />,
  db: (props) => <Database {...props} />,
  code: (props) => <Code {...props} />,
};

// Map of colors for easy reference
const COLOR_MAP = {
  purple: { bg: "bg-purple-500", glow: "shadow-purple-500/70", hex: "#a855f7" },
  blue: { bg: "bg-blue-500", glow: "shadow-blue-500/70", hex: "#3b82f6" },
  green: { bg: "bg-green-500", glow: "shadow-green-500/70", hex: "#22c55e" },
  yellow: { bg: "bg-yellow-500", glow: "shadow-yellow-500/70", hex: "#eab308" },
  red: { bg: "bg-red-500", glow: "shadow-red-500/70", hex: "#ef4444" },
} as const;

// Define the static paths
const staticPaths = [
  {
    id: "path-1",
    d: "M 0 50 Q 350 100 500 250",
    icon: "brain",
    colorKey: "purple" as const,
  },
  {
    id: "path-2",
    d: "M 0 150 Q 350 150 500 250",
    icon: "chart",
    colorKey: "blue" as const,
  },
  {
    id: "path-3",
    d: "M 0 250 Q 350 250 500 250",
    icon: "file",
    colorKey: "green" as const,
  },
  {
    id: "path-4",
    d: "M 0 350 Q 350 350 500 250",
    icon: "db",
    colorKey: "yellow" as const,
  },
  {
    id: "path-5",
    d: "M 0 450 Q 350 400 500 250",
    icon: "code",
    colorKey: "red" as const,
  },
];

// Path for the outgoing "insight"
const insightPath = {
  id: "path-insight",
  d: "M 526 250 L 1000 250",
};

type AnimatedPath = (typeof staticPaths)[number] & {
  duration: number;
  delay: number;
  color: (typeof COLOR_MAP)[keyof typeof COLOR_MAP];
};

export default function AppHero() {
  const [animatedPaths, setAnimatedPaths] = useState<AnimatedPath[]>([]);
  const [animateLines, setAnimateLines] = useState(false);
  const [insightDelay, setInsightDelay] = useState<number | null>(null);

  useEffect(() => {
    // Generate random durations and delays only on the client
    const newPaths: AnimatedPath[] = staticPaths.map((path) => {
      const duration = 4 + Math.random() * 3; // 4s to 7s
      const delay = Math.random() * 5; // 0s to 5s
      return {
        ...path,
        duration,
        delay,
        color: COLOR_MAP[path.colorKey],
      };
    });

    setAnimatedPaths(newPaths);

    // Compute when the first particle roughly reaches the center
    if (newPaths.length > 0) {
      const firstArrival = Math.min(
        ...newPaths.map((p) => p.delay + 0.95 * p.duration)
      );
      setInsightDelay(firstArrival);
    }

    // Start line animations on the next frame to avoid mid‑cycle glitch
    const id = requestAnimationFrame(() => setAnimateLines(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Static keyframes + utility styles
  const keyframeStyles = `
    /* Edge fade for the entire SVG (lines) */
    .edge-fade-mask {
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
      );
      mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
      );
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
    }

    /* Animation for the "pulse" effect on the INCOMING lines */
    @keyframes slideMask {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    /* --- NEW --- */
    /* Animation for the "pulse" effect on the OUTGOING line */
    /* This moves the pulse bright spot from x=526 to x=1000 */
    @keyframes slideMaskInsight {
      0% {
        /* Bright spot (at 500px) at path start (526px) -> rect X = 526 - 500 = 26px */
        transform: translateX(26px);
      }
      100% {
        /* Bright spot (at 500px) at path end (1000px) -> rect X = 1000 - 500 = 500px */
        transform: translateX(500px);
      }
    }
    /* --- END NEW --- */


    /* Base class for INCOMING mask rectangles */
    .mask-rect {
      animation: slideMask 4s ease-in-out infinite;
      animation-play-state: paused;
      animation-fill-mode: backwards;
    }

    /* --- NEW --- */
    /* Specific class for the OUTGOING insight mask */
    .mask-rect-insight {
      /* Match the particle's 5s duration and ease-in-out */
      animation: slideMaskInsight 5s ease-in-out infinite;
      animation-play-state: paused;
      animation-fill-mode: backwards;
    }
    /* --- END NEW --- */

    /* --- MODIFIED --- */
    /* Class to start BOTH types of animations */
    .mask-rect.running,
    .mask-rect-insight.running {
      animation-play-state: running;
    }
    /* --- END MODIFIED --- */

    /* Animation for the incoming icons (maintains color) */
    @keyframes move-on-path {
      0% {
        offset-distance: 0%;
        opacity: 0;
        transform: scale(1);
      }
      10% {
        opacity: 1;
      }
      95% {
        offset-distance: 100%;
        transform: scale(0.5);
        opacity: 0;
      }
      100% {
        offset-distance: 100%;
        opacity: 0;
        transform: scale(0);
      }
    }

    /* Animation for the outgoing "insight" */
    @keyframes move-insight {
      0% {
        offset-distance: 0%;
        opacity: 0;
        transform: scale(0.5);
      }
      10%, 80% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        offset-distance: 100%;
        opacity: 0;
        transform: scale(0.5);
      }
    }

    /* Class for the insight particle */
    .particle-insight {
      offset-path: path("${insightPath.d}");
      animation: move-insight 5s ease-in-out infinite;
      animation-delay: ${insightDelay ?? 9999}s;
    }
  `;

  // Dynamic styles based on the randomized paths
  const dynamicStyles = animatedPaths
    .map(
      (path) => `
      .particle-${path.id} {
        offset-path: path("${path.d}");
        animation: move-on-path ${path.duration}s ease-in infinite;
        animation-delay: ${path.delay}s;
      }
    `
    )
    .join("\n");

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden text-white">
      {/* Inject all styles */}
      <style>{keyframeStyles + dynamicStyles}</style>

      {/* Main container for the visualization */}
      <div className="relative w-[1000px] h-[500px]">
        {/* SVG + lines, wrapped in edge fade mask */}
        <div className="absolute inset-0 edge-fade-mask pointer-events-none">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Single white pulse gradient used by all masks */}
              <linearGradient
                id="pulse-gradient"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="40%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>

              {/* One mask per path */}
              {animatedPaths.map((path) => (
                <mask key={`mask-${path.id}`} id={`pulse-mask-${path.id}`}>
                  <rect
                    className={`mask-rect ${animateLines ? "running" : ""}`}
                    style={{ animationDelay: `${path.delay}s` }}
                    x="0"
                    y="0"
                    width="1000"
                    height="500"
                    fill="url(#pulse-gradient)"
                  />
                </mask>
              ))}

              {/* Mask for the yellow insight pulse */}
              <mask id="pulse-mask-insight">
                {/* --- MODIFIED --- */}
                {/* Use the new insight-specific class */}
                <rect
                  className={`mask-rect-insight ${
                    animateLines ? "running" : ""
                  }`}
                  style={{
                    animationDelay: `${insightDelay ?? 9999}s`,
                  }}
                  x="0"
                  y="0"
                  width="1000"
                  height="500"
                  fill="url(#pulse-gradient)"
                />
                {/* --- END MODIFIED --- */}
              </mask>
            </defs>

            {/* Group 1: Static background paths (dim white) */}
            <g>
              {animatedPaths.map((path) => (
                <path
                  key={`bg-${path.id}`}
                  d={path.d}
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.1"
                />
              ))}
              <path
                d={insightPath.d}
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.1"
              />
            </g>

            {/* Group 2: Colored, masked pulse lines */}
            <g>
              {animatedPaths.map((path) => (
                <path
                  key={`pulse-${path.id}`}
                  d={path.d}
                  stroke={path.color.hex}
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                  mask={`url(#pulse-mask-${path.id})`}
                />
              ))}
              {/* The yellow insight pulse */}
              <path
                d={insightPath.d}
                stroke="#fde047"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                mask="url(#pulse-mask-insight)"
              />
            </g>
          </svg>
        </div>

        {/* 2. The Animated Particles (HTML divs) */}
        {animatedPaths.map((path) => {
          const Icon = ICONS[path.icon];
          return (
            <div
              key={path.id}
              className={`particle-${path.id} absolute w-7 h-7 ${path.color.bg} ${path.color.glow}
                          flex items-center justify-center rounded-full 
                          shadow-lg opacity-0`}
              style={{ top: 0, left: 0 }}
            >
              <Icon className="w-4 h-4 text-white" />
            </div>
          );
        })}

        {/* The outgoing "Insight" particle */}
        <div
          className="particle-insight absolute w-5 h-5 bg-yellow-300 
                     rounded-full shadow-lg shadow-yellow-300/70
                     flex items-center justify-center opacity-0"
          style={{ top: 0, left: 0 }}
        >
          <Sparkles className="w-3 h-3 text-yellow-900" />
        </div>

        {/* 3. The Central Box */}
        <div
          className="absolute z-10 border rounded-xl 
                     border-white/20 bg-gray-800/50 backdrop-blur-md
                     shadow-2xl
                     flex items-center justify-center"
          style={{
            top: "224px",
            left: "474px",
            width: "52px",
            height: "52px",
          }}
        >
          <Lightbulb className="w-7 h-7 text-yellow-300" />
        </div>
      </div>
    </div>
  );
}
