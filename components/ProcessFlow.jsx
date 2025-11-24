"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, LayoutGrid } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Universal Ingestion",
    description: "We hook into your public channels (App Store, Reddit, Twitter) and private data (Zendesk, Jira, Slack) to create a single data lake.",
    icon: <Database className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 2,
    title: "Semantic Synthesis",
    description: "Our LLM engine doesn't just keyword match. It understands intent. It groups \"I can't pay\" and \"Checkout broken\" into the same high-priority cluster.",
    icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
  },
  {
    id: 3,
    title: "Actionable Triggers",
    description: "Insights are pushed directly to your workflow. Create a Jira ticket, alert the CEO via Slack, or export a roadmap report in one click.",
    icon: <LayoutGrid className="w-6 h-6 text-pink-400" />,
  },
];

const Card = ({ step, index, isActive }) => {
  // Determine alignment based on index for the stepped layout
  const alignmentClass = 
    index === 0 ? "self-start ml-4 lg:ml-48" : 
    index === 1 ? "self-center" : 
    "self-end mr-4 lg:mr-48";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 + 0.5 }}
      className={`
        relative z-10 w-full max-w-[350px] lg:max-w-[400px] p-6 rounded-2xl border transition-all duration-500
        ${alignmentClass}
        ${isActive 
          ? 'bg-slate-800/80 border-amber-400/50 shadow-[0_0_30px_rgba(251,191,36,0.2)]' 
          : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'
        }
        backdrop-blur-xl flex flex-col gap-3 group
      `}
    >
      {/* Glow Effect Background */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="flex items-center gap-4">
        <div className={`
          p-3 rounded-xl border 
          ${isActive ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-800 border-slate-700'}
          transition-colors duration-300
        `}>
          {step.icon}
        </div>
        <div>
          <h3 className={`text-lg font-bold ${isActive ? 'text-amber-100' : 'text-slate-200'}`}>
            {step.id}. {step.title}
          </h3>
          <p className="text-sm text-slate-400">{step.description}</p>
        </div>
      </div>
      
      {/* Connector Node Indicators */}
      {/* Left Node */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-700 z-20 flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400' : 'bg-slate-600'} transition-colors duration-500`} />
      </div>
      {/* Right Node */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-700 z-20 flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400' : 'bg-slate-600'} transition-colors duration-500`} />
      </div>
    </motion.div>
  );
};

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (steps.length + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Constants for layout
  const cardHeight = 120;
  const gapY = 80;
  const svgWidth = 1000; // Virtual width for SVG coordinate system
  const totalHeight = steps.length * cardHeight + (steps.length - 1) * gapY;
  
  // Refined Path Generation for Left -> Center -> Right flow
  const generatePath = () => {
    // Coordinates based on a 1000px wide SVG canvas
    // Left Card Center X ~ 200
    // Center Card Center X ~ 500
    // Right Card Center X ~ 800
    
    const startY = cardHeight / 2;
    const stepY = cardHeight + gapY;

    // Define the "Snake" points - Extended for more horizontal spread on desktop
    const p1 = { xStart: -100, xEnd: 400, y: startY }; // Left Step - starts far left, extends right
    const p2 = { xStart: 250, xEnd: 750, y: startY + stepY }; // Center Step - wide horizontal span
    const p3 = { xStart: 600, xEnd: 1150, y: startY + stepY * 2 }; // Right Step - extends far right

    // Construct path
    // 1. Line through first card (Left)
    let d = `M ${p1.xStart} ${p1.y} L ${p1.xEnd} ${p1.y}`;

    // 2. Curve to second card (Center)
    // Bezier curve from end of P1 to start of P2
    d += ` C ${p1.xEnd + 100} ${p1.y}, ${p2.xStart - 100} ${p2.y}, ${p2.xStart} ${p2.y}`;

    // 3. Line through second card
    d += ` L ${p2.xEnd} ${p2.y}`;

    // 4. Curve to third card (Right)
    // Bezier curve from end of P2 to start of P3
    d += ` C ${p2.xEnd + 100} ${p2.y}, ${p3.xStart - 100} ${p3.y}, ${p3.xStart} ${p3.y}`;

    // 5. Line through third card and exit
    d += ` L ${p3.xEnd} ${p3.y}`;

    return d;
  };

  const pathData = generatePath();

  return (
    <div className="min-h-screen text-slate-200 flex flex-col items-center justify-center p-8 overflow-hidden font-sans selection:bg-amber-500/30">
      
            <div className="text-center mb-16 max-w-6xl mx-auto mt-32">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
                From Chaos to Clarity.
                <span className="text-[#C39B65]"> Instantly.</span>
              </h2>
              <p className="text-xl text-slate-400 animate-fade-in-up stagger-1 max-w-4xl mx-auto">
                Our agentic pipelines handle the heavy lifting so you can focus on strategy.
              </p>
            </div>

      <div className="relative w-full max-w-6xl flex justify-center">
        
        {/* SVG Background Layer */}
        <div className="absolute inset-0 pointer-events-none flex justify-center items-start">
            <svg 
                width="100%" 
                viewBox={`0 0 ${svgWidth} ${totalHeight}`}
                className="overflow-visible opacity-80 h-full"
                preserveAspectRatio="none"
                style={{ top: 0 }}
            >
                <defs>
                    <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                        <stop offset="50%" stopColor="#fcd34d" stopOpacity="1" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Base Track (Dotted Line) */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="#C39B65"
                    strokeWidth="4"
                    strokeDasharray="10 10"
                    strokeLinecap="round"
                    className="opacity-50"
                />

                 {/* Animated Beam */}
                 <motion.path
                    d={pathData}
                    fill="none"
                    stroke="url(#glow-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                        pathLength: [0, 1], 
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 6,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                 />

                 {/* Pulse Effect */}
                 <motion.path
                    d={pathData}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.1, pathOffset: 0, opacity: 0 }}
                    animate={{ 
                        pathOffset: [0, 1],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                 />
            </svg>
        </div>

        {/* Cards Layer */}
        {/* We use w-full to allow the cards to spread out using self-* classes */}
        <div className="flex flex-col gap-[80px] w-full z-10 relative px-4 md:px-0">
          {steps.map((step, index) => (
            <Card 
                key={step.id}
                step={step} 
                index={index}
                isActive={activeStep === index || activeStep === steps.length}
            />
          ))}
        </div>

      </div>
    </div>
  );
}