import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SimpleThreeCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Szene, Kamera und Renderer initialisieren
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Quadrat () in der Mitte der Szene hinzufügen
    const geometry = new THREE.BoxGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Kamera positionieren
    camera.position.z = 5;

    // Render-Funktion
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup-Funktion
    return () => {
      while (canvasRef.current.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default SimpleThreeCanvas;