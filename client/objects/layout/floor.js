import * as THREE from "three";

export default function createFloor() {
  const floorTexture = new THREE.TextureLoader().load("./assets/img/floor.jpg");
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(5, 3);
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(6.2, 5.2, 0.2),
    new THREE.MeshStandardMaterial({
      color: 0x807169,
      map: floorTexture,
    })
  );
  floor.receiveShadow = true;
  floor.castShadow = true;
  return floor;
}
