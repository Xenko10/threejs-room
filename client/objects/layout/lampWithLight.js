import * as THREE from "three";
import createLamp from "../interior/lampLoader.js";

export default function lampController() {
  const lamp = new THREE.Group();

  async function loadLamp() {
    let lampObject = await createLamp();
    lamp.add(lampObject);
  }

  loadLamp();

  const spotLight = new THREE.SpotLight(0xffffff, 0.25, 5, Math.PI / 6, 0.25);
  spotLight.castShadow = true;
  const targetObject = new THREE.Object3D();
  spotLight.target = targetObject;
  spotLight.position.set(0.09, 0.26);
  targetObject.position.set(0.099, 0.25);
  spotLight.visible = false;
  lamp.add(spotLight, targetObject);

  return lamp;
}
