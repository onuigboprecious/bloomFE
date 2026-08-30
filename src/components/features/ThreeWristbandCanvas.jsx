import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Helper function to create custom texture with "bloom." logo & NFC icon
const createWristbandTexture = (text, bgColor, textColor, isCyanLogo = false) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Logo Text
  ctx.fillStyle = textColor;
  ctx.font = 'bold 72px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw "bloom."
  ctx.fillText(text, canvas.width / 2 - 40, canvas.height / 2);

  // Draw NFC Icon signal arcs next to text
  const nfcX = canvas.width / 2 + 140;
  const nfcY = canvas.height / 2;
  
  ctx.lineWidth = 6;
  ctx.strokeStyle = textColor;

  // Signal waves
  [12, 22, 32].forEach((radius) => {
    ctx.beginPath();
    ctx.arc(nfcX, nfcY, radius, -Math.PI / 3, Math.PI / 3);
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
};

export const ThreeWristbandCanvas = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00bcff, 1.2);
    dirLight2.position.set(-5, -3, -5);
    scene.add(dirLight2);

    // Main Group
    const group = new THREE.Group();
    group.rotation.x = 0.35; // Initial tilt angle to showcase top & front
    group.rotation.z = -0.05;
    scene.add(group);

    // Textures
    const cyanTexture = createWristbandTexture('enlazer.', '#00BCFF', '#FFFFFF');
    const whiteTexture = createWristbandTexture('enlazer.', '#F8FAFC', '#00BCFF');

    // 1. TOP WRISTBAND (Cyan Blue)
    const bandGeo = new THREE.TorusGeometry(1.35, 0.28, 32, 100);
    bandGeo.scale(1.2, 0.32, 1.0); // Oval flattened shape

    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x00bcff,
      map: cyanTexture,
      roughness: 0.3,
      metalness: 0.15
    });

    const topBand = new THREE.Mesh(bandGeo, cyanMat);
    topBand.position.y = 0.38;
    group.add(topBand);

    // 2. BOTTOM WRISTBAND (Crisp White)
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      map: whiteTexture,
      roughness: 0.3,
      metalness: 0.1
    });

    const bottomBand = new THREE.Mesh(bandGeo, whiteMat);
    bottomBand.position.y = -0.38;
    group.add(bottomBand);

    // Metallic Buckle Accent Pins
    const pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.32, 16);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
    
    const topPin = new THREE.Mesh(pinGeo, pinMat);
    topPin.position.set(0, 0.38, 1.35);
    topPin.rotation.z = Math.PI / 2;
    group.add(topPin);

    const bottomPin = new THREE.Mesh(pinGeo, pinMat);
    bottomPin.position.set(0, -0.38, 1.35);
    bottomPin.rotation.z = Math.PI / 2;
    group.add(bottomPin);

    // Interactive Drag Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.35;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      previousMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = clientX - previousMouseX;
      const deltaY = clientY - previousMouseY;

      targetRotationY += deltaX * 0.012;
      targetRotationX += deltaY * 0.008;

      // Clamp X rotation to avoid flipping upside down
      targetRotationX = Math.max(-0.6, Math.min(1.0, targetRotationX));

      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth Auto Spin when user is not dragging
      if (!isDragging) {
        targetRotationY += 0.008;
      }

      // Smooth Damping
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.1;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-[400px] sm:h-[450px] cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
    >
      {/* Dynamic 3D Interaction Hint Badge */}
      <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-md border border-cyan-400/40 px-3 py-1 rounded-full text-[10px] font-extrabold text-cyan-300 shadow-lg pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-75'}`}>
        ✨ Drag to Turn 3D Wristbands
      </div>
    </div>
  );
};

export default ThreeWristbandCanvas;
