import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function createDesk() {
  const deskWoodTexture = new THREE.TextureLoader().load(
    "./assets/models/txt/wood_desk.jpg"
  );
  deskWoodTexture.wrapS = THREE.RepeatWrapping;
  deskWoodTexture.wrapT = THREE.RepeatWrapping;
  deskWoodTexture.repeat.set(2, 1);
  return new Promise((resolve) => {
    new FBXLoader().load("./assets/models/desk.fbx", (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
        if (child.name === "Karlby_Counter_Top") {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xd2bdb7,
            map: deskWoodTexture,
          });
        } else if (
          child.name === "Alex_Unit" ||
          child.name === "Alex_Unit001"
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xe0e0e0,
          });
        }
      });
      object.scale.set(0.01, 0.01, 0.01);
      resolve(object);
    });
  });
}
