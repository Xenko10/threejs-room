import * as THREE from "three";

export default function createPoster() {
  const image = new THREE.TextureLoader().load("./assets/img/poster.jpg");
  const poster = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 1.6),
    new THREE.MeshStandardMaterial({
      map: image,
    })
  );
  poster.receiveShadow = true;
  poster.position.set(0, 0, 0.015);
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.6, 0.025),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
    })
  );
  frame.castShadow = true;
  frame.receiveShadow = true;

  const posterWithFrame = new THREE.Group();
  posterWithFrame.add(poster, frame);
  return posterWithFrame;
}
