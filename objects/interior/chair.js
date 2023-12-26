import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function createChair() {
  return new Promise((resolve) => {
    new FBXLoader().load("../../assets/models/chair.fbx", (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
        if (child.name === "leather") {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x616161,
            metalness: 0.5,
            roughness: 0.1,
          });
        } else if (child.name === "leggy") {
          child.material[0] = new THREE.MeshStandardMaterial({
            color: 0x474747,
          });
          child.material[1] = new THREE.MeshStandardMaterial({
            color: 0xcbcfd5,
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xcbcfd5,
          });
        }
      });
      object.scale.set(0.01, 0.01, 0.01);
      resolve(object);
    });
  });
}
