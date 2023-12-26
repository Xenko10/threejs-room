import * as THREE from "three";

export default function createWindow() {
  const window = new THREE.Group();

  window.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1, 0.01),
      new THREE.MeshPhongMaterial({
        color: 0xacdde7,
        transparent: true,
        opacity: 0.25,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.05, 0.25),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.075, 0.95, 0.05),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.05, 0.05),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.075, 0.95, 0.05),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.075, 0.95, 0.05),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    )
  );

  window.children[0].position.set(0, 1.5, -2.5);
  window.children[1].position.set(0, 1, -2.5);
  window.children[2].position.set(0, 1.475, -2.5);
  window.children[3].position.set(0, 1.975, -2.5);
  window.children[4].position.set(-0.675, 1.475, -2.5);
  window.children[5].position.set(0.675, 1.475, -2.5);

  window.children.forEach((wall) => {
    wall.receiveShadow = true;
    wall.castShadow = true;
  });

  window.children[0].castShadow = false;
  window.children[0].receiveShadow = false;

  return window;
}
