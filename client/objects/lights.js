import * as THREE from "three";

export default function createLights() {
  const lights = new THREE.Group();

  const pointLight = new THREE.PointLight(0xffffff, 1, 50);
  pointLight.position.set(3.5, 2.1, 2.5);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight.castShadow = true;
  directionalLight.position.set(-0.5, 2, -6);

  const ambientLight = new THREE.AmbientLight(0x404040, 5);

  lights.add(pointLight, directionalLight, ambientLight);
  return lights;
}
