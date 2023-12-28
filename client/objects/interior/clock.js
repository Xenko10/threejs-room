import * as THREE from "three";

export default function createClock() {
  const roman12 = new THREE.Group();
  roman12.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.1, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.1, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.09, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.09, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    )
  );
  roman12.children[0].rotation.z = Math.PI / 6;
  roman12.children[1].rotation.z = -Math.PI / 6;
  roman12.children[2].position.set(0.06, 0, 0);
  roman12.children[3].position.set(0.1, 0, 0);
  roman12.position.set(-0.05, 0.2, 0);

  const roman3 = new THREE.Group();
  roman3.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.09, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.09, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.09, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    )
  );
  roman3.children[0].position.set(0, 0, 0);
  roman3.children[1].position.set(0.03, 0, 0);
  roman3.children[2].position.set(0.06, 0, 0);
  roman3.position.set(0.18, 0, 0);

  const roman6 = new THREE.Group();
  roman6.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.1, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.1, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.09, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    )
  );
  roman6.children[0].rotation.z = Math.PI / 9;
  roman6.children[0].position.x = -0.03;
  roman6.children[1].rotation.z = -Math.PI / 9;
  roman6.children[1].position.x = 0;
  roman6.children[2].position.set(0.04, 0, 0);
  roman6.position.set(0, -0.2, 0);

  const roman9 = new THREE.Group();
  roman9.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.09, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.1, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.1, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    )
  );
  roman9.children[0].position.set(-0.06, 0, 0);
  roman9.children[1].rotation.z = Math.PI / 6;
  roman9.children[2].rotation.z = -Math.PI / 6;
  roman9.position.set(-0.18, 0, 0);
  const numbers = new THREE.Group();
  numbers.add(roman12, roman3, roman6, roman9);

  const clockHands = new THREE.Group();
  clockHands.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.1, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.25, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    ),
    new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.3, 0.03),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    )
  );

  function updateClockHands() {
    const date = new Date();

    const hourAngle = (date.getHours() / 12) * Math.PI * 2;
    clockHands.children[0].rotation.z = -hourAngle;

    clockHands.children[0].position.set(
      0.04 * Math.sin(hourAngle),
      0.04 * Math.cos(hourAngle),
      0
    );

    const minuteAngle = (date.getMinutes() / 60) * Math.PI * 2;
    clockHands.children[1].rotation.z = -minuteAngle;
    clockHands.children[1].position.set(
      0.12 * Math.sin(minuteAngle),
      0.12 * Math.cos(minuteAngle),
      0
    );

    const secondAngle = (date.getSeconds() / 60) * Math.PI * 2;
    clockHands.children[2].rotation.z = -secondAngle;
    clockHands.children[2].position.set(
      0.14 * Math.sin(secondAngle),
      0.14 * Math.cos(secondAngle),
      0
    );
  }

  const clock = new THREE.Group();
  clock.add(
    new THREE.Mesh(
      new THREE.CircleGeometry(0.3, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    ),
    new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.01, 32),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    ),
    numbers,
    clockHands
  );

  clock.children[0].receiveShadow = true;
  clock.children[0].castShadow = true;
  clock.children[1].receiveShadow = true;
  clock.children[1].castShadow = true;

  function animateClock() {
    updateClockHands();
    requestAnimationFrame(animateClock);
  }

  animateClock();
  return clock;
}
