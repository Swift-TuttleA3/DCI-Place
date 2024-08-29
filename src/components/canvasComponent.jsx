import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { handleCanvasClick } from "./clickHandler";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const rendererRef = useRef(new THREE.WebGLRenderer());

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);

      // Event-Listener für das Klick-Ereignis hinzufügen
      const handleClick = (event) => {
        console.log("Canvas wurde angeklickt!");
        const rect = renderer.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        handleCanvasClick(x, y, 0xff0000, scene, camera);
      };

      canvasRef.current.addEventListener("click", handleClick);

      // Cleanup-Funktion, um den Event-Listener zu entfernen
      return () => {
        canvasRef.current.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return <div ref={canvasRef}></div>;
};

export default CanvasComponent;