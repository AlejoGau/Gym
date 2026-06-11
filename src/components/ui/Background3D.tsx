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
    // Increased ambient light for better overall visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const primaryColor = new THREE.Color(config.primary);
    const secondaryColor = new THREE.Color(config.secondary);
    const accentColor = new THREE.Color(config.accent);

    // Dynamic adjustment to guarantee particles are visible even if button text is dark
    const accentHSL = { h: 0, s: 0, l: 0 };
    accentColor.getHSL(accentHSL);
    if (accentHSL.l < 0.4) {
      accentColor.setHSL(accentHSL.h, Math.max(accentHSL.s, 0.8), 0.6);
    }

    // Directional light to hit the metallic surfaces and plates
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    // Focused light close to the dumbbell
    const dumbbellLight = new THREE.PointLight(0xffffff, 30, 15);
    dumbbellLight.position.set(3, 2, 4);
    scene.add(dumbbellLight);

    // Glowing dynamic point lights
    const pointLight = new THREE.PointLight(primaryColor, 200, 50);
    pointLight.position.set(6, 4, 6);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(secondaryColor, 120, 40);
    pointLight2.position.set(-6, -4, 4);
    scene.add(pointLight2);

    // 5. Create Procedural 3D Dumbbell Group
    const dumbbellGroup = new THREE.Group();

    // Steel Handle Bar
    const handleGeom = new THREE.CylinderGeometry(0.1, 0.1, 2.4, 16);
    handleGeom.rotateZ(Math.PI / 2); // Orient horizontally
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f2,
      metalness: 0.95,
      roughness: 0.08,
      bumpScale: 0.05
    });
    const handleMesh = new THREE.Mesh(handleGeom, handleMat);
    dumbbellGroup.add(handleMesh);

    // Weight Plates Materials (Lighter Metallic Grey for maximum visibility and dynamic glows)
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x3d3d40,
      metalness: 0.85,
      roughness: 0.2
    });

    const glowRingMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      emissive: primaryColor,
      emissiveIntensity: 2.2,
      roughness: 0.15,
      metalness: 0.8
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

    // 5b. Create Brand Caps on the Flat Ends of the Dumbbell Plates
    const capCanvas = document.createElement('canvas');
    capCanvas.width = 256;
    capCanvas.height = 256;
    const capCtx = capCanvas.getContext('2d');

    const drawBrandCap = (img?: HTMLImageElement) => {
      if (!capCtx) return;

      // Dark steel plate background
      capCtx.fillStyle = '#222224';
      capCtx.beginPath();
      capCtx.arc(128, 128, 128, 0, Math.PI * 2);
      capCtx.fill();

      // Sleek dynamic brand primary border ring
      capCtx.strokeStyle = config.primary;
      capCtx.lineWidth = 10;
      capCtx.beginPath();
      capCtx.arc(128, 128, 118, 0, Math.PI * 2);
      capCtx.stroke();

      // Subtle inner light ring
      capCtx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      capCtx.lineWidth = 3;
      capCtx.beginPath();
      capCtx.arc(128, 128, 106, 0, Math.PI * 2);
      capCtx.stroke();

      // Center Brand Content
      if (img) {
        // Center the uploaded brand logo image
        const maxDim = 120;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        const x = 128 - w / 2;
        const y = 128 - h / 2;
        capCtx.drawImage(img, x, y, w, h);
      } else {
        // Fallback Vector designs for presets or dynamic initials emblem
        const logoLower = (config.logo || '').toLowerCase();
        if (logoLower === 'bolt' || !logoLower) {
          // Rayo (Bolt) Vector path
          capCtx.fillStyle = config.primary;
          capCtx.beginPath();
          capCtx.moveTo(128, 55);
          capCtx.lineTo(92, 134);
          capCtx.lineTo(122, 134);
          capCtx.lineTo(112, 201);
          capCtx.lineTo(164, 122);
          capCtx.lineTo(134, 122);
          capCtx.closePath();
          capCtx.fill();
        } else if (logoLower === 'fitness_center') {
          // Mancuerna (Dumbbell) Vector path
          capCtx.fillStyle = '#ffffff';
          capCtx.fillRect(90, 108, 12, 40); // left plate
          capCtx.fillRect(154, 108, 12, 40); // right plate
          capCtx.fillRect(102, 124, 52, 8); // handle bar
          // small inner plates
          capCtx.fillStyle = config.primary;
          capCtx.fillRect(102, 114, 6, 28);
          capCtx.fillRect(148, 114, 6, 28);
        } else if (logoLower === 'shield') {
          // Escudo (Shield) Vector path
          capCtx.fillStyle = config.primary;
          capCtx.beginPath();
          capCtx.moveTo(128, 65);
          capCtx.lineTo(165, 65);
          capCtx.quadraticCurveTo(165, 128, 128, 182);
          capCtx.quadraticCurveTo(91, 128, 91, 65);
          capCtx.closePath();
          capCtx.fill();
          // Inner dot
          capCtx.fillStyle = '#ffffff';
          capCtx.beginPath();
          capCtx.arc(128, 115, 12, 0, Math.PI * 2);
          capCtx.fill();
        } else if (logoLower === 'monitoring') {
          // Cardio (Heartbeat) Vector path
          capCtx.strokeStyle = config.primary;
          capCtx.lineWidth = 8;
          capCtx.beginPath();
          capCtx.moveTo(70, 128);
          capCtx.lineTo(100, 128);
          capCtx.lineTo(112, 90);
          capCtx.lineTo(128, 170);
          capCtx.lineTo(140, 110);
          capCtx.lineTo(152, 136);
          capCtx.lineTo(164, 128);
          capCtx.lineTo(186, 128);
          capCtx.stroke();
        } else {
          // Fallback to gym initials (e.g. "FF")
          const initials = config.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
          capCtx.fillStyle = '#ffffff';
          capCtx.font = 'bold 74px Montserrat, sans-serif';
          capCtx.textAlign = 'center';
          capCtx.textBaseline = 'middle';
          capCtx.fillText(initials, 128, 128);
        }
      }
    };

    const brandTexture = new THREE.CanvasTexture(capCanvas);

    if (config.logo && (config.logo.startsWith('http') || config.logo.startsWith('/') || config.logo.includes('.') || config.logo.startsWith('data:image'))) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        drawBrandCap(img);
        brandTexture.needsUpdate = true;
      };
      img.src = config.logo;
    } else {
      drawBrandCap();
      brandTexture.needsUpdate = true;
    }

    const capGeom = new THREE.CircleGeometry(0.74, 32);
    const capMat = new THREE.MeshStandardMaterial({
      map: brandTexture,
      metalness: 0.85,
      roughness: 0.2
    });

    const leftCap = new THREE.Mesh(capGeom, capMat);
    leftCap.position.x = -1.01;
    leftCap.rotateY(-Math.PI / 2);
    dumbbellGroup.add(leftCap);

    const rightCap = new THREE.Mesh(capGeom, capMat);
    rightCap.position.x = 1.01;
    rightCap.rotateY(Math.PI / 2);
    dumbbellGroup.add(rightCap);

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
      color: accentColor,
      size: 0.10,
      transparent: true,
      opacity: 0.65,
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
      capGeom.dispose();
      particlesGeometry.dispose();

      // Dispose Materials
      handleMat.dispose();
      plateMat.dispose();
      glowRingMat.dispose();
      collarMat.dispose();
      capMat.dispose();
      particlesMaterial.dispose();

      // Dispose Texture
      brandTexture.dispose();
      
      renderer.dispose();
    };
  }, [config.primary, config.secondary]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#131313]">
      {/* Fallback canvas container */}
      {webGlSupported ? (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full block z-10 opacity-95"
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
