import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function createWardrobe() {
  const woodTexture = new THREE.TextureLoader().load(
    "./assets/models/txt/wood.jpg"
  );
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(3, 3);

  return new Promise((resolve, reject) => {
    new FBXLoader().load(
      "../../assets/models/wardrobe.fbx",
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            child.receiveShadow = true;
            child.castShadow = true;
          }
          if (
            child.name === "Group_002" ||
            child.name === "Group_003" ||
            child.name === "Group_004" ||
            child.name === "Group_005"
          ) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xb8b8b8,
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xa5908a,
              map: woodTexture,
            });
          }
        });
        object.scale.set(0.01, 0.01, 0.01);
        resolve(object);
      },
      (xhr) => {
        console.log("Wardrobe: " + (xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
}
