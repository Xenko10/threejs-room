import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7da1df);
// scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4, 2, 1.5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = -3;
controls.maxDistance = 10;

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

const loader = new THREE.TextureLoader();
const fbxLoader = new FBXLoader();

// textures

const wallTexture = loader.load("./assets/img/wall.jpg");

const deskWoodTexture = loader.load("./assets/models/txt/wood_desk.jpg");
deskWoodTexture.wrapS = THREE.RepeatWrapping;
deskWoodTexture.wrapT = THREE.RepeatWrapping;
deskWoodTexture.repeat.set(2, 1);

const floorTexture = loader.load("./assets/img/floor.jpg");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(5, 3);

const woodTexture = loader.load("./assets/models/txt/wood.jpg");
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(3, 3);

// meshes

const floor = new THREE.Mesh(
  new THREE.BoxGeometry(6.2, 5.2, 0.2),
  new THREE.MeshStandardMaterial({
    color: 0x807169,
    map: floorTexture,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const windowWall = new THREE.Group();
const windowInTheWall = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 1, 0.01),
  new THREE.MeshPhongMaterial({
    color: 0xacdde7,
    transparent: true,
    opacity: 0.25,
  })
);
windowInTheWall.position.set(0.05, 1.5, -2.5);
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
  windowInTheWall
);

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

const walls = new THREE.Group();
walls.add(doorWall, windowWall);

doorWall.children.forEach((wall) => {
  wall.receiveShadow = true;
  wall.castShadow = true;
});

windowWall.children.forEach((wall) => {
  wall.receiveShadow = true;
  wall.castShadow = true;
});

windowInTheWall.receiveShadow = false;
windowInTheWall.castShadow = false;

windowWall.children[0].position.set(-1.8, 1.35, -2.5);
windowWall.children[1].position.set(1.9, 1.35, -2.5);
windowWall.children[2].position.set(0, 0.55, -2.5);
windowWall.children[3].position.set(0, 2.3, -2.5);
scene.add(walls);

fbxLoader.load(
  "./assets/models/door.fbx",
  (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
      }
      if (child.name === "Door1" || child.name === "Frame2") {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x8f6147,
        });
      } else {
        child.material = new THREE.MeshStandardMaterial({ color: 0xdfe0e3 });
      }
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(-2.9, 0.1, 1.5);
    object.rotation.y = Math.PI;
    scene.add(object);
  },
  (xhr) => {
    console.log("Door: " + (xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

fbxLoader.load(
  "./assets/models/bed.fbx",
  (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
      }
      if (child.name === "Plane002") {
        child.material = new THREE.MeshStandardMaterial({ color: 0xcbcfd5 });
      } else if (child.name === "Cube") {
        child.material = new THREE.MeshStandardMaterial({ color: 0x969696 });
      } else if (child.name === "Cube002" || child.name === "Cube003") {
        child.material = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
      } else if (child.name === "Cube001") {
        child.material = new THREE.MeshStandardMaterial({ color: 0xedf6f9 });
      } else if (child.name === "Cube004") {
        child.material = new THREE.MeshStandardMaterial({ color: 0xd4d4d4 });
      }
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.rotation.y = Math.PI / 2;
    object.position.set(-4.75, 0.08, 0.8);
    scene.add(object);
  },
  (xhr) => {
    console.log("Bed: " + (xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

fbxLoader.load(
  "./assets/models/desk.fbx",
  (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
      }
      if (child.name === "Karlby_Counter_Top") {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xd2bdb7,
          map: deskWoodTexture,
        });
      } else if (child.name === "Alex_Unit" || child.name === "Alex_Unit001") {
        child.material = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
      }
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(0.05, 0.1, -2);
    object.rotation.y = Math.PI / 2;
    scene.add(object);
  },
  (xhr) => {
    console.log("Desk: " + (xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

fbxLoader.load(
  "./assets/models/chair.fbx",
  (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
      }
      if (child.name === "leather") {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x616161,
          metalness: 0.5,
          roughness: 0.1,
        });
      } else if (child.name === "leggy") {
        child.material[0] = new THREE.MeshStandardMaterial({
          color: 0x474747,
        });
        child.material[1] = new THREE.MeshStandardMaterial({
          color: 0xcbcfd5,
        });
      } else {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xcbcfd5,
        });
      }
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(-0.25, -0.075, -1.75);
    object.rotation.y = Math.PI;
    scene.add(object);
  },
  (xhr) => {
    console.log("Chair: " + (xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

fbxLoader.load(
  "./assets/models/wardrobe.fbx",
  (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
      }
      if (
        child.name === "Group_002" ||
        child.name === "Group_003" ||
        child.name === "Group_004" ||
        child.name === "Group_005"
      ) {
        child.material = new THREE.MeshStandardMaterial({ color: 0xb8b8b8 });
      } else {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xa5908a,
          map: woodTexture,
        });
      }
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(2.2, 0.1, -2);
    scene.add(object);
  },
  (xhr) => {
    console.log("Wardrobe: " + (xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

// lights

const pointLight = new THREE.PointLight(0xffffff, 0.75, 25);
pointLight.castShadow = true;
pointLight.position.set(0, 2, 0);
scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
directionalLight.castShadow = true;
directionalLight.position.set(-0.5, 2, -6);
scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);

const ambientLight = new THREE.AmbientLight(0x404040, 2);

scene.add(ambientLight);

//  functions

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
