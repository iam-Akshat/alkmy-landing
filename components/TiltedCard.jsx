"use client";
import { useRef, useState, useCallback, memo } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './TiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

const captionSpringValues = {
  stiffness: 350,
  damping: 30,
  mass: 1
};

/**
 * @param {Object} props
 * @param {string} props.imageSrc
 * @param {string} [props.altText]
 * @param {string} [props.captionText]
 * @param {string} [props.containerHeight]
 * @param {string} [props.containerWidth]
 * @param {string} [props.imageHeight]
 * @param {string} [props.imageWidth]
 * @param {number} [props.scaleOnHover]
 * @param {number} [props.rotateAmplitude]
 * @param {boolean} [props.showMobileWarning]
 * @param {boolean} [props.showTooltip]
 * @param {React.ReactNode} [props.overlayContent]
 * @param {boolean} [props.displayOverlayContent]
 */
const TiltedCard = memo(function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const lastYRef = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, captionSpringValues);

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;

    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Throttle with RAF
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
      const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

      rotateX.set(rotationX);
      rotateY.set(rotationY);

      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);

      const velocityY = offsetY - lastYRef.current;
      rotateFigcaption.set(-velocityY * 0.6);
      lastYRef.current = offsetY;
    });
  }, [rotateAmplitude, rotateX, rotateY, rotateFigcaption, x, y]);

  const handleMouseEnter = useCallback(() => {
    scale.set(scaleOnHover);
    opacity.set(1);
  }, [scale, scaleOnHover, opacity]);

  const handleMouseLeave = useCallback(() => {
    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    lastYRef.current = 0;
  }, [opacity, scale, rotateX, rotateY, rotateFigcaption]);

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
        willChange: 'transform'
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
          willChange: 'transform'
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
            willChange: 'transform, opacity'
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
});

export default TiltedCard;
