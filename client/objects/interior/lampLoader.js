import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function createLamp() {
  return new Promise((resolve) => {
    new FBXLoader().load("../../assets/models/lamp.fbx", (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
        if (child.name === "Sphere020") {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
          });
        }
      });
      object.scale.set(0.01, 0.01, 0.01);
      resolve(object);
    });
  });
}
