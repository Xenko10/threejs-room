import * as THREE from "three";
import createDoor from "../interior/door.js";

export default function createDoorWall() {
  const wallTexture = new THREE.TextureLoader().load("./assets/img/wall.jpg");
  const doorWall = new THREE.Group();

  doorWall.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 2.5, 0.2),
      new THREE.MeshPhongMaterial({
        color: 0xd4d2d5,
        map: wallTexture,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(3.675, 2.5, 0.2),
      new THREE.MeshPhongMaterial({
        color: 0xd4d2d5,
        map: wallTexture,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.4, 0.2),
      new THREE.MeshPhongMaterial({
        color: 0xd4d2d5,
        map: wallTexture,
      })
    )
  );

  doorWall.children[0].position.set(-3, 1.35, 2.26);
  doorWall.children[0].rotation.y = Math.PI / 2;
  doorWall.children[1].position.set(-3, 1.35, -0.7625);
  doorWall.children[1].rotation.y = Math.PI / 2;
  doorWall.children[2].position.set(-3, 2.4, 1.5);
  doorWall.children[2].rotation.y = Math.PI / 2;

  async function loadDoor() {
    try {
      const door = await createDoor();
      door.position.set(-2.9, 0.1, 1.5);
      doorWall.add(door);
    } catch (error) {
      console.error("Error loading door:", error);
    }
  }

  loadDoor();

  return doorWall;
}
