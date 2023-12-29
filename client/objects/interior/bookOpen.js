import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function createBookOpen() {
  return new Promise((resolve) => {
    new FBXLoader().load("./assets/models/book_open.fbx", (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
        object.scale.set(0.002, 0.002, 0.002);
        resolve(object);
      });
    });
  });
}
