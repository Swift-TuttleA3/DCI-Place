import * as THREE from "three";

export const handleCanvasClick = (x, y, color, scene, camera) => {
  console.log("Canvas clicked at:", x, y);
  console.log("Color:", color);
  console.log("Scene:", scene);
  console.log("Camera:", camera);

  const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
  const dir = vector.sub(camera.position).normalize();
  const distance = -camera.position.z / dir.z;
  const pos = camera.position.clone().add(dir.multiplyScalar(distance));

  console.log("Vector:", vector);
  console.log("Direction:", dir);
  console.log("Distance:", distance);
  console.log("Position:", pos);

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const rect = new THREE.Mesh(geometry, material);
  rect.position.copy(pos);
  scene.add(rect);
};

export function handleButtonClick(color, index, setColor, setSelectedColorIndex) {
  console.log("Color:", color);
  console.log("Index:", index);

  setColor(color);
  setSelectedColorIndex(index);
}
