import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function createCharacter() {
  return new Promise((resolve) => {
    new FBXLoader().load("../assets/models/Leonardo.fbx", (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          if (child.material) {
            child.material.transparent = false;
          }
        }
      });
      object.scale.set(0.01, 0.01, 0.01);
      resolve(object);
    });
  });
}
