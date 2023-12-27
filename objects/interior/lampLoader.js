import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function createLamp() {
  return new Promise((resolve) => {
    new FBXLoader().load("../../assets/models/lamp.fbx", (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
      object.scale.set(0.01, 0.01, 0.01);
      resolve(object);
    });
  });
}
