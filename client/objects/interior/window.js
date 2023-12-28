import * as THREE from "three";

export default function createWindow() {
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 1, 0.01),
    new THREE.MeshPhongMaterial({
      color: 0xacdde7,
      transparent: true,
      opacity: 0.25,
    })
  );
  glass.position.set(0, 1.5, -2.5);

  const frame = new THREE.Group();
  frame.add(
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

  frame.children[0].position.set(0, 1, -2.5);
  frame.children[1].position.set(0, 1.475, -2.5);
  frame.children[2].position.set(0, 1.975, -2.5);
  frame.children[3].position.set(-0.675, 1.475, -2.5);
  frame.children[4].position.set(0.675, 1.475, -2.5);

  frame.children.forEach((framePart) => {
    framePart.castShadow = true;
    framePart.receiveShadow = true;
  });

  const rollerBlind = new THREE.Group();
  rollerBlind.add(
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

  rollerBlind.children[0].position.set(-0.35, 1.975, -2.45);
  rollerBlind.children[1].position.set(0.35, 1.975, -2.45);
  rollerBlind.children[2].position.set(-0.34, 1.475, -2.45);
  rollerBlind.children[3].position.set(0.34, 1.475, -2.45);

  rollerBlind.children[0].rotation.z = Math.PI / 2;
  rollerBlind.children[1].rotation.z = Math.PI / 2;

  rollerBlind.children[2].visible = false;
  rollerBlind.children[3].visible = false;

  rollerBlind.children.forEach((rollerBlindPart) => {
    rollerBlindPart.castShadow = true;
    rollerBlindPart.receiveShadow = true;
  });

  const windowObj = new THREE.Group();
  windowObj.add(glass, frame, rollerBlind);

  return windowObj;
}
