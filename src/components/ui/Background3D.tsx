'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

export default function Background3D() {
  const { scrollY } = useScroll();

  // Scroll mapping for the 3D grid plane (creates "infinite movement" effect)
  const gridY = useTransform(scrollY, [0, 4000], [0, -800]);

  // Parallax scroll speeds for different floating 3D wireframe items (depth layering)
  const yShape1 = useTransform(scrollY, [0, 4000], [100, -900]);
  const rotateShape1 = useTransform(scrollY, [0, 4000], [0, 360]);

  const yShape2 = useTransform(scrollY, [0, 4000], [500, -300]);
  const rotateXShape2 = useTransform(scrollY, [0, 4000], [15, 200]);
  const rotateYShape2 = useTransform(scrollY, [0, 4000], [45, 315]);

  const yShape3 = useTransform(scrollY, [0, 4000], [1200, 100]);
  const rotateShape3 = useTransform(scrollY, [0, 4000], [0, -180]);

  const yShape4 = useTransform(scrollY, [0, 4000], [1800, 700]);
  const rotateXShape4 = useTransform(scrollY, [0, 4000], [0, 360]);

  const yShape5 = useTransform(scrollY, [0, 4000], [2500, 1200]);
  const rotateShape5 = useTransform(scrollY, [0, 4000], [0, 90]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#131313]">
      {/* 3D Perspective Grid - Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[60vh] origin-bottom perspective-[1000px] overflow-hidden opacity-60">
        <motion.div
          style={{ 
            y: gridY,
            transformStyle: 'preserve-3d',
            rotateX: 75,
          }}
          className="w-[200%] h-[200%] -left-[50%] absolute grid-lines-3d"
        />
        {/* Glow effect at the horizon */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      </div>

      {/* 3D Perspective Grid - Ceiling */}
      <div className="absolute top-0 left-0 w-full h-[40vh] origin-top perspective-[1000px] overflow-hidden opacity-30">
        <motion.div
          style={{ 
            y: useTransform(scrollY, [0, 4000], [0, 400]),
            transformStyle: 'preserve-3d',
            rotateX: -75,
          }}
          className="w-[200%] h-[200%] -left-[50%] absolute grid-lines-3d"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent z-10" />
      </div>

      {/* Floating 3D parallax wireframe shapes */}
      
      {/* Shape 1: Floating Wireframe Octagon - Top Left */}
      <motion.div
        style={{
          y: yShape1,
          rotate: rotateShape1,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="absolute left-[8%] w-32 h-32 border border-primary-fixed/15 rounded-[30%] flex items-center justify-center backdrop-blur-[2px]"
      >
        <div className="w-[80%] h-[80%] border border-primary-fixed/5 rounded-[30%] rotate-45" />
      </motion.div>

      {/* Shape 2: Floating 3D-tilted Cube Frame - Top Right */}
      <motion.div
        style={{
          y: yShape2,
          rotateX: rotateXShape2,
          rotateY: rotateYShape2,
          transformStyle: 'preserve-3d',
        }}
        className="absolute right-[10%] w-24 h-24 border border-secondary-container/20 rounded-lg flex items-center justify-center"
      >
        <div 
          style={{ transform: 'translateZ(20px)' }}
          className="w-16 h-16 border border-primary-fixed/25 rounded-md flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-primary-fixed/10 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
        </div>
      </motion.div>

      {/* Shape 3: Rotating Cross/Plus - Mid Left */}
      <motion.div
        style={{
          y: yShape3,
          rotate: rotateShape3,
        }}
        className="absolute left-[12%] w-20 h-20 flex items-center justify-center"
      >
        <div className="absolute w-full h-1 bg-primary-fixed/10 rounded-full" />
        <div className="absolute h-full w-1 bg-primary-fixed/10 rounded-full" />
      </motion.div>

      {/* Shape 4: Tilted Ring - Mid Right */}
      <motion.div
        style={{
          y: yShape4,
          rotateX: rotateXShape4,
          rotateY: 45,
          transformStyle: 'preserve-3d',
        }}
        className="absolute right-[6%] w-36 h-36 border-2 border-dashed border-secondary-container/10 rounded-full flex items-center justify-center"
      >
        <div className="w-[70%] h-[70%] border border-primary-fixed/15 rounded-full" />
      </motion.div>

      {/* Shape 5: Slow Hexagonal Ring - Bottom Left */}
      <motion.div
        style={{
          y: yShape5,
          rotate: rotateShape5,
        }}
        className="absolute left-[6%] w-28 h-28 border border-primary-fixed/10 clip-polygon flex items-center justify-center"
      >
        <div className="w-[85%] h-[85%] border border-secondary-container/15 rounded-md rotate-12" />
      </motion.div>
    </div>
  );
}
