'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GymConfig } from '@/lib/config';
import HeroCssBackground from './HeroCssBackground';

interface Hero3DBackgroundProps {
  config: GymConfig;
}

export default function Hero3DBackground({ config }: Hero3DBackgroundProps) {
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

    // 3. Initialize Scene, Camera, and Renderer
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

    // 4. Initialize Lights with Dynamic Brand Colors
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const primaryColor = new THREE.Color(config.primary);
    
    // Dynamic Point Light matching primary color
    const pointLight = new THREE.PointLight(primaryColor, 150, 40);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Subtle Secondary Light for contrast
    const secondaryColor = new THREE.Color(config.secondary);
    const pointLight2 = new THREE.PointLight(secondaryColor, 80, 40);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // 5. Create Dynamic Morphing Object (Glassmorphic Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(2.2, 0.6, 150, 20);
    const material = new THREE.MeshPhysicalMaterial({
      color: primaryColor,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6, // Glassmorphism transmission
      thickness: 1.2,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // 6. Create Soft Floating Particles
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Position particles in a bounding box
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 7. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!prefersReducedMotion) {
        const elapsedTime = clock.getElapsedTime();

        // Slow morphing and rotation
        torusKnot.rotation.x = elapsedTime * 0.08;
        torusKnot.rotation.y = elapsedTime * 0.05;
        
        // Gentle pulsation scaling
        const scale = 1 + Math.sin(elapsedTime * 0.4) * 0.06;
        torusKnot.scale.set(scale, scale, scale);

        // Slow particle drift
        const positionsArr = particlesGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particlesCount; i++) {
          positionsArr[i * 3 + 1] -= 0.003; // Slowly drift down
          // If particle goes off screen bottom, reset to top
          if (positionsArr[i * 3 + 1] < -10) {
            positionsArr[i * 3 + 1] = 10;
          }
          // Drift sideways slightly
          positionsArr[i * 3] += Math.sin(elapsedTime + i) * 0.001;
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        particles.rotation.y = elapsedTime * 0.01;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 10. Cleanup on Unmount (Memory Leak Prevention)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      
      // Dispose materials & geometries
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [config.primary, config.secondary]);

  // If WebGL is not supported, fall back to the CSS background immediately
  if (!webGlSupported) {
    return <HeroCssBackground config={config} />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 bg-[#131313] overflow-hidden">
      {/* Fallback rendering behind the canvas in case loading takes time */}
      <HeroCssBackground config={config} />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block z-10 opacity-70"
      />
      
      {/* Horizon overlay to blend the 3D canvas bottom edge with section break */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none" />
    </div>
  );
}
