import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const fbxLoader = new FBXLoader();

export default function createBed() {
  return new Promise((resolve, reject) => {
    fbxLoader.load(
      "../../assets/models/bed.fbx",
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
          }
          if (child.name === "Plane002") {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xcbcfd5,
            });
          } else if (child.name === "Cube") {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x969696,
            });
          } else if (child.name === "Cube002" || child.name === "Cube003") {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xbbbbbb,
            });
          } else if (child.name === "Cube001") {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xedf6f9,
            });
          } else if (child.name === "Cube004") {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xd4d4d4,
            });
          }
        });
        object.scale.set(0.01, 0.01, 0.01);
        resolve(object);
      },
      (xhr) => {
        console.log("Bed: " + (xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
}
