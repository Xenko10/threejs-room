import * as THREE from "three";

export default function createPhotoFrame() {
  const image = new THREE.TextureLoader().load("../../assets/img/photo.jpg");
  const photo = new THREE.Mesh(
    new THREE.PlaneGeometry(0.275, 0.275),
    new THREE.MeshStandardMaterial({
      map: image,
    })
  );
  photo.castShadow = true;
  photo.receiveShadow = true;
  photo.position.set(0, 0.25, -0.01);

  const frame = new THREE.Group();
  frame.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.025, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.275, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.025, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.275, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    )
  );
  frame.children[0].position.set(0, 0.4);
  frame.children[1].position.set(-0.1375, 0.25);
  frame.children[2].position.set(0, 0.1);
  frame.children[3].position.set(0.1375, 0.25);

  frame.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

  const frameWithPhoto = new THREE.Group();
  frameWithPhoto.add(frame, photo);

  return frameWithPhoto;
}
