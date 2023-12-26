import * as THREE from "three";
import createWindowObj from "../interior/window.js";

const loader = new THREE.TextureLoader();
const wallTexture = loader.load("./assets/img/wall.jpg");

export default function createWindowWall() {
  const windowWall = new THREE.Group();
  const windowObj = createWindowObj();

  windowWall.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 2.5, 0.2),
      new THREE.MeshPhongMaterial({
        color: 0xd4d2d5,
        map: wallTexture,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 2.5, 0.2),
      new THREE.MeshPhongMaterial({
        color: 0xd4d2d5,
        map: wallTexture,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.9, 0.2),
      new THREE.MeshPhongMaterial({
        color: 0xd4d2d5,
        map: wallTexture,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.6, 0.2),
      new THREE.MeshPhongMaterial({
        color: 0xd4d2d5,
        map: wallTexture,
      })
    ),
    windowObj
  );

  windowWall.children.forEach((wall) => {
    wall.receiveShadow = true;
    wall.castShadow = true;
  });

  windowWall.children[0].position.set(-1.8, 1.35, -2.5);
  windowWall.children[1].position.set(1.9, 1.35, -2.5);
  windowWall.children[2].position.set(0, 0.55, -2.5);
  windowWall.children[3].position.set(0, 2.3, -2.5);

  return windowWall;
}
