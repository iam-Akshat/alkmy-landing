"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const InsightClustersVisual = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const nodes = containerRef.current.querySelectorAll('.cluster-node');
    const lines = containerRef.current.querySelectorAll('.cluster-line');
    const group = containerRef.current.querySelector('.cluster-group');

    // Float animation for the whole group
    gsap.to(group, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });

    // Individual node float
    nodes.forEach((node) => {
      gsap.to(node, {
        x: 'random(-10, 10)',
        y: 'random(-10, 10)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      // Pulse opacity
      gsap.to(node, {
        opacity: 'random(0.4, 1)',
        duration: 'random(1.5, 3)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Line animations
    lines.forEach((line) => {
      gsap.fromTo(line, 
        { strokeDasharray: 10, strokeDashoffset: 10 },
        { 
          strokeDashoffset: 0,
          duration: 'random(2, 5)',
          repeat: -1,
          ease: 'none'
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="clusterGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="rgba(195, 155, 101, 0.4)" />
              <stop offset="100%" stopColor="rgba(195, 155, 101, 0)" />
            </radialGradient>
          </defs>
          
          <g className="cluster-group" transform="translate(200, 150)">
            {/* Central Cluster */}
            <g transform="translate(-50, -30)">
               <line className="cluster-line" x1="0" y1="0" x2="40" y2="40" stroke="#C39B65" strokeWidth="0.5" opacity="0.4" />
               <line className="cluster-line" x1="40" y1="40" x2="80" y2="10" stroke="#C39B65" strokeWidth="0.5" opacity="0.4" />
               <line className="cluster-line" x1="40" y1="40" x2="20" y2="90" stroke="#C39B65" strokeWidth="0.5" opacity="0.4" />
               
               <circle className="cluster-node" cx="0" cy="0" r="3" fill="#C39B65" />
               <circle className="cluster-node" cx="40" cy="40" r="5" fill="#C39B65" />
               <circle className="cluster-node" cx="80" cy="10" r="3" fill="#C39B65" />
               <circle className="cluster-node" cx="20" cy="90" r="4" fill="#C39B65" />
            </g>

            {/* Secondary Cluster */}
            <g transform="translate(60, 40)">
               <line className="cluster-line" x1="0" y1="0" x2="30" y2="-30" stroke="#C39B65" strokeWidth="0.5" opacity="0.3" />
               <circle className="cluster-node" cx="0" cy="0" r="4" fill="#C39B65" />
               <circle className="cluster-node" cx="30" cy="-30" r="2" fill="#C39B65" />
            </g>
          </g>
          
          {/* Ambient Glow */}
          <circle cx="200" cy="150" r="120" fill="url(#clusterGlow)" opacity="0.2" />
        </svg>
      </div>
    </div>
  );
};

export const MarketRadarVisual = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const scanLine = containerRef.current.querySelector('.radar-scan');
    const blips = containerRef.current.querySelectorAll('.radar-blip');
    const rings = containerRef.current.querySelectorAll('.radar-ring');

    // Scan line rotation
    gsap.to(scanLine, {
      rotation: 360,
      svgOrigin: '100 100',
      duration: 4,
      repeat: -1,
      ease: 'none',
    });

    // Blip animations
    blips.forEach((blip, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: i * 1.2 });
      tl.to(blip, { opacity: 1, scale: 1.5, duration: 0.2, ease: 'power1.out' })
        .to(blip, { opacity: 0, scale: 0.5, duration: 1, ease: 'power1.in' });
    });

    // Ring pulse
    rings.forEach((ring, i) => {
      gsap.to(ring, {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        delay: i * 0.5,
        ease: 'sine.inOut'
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden">
      <div className="absolute w-[140%] h-[140%] opacity-20">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(195, 155, 101, 0)" />
              <stop offset="50%" stopColor="rgba(195, 155, 101, 0.5)" />
              <stop offset="100%" stopColor="rgba(195, 155, 101, 0)" />
            </linearGradient>
            <radialGradient id="radarGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="rgba(195, 155, 101, 0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Background Glow */}
          <circle cx="100" cy="100" r="80" fill="url(#radarGlow)" />

          {/* Grid Rings */}
          <circle className="radar-ring" cx="100" cy="100" r="30" fill="none" stroke="#C39B65" strokeWidth="0.5" opacity="0.1" />
          <circle className="radar-ring" cx="100" cy="100" r="60" fill="none" stroke="#C39B65" strokeWidth="0.5" opacity="0.1" />
          <circle className="radar-ring" cx="100" cy="100" r="90" fill="none" stroke="#C39B65" strokeWidth="0.5" opacity="0.1" />
          
          {/* Crosshairs */}
          <line x1="100" y1="10" x2="100" y2="190" stroke="#C39B65" strokeWidth="0.5" opacity="0.1" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#C39B65" strokeWidth="0.5" opacity="0.1" />

          {/* Scan Line - Using a gradient sector */}
          <path 
            className="radar-scan" 
            d="M100 100 L100 10 A90 90 0 0 1 145 22 Z" 
            fill="url(#scanGradient)" 
            opacity="0.4"
          />

          {/* Detected Blips */}
          <circle className="radar-blip" cx="130" cy="60" r="2" fill="#ef4444" opacity="0" />
          <circle className="radar-blip" cx="70" cy="140" r="2" fill="#ef4444" opacity="0" />
          <circle className="radar-blip" cx="150" cy="120" r="2" fill="#ef4444" opacity="0" />
          <circle className="radar-blip" cx="60" cy="80" r="2" fill="#ef4444" opacity="0" />

        </svg>
      </div>
    </div>
  );
};
