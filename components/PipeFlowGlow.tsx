"use client";

import React, { useState, JSX, useRef, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { Lightbulb, Sparkles } from "lucide-react";
import {
  FaReddit,
  FaAppStore,
  FaGooglePlay,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

// A map of icons to use for the animation
const ICONS: Record<string, (props: any) => JSX.Element> = {
  reddit: (props) => <FaReddit {...props} />,
  appstore: (props) => <FaAppStore {...props} />,
  playstore: (props) => <FaGooglePlay {...props} />,
  youtube: (props) => <FaYoutube {...props} />,
  instagram: (props) => <FaInstagram {...props} />,
};

// Map of colors for easy reference
const COLOR_MAP = {
  purple: { bg: "bg-purple-500", hex: "#a855f7" },
  blue: { bg: "bg-blue-500", hex: "#3b82f6" },
  green: { bg: "bg-green-500", hex: "#22c55e" },
  yellow: { bg: "bg-yellow-500", hex: "#eab308" },
  red: { bg: "bg-red-500", hex: "#ef4444" },
} as const;

// Dimensions for the vertical layout
const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 800;
const CENTER_X = 300;
const CENTER_Y = 400;
const CENTER_BOX_SIZE = 96;
const CENTER_BOX_HALF = 48;

// Define the static paths (Vertical Flow)
const staticPaths = [
  {
    id: "path-1",
    d: "M 100 0 Q 200 200 300 400",
    icon: "reddit",
    colorKey: "yellow" as const,
  },
  {
    id: "path-2",
    d: "M 200 0 Q 250 200 300 400",
    icon: "appstore",
    colorKey: "blue" as const,
  },
  {
    id: "path-3",
    d: "M 300 0 Q 300 200 300 400",
    icon: "playstore",
    colorKey: "green" as const,
  },
  {
    id: "path-4",
    d: "M 400 0 Q 350 200 300 400",
    icon: "youtube",
    colorKey: "red" as const,
  },
  {
    id: "path-5",
    d: "M 500 0 Q 400 200 300 400",
    icon: "instagram",
    colorKey: "purple" as const,
  },
];

// Path for the outgoing "insight" (Vertical)
const insightPath = {
  id: "path-insight",
  d: `M 300 ${CENTER_Y + CENTER_BOX_HALF} L 300 ${VIEW_HEIGHT}`,
};

type AnimatedPath = (typeof staticPaths)[number] & {
  duration: number;
  delay: number;
  color: (typeof COLOR_MAP)[keyof typeof COLOR_MAP];
};

// Static keyframe styles (never change)
const STATIC_KEYFRAME_STYLES = `
  /* Edge fade for the entire SVG (lines) - Vertical */
  .edge-fade-mask {
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 5%,
      black 85%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 5%,
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
      transform: translateY(${CENTER_BOX_HALF}px);
    }
    100% {
      transform: translateY(${CENTER_Y}px);
    }
  }

  /* Base class for INCOMING mask rectangles */
  .mask-rect {
    animation: slideMask 4s ease-in-out infinite;
    animation-play-state: paused;
    animation-fill-mode: backwards;
    will-change: transform;
  }

  /* Specific class for the OUTGOING insight mask */
  .mask-rect-insight {
    animation: slideMaskInsight 5s ease-in-out infinite;
    animation-play-state: paused;
    animation-fill-mode: backwards;
    will-change: transform;
  }

  .mask-rect.running,
  .mask-rect-insight.running {
    animation-play-state: running;
  }

  /* Animation for the incoming icons (maintains color) */
  @keyframes move-on-path {
    0% {
      offset-distance: 0%;
      opacity: 1;
      transform: scale(1.8);
    }
    10% {
      opacity: 1;
    }
    95% {
      offset-distance: 100%;
      transform: scale(0.5);
    }
    100% {
      offset-distance: 100%;
      transform: scale(0);
      opacity: 1;
    }
  }

  /* Animation for the outgoing "insight" */
  @keyframes move-insight {
    0% {
      offset-distance: 0%;
      opacity: 1;
      transform: scale(1);
    }
    30% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      offset-distance: 100%;
      opacity: 0;
      transform: scale(0);
    }
  }
`;

// Particle component for better performance
const Particle = React.memo(({ path }: { path: AnimatedPath }) => {
  const Icon = ICONS[path.icon];
  return (
    <div
      className={`particle-${path.id} absolute w-7 h-7 ${path.color.bg} flex items-center justify-center rounded-full opacity-0`}
      style={{
        top: 0,
        left: 0,
        boxShadow: `0 0 20px 4px ${path.color.hex}70`,
      }}
    >
      <Icon className="w-4 h-4 text-white rotate-270" />
    </div>
  );
});
Particle.displayName = "Particle";

export default function AppHero() {
  const [animatedPaths, setAnimatedPaths] = useState<AnimatedPath[]>([]);
  const [animateLines, setAnimateLines] = useState(false);
  const [insightDelay, setInsightDelay] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize the resize handler
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        const availableWidth = parent.clientWidth;
        const availableHeight = parent.clientHeight;

        // Scale based on both width and height
        // Add padding (32px horizontal, 64px vertical for py-8)
        const widthScale = Math.min(1, (availableWidth - 32) / VIEW_WIDTH);
        const heightScale = Math.min(1, (availableHeight - 64) / VIEW_HEIGHT);

        // Use the smaller of the two to ensure it fits
        setScale(Math.min(widthScale, heightScale));
      }
    }
  }, []);

  // Combined GSAP hook for initialization and resize
  useGSAP(() => {
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
    const firstArrival = Math.min(
      ...newPaths.map((p) => p.delay + 0.95 * p.duration)
    );
    setInsightDelay(firstArrival);

    // Start line animations on the next frame to avoid mid‑cycle glitch
    const animId = requestAnimationFrame(() => setAnimateLines(true));

    // Initial resize check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // Memoize dynamic styles to prevent re-calculation on every render
  const dynamicStyles = useMemo(() => {
    const particleStyles = animatedPaths
      .map(
        (path) => `
        .particle-${path.id} {
          offset-path: path("${path.d}");
          animation: move-on-path ${path.duration}s ease-in infinite;
          animation-delay: ${path.delay}s;
          will-change: transform, opacity, offset-distance;
        }`
      )
      .join("\n");

    const insightStyle = `
      .particle-insight {
        offset-path: path("${insightPath.d}");
        animation: move-insight 5s ease-in-out infinite;
        animation-delay: ${insightDelay ?? 9999}s;
        will-change: transform, opacity, offset-distance;
      }`;

    return STATIC_KEYFRAME_STYLES + particleStyles + insightStyle;
  }, [animatedPaths, insightDelay]);

  // Memoize container styles
  const containerStyle = useMemo(
    () => ({
      width: `${VIEW_WIDTH * scale}px`,
      height: `${VIEW_HEIGHT * scale}px`,
    }),
    [scale]
  );

  const innerWrapperStyle = useMemo(
    () => ({
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${VIEW_WIDTH}px`,
      height: `${VIEW_HEIGHT}px`,
    }),
    [scale]
  );

  const centralBoxStyle = useMemo(
    () => ({
      top: `${CENTER_Y - CENTER_BOX_HALF}px`,
      left: `${CENTER_X - CENTER_BOX_HALF}px`,
      width: `${CENTER_BOX_SIZE}px`,
      height: `${CENTER_BOX_SIZE}px`,
    }),
    []
  );

  const runningClass = animateLines ? "running" : "";

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen py-8 text-white -mt-64 md:mt-0">
      {/* Inject all styles */}
      <style>{dynamicStyles}</style>

      {/* Main container for the visualization - Scaled for responsiveness */}
      <div ref={containerRef} className="relative mx-auto" style={containerStyle}>
        {/* Inner wrapper that contains everything at base size, then scales */}
        <div className="absolute top-0 left-0 w-full h-full" style={innerWrapperStyle}>
          {/* SVG + lines, wrapped in edge fade mask */}
          <div className="absolute inset-0 edge-fade-mask pointer-events-none">
            <svg
              viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ willChange: "transform" }}
            >
              <defs>
                {/* Single white pulse gradient used by all masks (Vertical) */}
                <linearGradient id="pulse-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="40%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="1" />
                  <stop offset="60%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>

                {/* One mask per path */}
                {animatedPaths.map((path) => (
                  <mask
                    key={path.id}
                    id={`pulse-mask-${path.id}`}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={VIEW_WIDTH}
                    height={VIEW_HEIGHT}
                  >
                    <rect
                      className={`mask-rect ${runningClass}`}
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
                <mask
                  id="pulse-mask-insight"
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={VIEW_WIDTH}
                  height={VIEW_HEIGHT}
                >
                  <rect
                    className={`mask-rect-insight ${runningClass}`}
                    style={{ animationDelay: `${insightDelay ?? 9999}s` }}
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
                    key={path.id}
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
                    key={path.id}
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

          {/* The Animated Particles (HTML divs) */}
          {animatedPaths.map((path) => (
            <Particle key={path.id} path={path} />
          ))}

          {/* The outgoing "Insight" particle */}
          <div
            className="particle-insight absolute w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center opacity-0"
            style={{
              top: 0,
              left: 0,
              boxShadow: "0 0 20px 4px rgba(253, 224, 71, 0.7)",
            }}
          >
            <Sparkles className="w-3 h-3 text-yellow-900" />
          </div>

          {/* The Central Box */}
          <div
            className="absolute z-10 border rounded-xl border-white/20 bg-gray-800/50 backdrop-blur-xl shadow-2xl flex items-center justify-center"
            style={centralBoxStyle}
          >
            <Lightbulb className="w-10 h-10 text-yellow-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
