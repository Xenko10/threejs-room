import * as THREE from "three";

export default function createWindow() {
  const windowObj = new THREE.Group();

  windowObj.add(
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
    ),
    new THREE.Mesh(
      new THREE.CapsuleGeometry(0.03, 0.6),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.CapsuleGeometry(0.03, 0.6),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.95, 0.05),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.95, 0.05),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
      })
    )
  );

  windowObj.children[0].position.set(0, 1.5, -2.5);
  windowObj.children[1].position.set(0, 1, -2.5);
  windowObj.children[2].position.set(0, 1.475, -2.5);
  windowObj.children[3].position.set(0, 1.975, -2.5);
  windowObj.children[4].position.set(-0.675, 1.475, -2.5);
  windowObj.children[5].position.set(0.675, 1.475, -2.5);
  windowObj.children[6].position.set(-0.35, 1.975, -2.45);
  windowObj.children[7].position.set(0.35, 1.975, -2.45);
  windowObj.children[8].position.set(-0.34, 1.475, -2.45);
  windowObj.children[9].position.set(0.34, 1.475, -2.45);

  windowObj.children[6].rotation.z = Math.PI / 2;
  windowObj.children[7].rotation.z = Math.PI / 2;

  windowObj.children[8].visible = false;
  windowObj.children[9].visible = false;

  windowObj.children.forEach((wall) => {
    wall.receiveShadow = true;
    wall.castShadow = true;
  });

  windowObj.children[0].castShadow = false;
  windowObj.children[0].receiveShadow = false;

  return windowObj;
}
