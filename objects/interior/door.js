import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function createDoor() {
  return new Promise((resolve, reject) => {
    new FBXLoader().load(
      "../../assets/models/door.fbx",
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
          }
          if (child.name === "Door1" || child.name === "Frame2") {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x8f6147,
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdfe0e3,
            });
          }
        });
        object.scale.set(0.01, 0.01, 0.01);
        object.rotation.y = Math.PI;
        resolve(object);
      },
      (xhr) => {
        console.log("Door: " + (xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
}
