'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GymConfig } from '@/lib/config';
import { useScroll, useTransform, motion } from 'framer-motion';

interface Background3DProps {
  config: GymConfig;
}

export default function Background3D({ config }: Background3DProps) {
  const { scrollY: framerScrollY } = useScroll();

  // Scroll mapping for the CSS perspective grid planes
  const gridY = useTransform(framerScrollY, [0, 4000], [0, -800]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    // 1. WebGL Availability Check
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGlSupported(false);
      return;
    }

    if (!containerRef.current || !canvasRef.current) return;

    // 2. Setup Dimensions
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    // 3. Initialize Scene, Camera, and WebGLRenderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Initialize Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const primaryColor = new THREE.Color(config.primary);
    const secondaryColor = new THREE.Color(config.secondary);

    // Glowing dynamic point lights
    const pointLight = new THREE.PointLight(primaryColor, 180, 50);
    pointLight.position.set(6, 4, 6);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(secondaryColor, 100, 40);
    pointLight2.position.set(-6, -4, 4);
    scene.add(pointLight2);

    // 5. Create Procedural 3D Dumbbell Group
    const dumbbellGroup = new THREE.Group();

    // Steel Handle Bar
    const handleGeom = new THREE.CylinderGeometry(0.1, 0.1, 2.4, 16);
    handleGeom.rotateZ(Math.PI / 2); // Orient horizontally
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      metalness: 0.9,
      roughness: 0.15,
      bumpScale: 0.05
    });
    const handleMesh = new THREE.Mesh(handleGeom, handleMat);
    dumbbellGroup.add(handleMesh);

    // Weight Plates Materials (Matte Dark Steel and Glowing Brand Accents)
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      metalness: 0.7,
      roughness: 0.4
    });

    const glowRingMat = new THREE.MeshPhysicalMaterial({
      color: primaryColor,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });

    // Assembling Weight Plates on Left and Right Ends
    const platePositions = [-0.9, -0.65, 0.65, 0.9];
    const plateGeometries = [
      new THREE.CylinderGeometry(0.75, 0.75, 0.2, 32), // Outer large plate
      new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32)     // Inner medium plate
    ];

    // Left outer plate
    const leftPlate1 = new THREE.Mesh(plateGeometries[0], plateMat);
    leftPlate1.position.x = -0.9;
    leftPlate1.rotateZ(Math.PI / 2);
    dumbbellGroup.add(leftPlate1);

    // Left inner plate
    const leftPlate2 = new THREE.Mesh(plateGeometries[1], plateMat);
    leftPlate2.position.x = -0.68;
    leftPlate2.rotateZ(Math.PI / 2);
    dumbbellGroup.add(leftPlate2);

    // Right inner plate
    const rightPlate2 = leftPlate2.clone();
    rightPlate2.position.x = 0.68;
    dumbbellGroup.add(rightPlate2);

    // Right outer plate
    const rightPlate1 = leftPlate1.clone();
    rightPlate1.position.x = 0.9;
    dumbbellGroup.add(rightPlate1);

    // Dynamic glowing wireframe rings on the outer plates for premium tech-gym aesthetic
    const ringGeom = new THREE.TorusGeometry(0.78, 0.06, 16, 64);
    ringGeom.rotateY(Math.PI / 2);

    const leftGlow = new THREE.Mesh(ringGeom, glowRingMat);
    leftGlow.position.x = -0.9;
    dumbbellGroup.add(leftGlow);

    const rightGlow = leftGlow.clone();
    rightGlow.position.x = 0.9;
    dumbbellGroup.add(rightGlow);

    // Collars/Locks next to the plates
    const collarGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16);
    collarGeom.rotateZ(Math.PI / 2);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x999999,
      metalness: 0.8,
      roughness: 0.2
    });

    const leftCollar = new THREE.Mesh(collarGeom, collarMat);
    leftCollar.position.x = -0.45;
    dumbbellGroup.add(leftCollar);

    const rightCollar = leftCollar.clone();
    rightCollar.position.x = 0.45;
    dumbbellGroup.add(rightCollar);

    // Place the Dumbbell Group in the scene (right-aligned in Hero section on desktop)
    const updateDumbbellPosition = (widthVal: number) => {
      if (widthVal < 768) {
        // Center-aligned for mobile screens, placed slightly behind text
        dumbbellGroup.position.set(0, 0.5, -1);
        dumbbellGroup.scale.set(0.7, 0.7, 0.7);
      } else {
        // Right-aligned for tablet/desktop
        dumbbellGroup.position.set(2.8, 0.8, 0);
        dumbbellGroup.scale.set(1, 1, 1);
      }
    };
    updateDumbbellPosition(width);
    scene.add(dumbbellGroup);

    // 6. Create Soft Floating Particles across the entire scroll height
    const particlesCount = 280;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22; // X width
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22; // Y height
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3; // Z depth
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.08,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 7. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 8. Animation & Scroll Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Idle Dumbbell Rotation
        dumbbellGroup.rotation.x = elapsedTime * 0.15;
        dumbbellGroup.rotation.z = elapsedTime * 0.08;

        // Apply scroll-parallax vertical translation and rotation to the Dumbbell
        dumbbellGroup.position.y = (width < 768 ? 0.5 : 0.8) + scrollY * 0.012;
        dumbbellGroup.rotation.y = elapsedTime * 0.1 + scrollY * 0.003;
        dumbbellGroup.rotation.x = elapsedTime * 0.15 + scrollY * 0.002;

        // Fade out and shrink the dumbbell as it scrolls past the Hero section
        const fadeLimit = 650;
        const fadeFactor = Math.max(0, 1 - scrollY / fadeLimit);
        const baseScale = width < 768 ? 0.7 : 1.0;
        dumbbellGroup.scale.set(
          baseScale * fadeFactor,
          baseScale * fadeFactor,
          baseScale * fadeFactor
        );

        // Slowly drift particles downward globally
        const positionsArr = particlesGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particlesCount; i++) {
          positionsArr[i * 3 + 1] -= 0.0035; // drift down
          // Loop particles when they fall off screen
          if (positionsArr[i * 3 + 1] < -11) {
            positionsArr[i * 3 + 1] = 11;
          }
          positionsArr[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.0012; // drift sideways
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        particles.rotation.y = elapsedTime * 0.012;
      } else {
        // Fallback for reduced motion: render static rotation/translation but reactive to scroll
        dumbbellGroup.position.y = (width < 768 ? 0.5 : 0.8) + scrollY * 0.012;
        const fadeLimit = 650;
        const fadeFactor = Math.max(0, 1 - scrollY / fadeLimit);
        const baseScale = width < 768 ? 0.7 : 1.0;
        dumbbellGroup.scale.set(
          baseScale * fadeFactor,
          baseScale * fadeFactor,
          baseScale * fadeFactor
        );
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 9. Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      updateDumbbellPosition(width);
    };

    window.addEventListener('resize', handleResize);

    // 10. Memory Cleanups on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries
      handleGeom.dispose();
      plateGeometries.forEach(g => g.dispose());
      ringGeom.dispose();
      collarGeom.dispose();
      particlesGeometry.dispose();

      // Dispose Materials
      handleMat.dispose();
      plateMat.dispose();
      glowRingMat.dispose();
      collarMat.dispose();
      particlesMaterial.dispose();
      
      renderer.dispose();
    };
  }, [config.primary, config.secondary]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#131313]">
      {/* Fallback canvas container */}
      {webGlSupported ? (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full block z-10 opacity-65"
        />
      ) : (
        // Static background fallback if WebGL is unavailable
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-10" 
          style={{ backgroundImage: `url(${config.image})` }}
        />
      )}

      {/* 3D Perspective Grid - Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[60vh] origin-bottom perspective-[1000px] overflow-hidden opacity-55 z-20">
        <motion.div
          style={{ 
            y: gridY,
            transformStyle: 'preserve-3d',
            rotateX: 75,
          }}
          className="w-[200%] h-[200%] -left-[50%] absolute grid-lines-3d"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      </div>

      {/* 3D Perspective Grid - Ceiling */}
      <div className="absolute top-0 left-0 w-full h-[40vh] origin-top perspective-[1000px] overflow-hidden opacity-25 z-20">
        <motion.div
          style={{ 
            y: useTransform(framerScrollY, [0, 4000], [0, 400]),
            transformStyle: 'preserve-3d',
            rotateX: -75,
          }}
          className="w-[200%] h-[200%] -left-[50%] absolute grid-lines-3d"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent z-10" />
      </div>
    </div>
  );
}
