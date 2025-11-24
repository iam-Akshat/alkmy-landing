"use client";
import { useRef, useCallback, useState, useMemo, memo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './MagicBento.css';

import { BarChart2, ListTodo, BrainCircuit, Radar, Network, ShieldCheck } from 'lucide-react';
import { InsightClustersVisual, MarketRadarVisual } from './BentoVisuals';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 100;
const DEFAULT_GLOW_COLOR = '195, 155, 101';
const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    color: '#ffffff16',
    title: 'Top Pain Points',
    description: 'Immediate prioritization for engineering',
    label: 'Insights',
    icon: BarChart2
  },
  {
    color: '#ffffff16',
    title: 'Feature Wishlist',
    description: 'See what users want and turn workarounds into features.',
    label: 'Roadmap Planning',
    icon: ListTodo
  },
  {
    color: '#ffffff16',
    title: 'Knowledge on Auto-Pilot',
    description: 'AI-driven grouping of user feedback into actionable thematic patterns by sentiment and volume.',
    label: 'Insight Clusters',
    icon: BrainCircuit,
    visual: <InsightClustersVisual />
  },
  {
    color: '#ffffff16',
    description: 'Be ahead, Understand your competitors weaknesses and offensively target them.',
    title: 'Discover Market Vulnerabilities and Opportunities',
    label: 'Market Radar',
    icon: Radar,
    visual: <MarketRadarVisual />
  },
  {
    color: '#ffffff16',
    title: 'Integrations',
    description: 'Connect all your tools and data sources in one click',
    label: 'Connectivity',
    icon: Network
  },
  {
    color: '#ffffff16',
    title: 'Security',
    description: 'Enterprise-grade protection for your Data',
    label: 'Protection',
    icon: ShieldCheck
  }
];

// Optimized particle creation with object pooling concept
const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    will-change: transform, opacity;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

// Memoized calculation
const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

// Batch DOM updates for better performance
const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  // Batch style updates
  card.style.cssText += `
    --glow-x: ${relativeX}%;
    --glow-y: ${relativeY}%;
    --glow-intensity: ${glow};
    --glow-radius: ${radius}px;
  `;
};

const ParticleCard = memo(({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const animationsRef = useRef([]);
  const rafRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    // Cancel RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Clear timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Kill all GSAP animations
    animationsRef.current.forEach(anim => anim?.kill());
    animationsRef.current = [];

    // Remove particles with animation
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        const enterAnim = gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
        animationsRef.current.push(enterAnim);

        const moveAnim = gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });
        animationsRef.current.push(moveAnim);

        const pulseAnim = gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
        animationsRef.current.push(pulseAnim);
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useGSAP(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;
    let tiltAnimation = null;
    let magnetAnimation = null;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        tiltAnimation = gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (tiltAnimation) {
        tiltAnimation.kill();
        tiltAnimation = gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (magnetAnimation) {
        magnetAnimation.kill();
        magnetAnimation = gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    // Throttled mouse move using RAF
    let isScheduled = false;
    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;
      if (isScheduled) return;

      isScheduled = true;
      rafRef.current = requestAnimationFrame(() => {
        isScheduled = false;

        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        if (enableTilt) {
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;

          if (tiltAnimation) tiltAnimation.kill();
          tiltAnimation = gsap.to(element, {
            rotateX,
            rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
            overwrite: true
          });
        }

        if (enableMagnetism) {
          const magnetX = (x - centerX) * 0.05;
          const magnetY = (y - centerY) * 0.05;

          if (magnetAnimation) magnetAnimation.kill();
          magnetAnimation = gsap.to(element, {
            x: magnetX,
            y: magnetY,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true
          });
        }
      });
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
        will-change: transform, opacity;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
      tiltAnimation?.kill();
      magnetAnimation?.kill();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden', willChange: 'transform' }}
    >
      {children}
    </div>
  );
});
ParticleCard.displayName = 'ParticleCard';

const GlobalSpotlight = memo(({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);
  const rafRef = useRef(null);
  const cachedCards = useRef([]);
  const spotlightValues = useMemo(() => calculateSpotlightValues(spotlightRadius), [spotlightRadius]);

  useGSAP(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      will-change: transform, opacity;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    // Cache card elements
    cachedCards.current = Array.from(gridRef.current.querySelectorAll('.magic-bento-card'));

    let isScheduled = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const updateSpotlight = () => {
      if (!spotlightRef.current || !isInsideSection.current) return;

      const { proximity, fadeDistance } = spotlightValues;
      let minDistance = Infinity;

      cachedCards.current.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(lastMouseX - centerX, lastMouseY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card, lastMouseX, lastMouseY, glowIntensity, spotlightRadius);
      });

      // Update spotlight position
      gsap.set(spotlightRef.current, {
        left: lastMouseX,
        top: lastMouseY
      });

      const targetOpacity = minDistance <= proximity
        ? 0.8
        : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
          : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out',
        overwrite: true
      });
    };

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      isInsideSection.current = mouseInside || false;

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cachedCards.current.forEach((card) => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      // Throttle using RAF
      if (!isScheduled) {
        isScheduled = true;
        rafRef.current = requestAnimationFrame(() => {
          isScheduled = false;
          updateSpotlight();
        });
      }
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      cachedCards.current.forEach((card) => {
        card.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor, spotlightValues]);

  return null;
});
GlobalSpotlight.displayName = 'GlobalSpotlight';

const BentoCardGrid = memo(({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
));
BentoCardGrid.displayName = 'BentoCardGrid';

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useGSAP(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  // Memoize class names
  const baseClassName = useMemo(
    () => `magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`,
    [textAutoHide, enableBorderGlow]
  );

  // Memoize card style
  const getCardStyle = useCallback(
    (card) => ({
      backgroundColor: card.color,
      '--glow-color': glowColor
    }),
    [glowColor]
  );

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => (
          <ParticleCard
            key={index}
            className={baseClassName}
            style={getCardStyle(card)}
            disableAnimations={shouldDisableAnimations || !enableStars}
            particleCount={enableStars ? particleCount : 0}
            glowColor={glowColor}
            enableTilt={enableTilt}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
          >
            {card.visual}
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">{card.label}</div>
            </div>
            <div className="magic-bento-card__content">
              {card.icon && <card.icon className="w-8 h-8 text-[#C39B65] mb-4" />}
              <h2 className="magic-bento-card__title">{card.title}</h2>
              <p className="magic-bento-card__description">{card.description}</p>
            </div>
          </ParticleCard>
        ))}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
