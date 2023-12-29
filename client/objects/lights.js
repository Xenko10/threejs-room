import * as THREE from "three";

export default function createLights() {
  const lights = new THREE.Group();

  const pointLight = new THREE.PointLight(0xffffff, 0.75, 25);
  pointLight.castShadow = true;
  pointLight.position.set(0, 2);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight.castShadow = true;
  directionalLight.position.set(-0.5, 2, -6);

  const ambientLight = new THREE.AmbientLight(0x404040, 2);

  lights.add(pointLight, directionalLight, ambientLight);
  return lights;
}
