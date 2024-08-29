import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeCanvas = ({ colorRef }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5).unproject(cameraRef.current);
      const dir = vector.sub(cameraRef.current.position).normalize();
      const distance = -cameraRef.current.position.z / dir.z;
      const pos = cameraRef.current.position.clone().add(dir.multiplyScalar(distance));

      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: colorRef.current });
      const rectMesh = new THREE.Mesh(geometry, material);
      rectMesh.position.copy(pos);
      sceneRef.current.add(rectMesh);
    };

    if (rendererRef.current) {
      rendererRef.current.domElement.addEventListener("click", handleClick);
    }

    return () => {
      if (rendererRef.current) {
        rendererRef.current.domElement.removeEventListener("click", handleClick);
      }
    };
  }, [colorRef]);

  return <div ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ThreeCanvas;
