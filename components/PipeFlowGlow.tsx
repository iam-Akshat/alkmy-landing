"use client";

import React, { useState, useEffect, JSX, useRef } from "react";
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

// Dimensions for the vertical layout
const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 800;
const CENTER_X = 300;
const CENTER_Y = 400;

// Define the static paths (Vertical Flow)
// Start at y=0, converge to (300, 400)
const staticPaths = [
  {
    id: "path-1",
    d: "M 100 0 Q 200 200 300 400",
    icon: "brain",
    colorKey: "purple" as const,
  },
  {
    id: "path-2",
    d: "M 200 0 Q 250 200 300 400",
    icon: "chart",
    colorKey: "blue" as const,
  },
  {
    id: "path-3",
    d: "M 300 0 Q 300 200 300 400",
    icon: "file",
    colorKey: "green" as const,
  },
  {
    id: "path-4",
    d: "M 400 0 Q 350 200 300 400",
    icon: "db",
    colorKey: "yellow" as const,
  },
  {
    id: "path-5",
    d: "M 500 0 Q 400 200 300 400",
    icon: "code",
    colorKey: "red" as const,
  },
];

// Path for the outgoing "insight" (Vertical)
// Starts from center bottom (400 + 26) to bottom (800)
const insightPath = {
  id: "path-insight",
  d: "M 300 426 L 300 800",
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
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle Responsive Scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          const availableWidth = parent.clientWidth;
          const availableHeight = parent.clientHeight;
          
          // Scale based on width, but also ensure it fits height if needed?
          // For now, prioritize width fit as it's a vertical scroll page usually.
          // Add some padding (e.g. 32px)
          const widthScale = Math.min(1, (availableWidth - 32) / VIEW_WIDTH);
          
          // Optional: Check height fit too if we want it fully contained
          // const heightScale = Math.min(1, availableHeight / VIEW_HEIGHT);
          // const newScale = Math.min(widthScale, heightScale);
          
          setScale(widthScale);
        }
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Static keyframes + utility styles
  const keyframeStyles = `
    /* Edge fade for the entire SVG (lines) - Vertical */
    .edge-fade-mask {
      -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
      );
      mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
      );
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
    }

    /* Animation for the "pulse" effect on the INCOMING lines (Vertical) */
    @keyframes slideMask {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }

    /* Animation for the "pulse" effect on the OUTGOING line (Vertical) */
    @keyframes slideMaskInsight {
      0% {
        /* Bright spot (at 400px) at path start (426px) -> rect Y = 426 - 400 = 26px */
        transform: translateY(26px);
      }
      100% {
        /* Bright spot (at 400px) at path end (800px) -> rect Y = 800 - 400 = 400px */
        transform: translateY(400px);
      }
    }

    /* Base class for INCOMING mask rectangles */
    .mask-rect {
      animation: slideMask 4s ease-in-out infinite;
      animation-play-state: paused;
      animation-fill-mode: backwards;
    }

    /* Specific class for the OUTGOING insight mask */
    .mask-rect-insight {
      animation: slideMaskInsight 5s ease-in-out infinite;
      animation-play-state: paused;
      animation-fill-mode: backwards;
    }

    .mask-rect.running,
    .mask-rect-insight.running {
      animation-play-state: running;
    }

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
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden text-white">
      {/* Inject all styles */}
      <style>{keyframeStyles + dynamicStyles}</style>

      {/* Main container for the visualization - Scaled for responsiveness */}
      <div
        ref={containerRef}
        className="relative origin-center"
        style={{
          width: `${VIEW_WIDTH}px`,
          height: `${VIEW_HEIGHT}px`,
          transform: `scale(${scale})`,
        }}
      >
        {/* SVG + lines, wrapped in edge fade mask */}
        <div className="absolute inset-0 edge-fade-mask pointer-events-none">
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Single white pulse gradient used by all masks (Vertical) */}
              <linearGradient
                id="pulse-gradient"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
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
                    width={VIEW_WIDTH}
                    height={VIEW_HEIGHT}
                    fill="url(#pulse-gradient)"
                  />
                </mask>
              ))}

              {/* Mask for the yellow insight pulse */}
              <mask id="pulse-mask-insight">
                <rect
                  className={`mask-rect-insight ${
                    animateLines ? "running" : ""
                  }`}
                  style={{
                    animationDelay: `${insightDelay ?? 9999}s`,
                  }}
                  x="0"
                  y="0"
                  width={VIEW_WIDTH}
                  height={VIEW_HEIGHT}
                  fill="url(#pulse-gradient)"
                />
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
            top: `${CENTER_Y - 26}px`,
            left: `${CENTER_X - 26}px`,
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
