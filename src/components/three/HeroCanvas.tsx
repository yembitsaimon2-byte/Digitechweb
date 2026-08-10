'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroCanvas — Champ de particules Three.js très léger.
 * Import manuel Three.js (sans R3F) pour garder le contrôle total.
 * Mouvement lié à la souris, performance optimisée.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    let THREE: typeof import('three');
    let renderer: import('three').WebGLRenderer;
    let scene: import('three').Scene;
    let camera: import('three').PerspectiveCamera;
    let particles: import('three').Points;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!renderer || !camera) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    async function init() {
      THREE = await import('three');

      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvas!,
        alpha: true,
        antialias: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);

      // Scene & camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 1000);
      camera.position.z = 5;

      // Particles geometry
      const COUNT = prefersReduced ? 0 : 2000;
      const positions = new Float32Array(COUNT * 3);
      const sizes = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        const r = Math.random() * 8 + 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        sizes[i] = Math.random() * 2 + 0.5;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        color: 0xf5f0eb,
        size: 0.025,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Animation
      let t = 0;
      function animate() {
        animId = requestAnimationFrame(animate);
        t += 0.0004;

        if (particles) {
          particles.rotation.y = t + mouseX * 0.15;
          particles.rotation.x = mouseY * 0.08;
        }

        renderer.render(scene, camera);
      }

      animate();
    }

    init();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer?.dispose();
      scene?.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
