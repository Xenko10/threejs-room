import * as THREE from "three";

export default function createPhotoFrame() {
  const image = new THREE.TextureLoader().load("./assets/img/photo.jpg");
  const photo = new THREE.Mesh(
    new THREE.PlaneGeometry(0.35, 0.375),
    new THREE.MeshStandardMaterial({
      map: image,
    })
  );
  photo.receiveShadow = true;
  photo.position.set(0, 0.25);

  const frame = new THREE.Group();
  frame.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.025, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.375, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.025, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.375, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    )
  );
  frame.children[0].position.set(0, 0.45);
  frame.children[1].position.set(-0.1875, 0.25);
  frame.children[2].position.set(0, 0.05);
  frame.children[3].position.set(0.1875, 0.25);

  frame.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

  const frameWithPhoto = new THREE.Group();
  frameWithPhoto.add(frame, photo);

  return frameWithPhoto;
}
