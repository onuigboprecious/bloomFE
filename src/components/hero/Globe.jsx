import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const latLonToVec3 = (lat, lon, radius = 2.4) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

export const Globe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 800;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    // Renderer (transparent background)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Main Group (Scaled up 3.8x for huge backdrop presence)
    const group = new THREE.Group();
    group.scale.set(3.8, 3.8, 3.8);
    scene.add(group);

    // Locations
    const RADIUS = 2.4;
    const homeCoords = { name: 'Abuja', lat: 9.0765, lon: 7.3986 };
    const destCoords = [
      { name: 'Lagos', lat: 6.5244, lon: 3.3792 },
      { name: 'Accra', lat: 5.6037, lon: -0.1870 },
      { name: 'Nairobi', lat: -1.2921, lon: 36.8219 },
      { name: 'Johannesburg', lat: -26.2041, lon: 28.0473 },
      { name: 'London', lat: 51.5074, lon: -0.1278 },
      { name: 'New York', lat: 40.7128, lon: -74.0060 },
      { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
      { name: 'Singapore', lat: 1.3521, lon: 103.8198 }
    ];

    const homeVec = latLonToVec3(homeCoords.lat, homeCoords.lon, RADIUS);

    // Home Node (Cyan)
    const homeGeo = new THREE.SphereGeometry(0.045, 24, 24);
    const homeMat = new THREE.MeshBasicMaterial({ color: 0x1cc3e8 });
    const homeMesh = new THREE.Mesh(homeGeo, homeMat);
    homeMesh.position.copy(homeVec);
    group.add(homeMesh);

    // Pulsing Ring for Home Node
    const ringGeo = new THREE.RingGeometry(0.035, 0.08, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x1cc3e8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(homeVec);
    ringMesh.lookAt(homeVec.clone().multiplyScalar(2));
    group.add(ringMesh);

    // Destination Nodes (Blue) & Arcs
    const destMat = new THREE.MeshBasicMaterial({ color: 0x3d5cff });
    const pulses = [];
    const geomsToDispose = [homeGeo, ringGeo];
    const matsToDispose = [homeMat, ringMat, destMat];

    destCoords.forEach((dest, i) => {
      const destVec = latLonToVec3(dest.lat, dest.lon, RADIUS);

      // Node Mesh
      const destGeo = new THREE.SphereGeometry(0.03, 20, 20);
      geomsToDispose.push(destGeo);
      const destMesh = new THREE.Mesh(destGeo, destMat);
      destMesh.position.copy(destVec);
      group.add(destMesh);

      // Arc Quadratic Bezier
      const dist = homeVec.distanceTo(destVec);
      const mid = homeVec.clone().add(destVec).multiplyScalar(0.5);
      const elevation = RADIUS + dist * 0.32;
      mid.normalize().multiplyScalar(elevation);

      const curve = new THREE.QuadraticBezierCurve3(homeVec, mid, destVec);
      const tubeGeo = new THREE.TubeGeometry(curve, 48, 0.005, 8, false);
      geomsToDispose.push(tubeGeo);

      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x1cc3e8,
        transparent: true,
        opacity: 0.6
      });
      matsToDispose.push(tubeMat);

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tubeMesh);

      // Traveling Light Pulse
      const pulseGeo = new THREE.SphereGeometry(0.022, 16, 16);
      geomsToDispose.push(pulseGeo);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0x1cc3e8,
        transparent: true,
        opacity: 1
      });
      matsToDispose.push(pulseMat);

      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      group.add(pulseMesh);

      pulses.push({
        mesh: pulseMesh,
        curve: curve,
        offset: (i * 0.14) % 1
      });
    });

    // Mouse Parallax Control
    let targetX = 0;
    let currentX = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      targetX = ((relativeY / rect.height) - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

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
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Auto rotation
      group.rotation.y += 0.0016;

      // Smooth Mouse Tilt
      currentX += (targetX - currentX) * 0.05;
      group.rotation.x = currentX;

      // Animate Home Ring Pulse
      const ringScale = 1 + Math.sin(elapsedTime * 3) * 0.35;
      ringMesh.scale.set(ringScale, ringScale, 1);
      ringMat.opacity = 0.4 + Math.sin(elapsedTime * 3) * 0.4;

      // Animate Traveling Light Pulses
      pulses.forEach((pulse) => {
        const t = (elapsedTime * 0.35 + pulse.offset) % 1;
        const pos = pulse.curve.getPoint(t);
        pulse.mesh.position.copy(pos);
        pulse.mesh.material.opacity = Math.sin(t * Math.PI);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      geomsToDispose.forEach((g) => g.dispose());
      matsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[600px] pointer-events-auto" />;
};

export default Globe;
