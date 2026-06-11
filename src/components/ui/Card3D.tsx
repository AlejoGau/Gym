'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3D({ children, className = '' }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values to track mouse relative position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft springs to make the movement fluid and premium
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative mouse coordinates from [-0.5, 0.5]
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const relativeX = (mouseX / width) - 0.5;
    const relativeY = (mouseY / height) - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  }

  function handleMouseLeave() {
    // Return to original state when mouse leaves
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      <div 
        style={{ 
          transform: 'translateZ(15px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
