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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
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

// meshes

const floorTexture = loader.load("./assets/img/floor.jpg");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(5, 3); // Adjust the repeat values as needed

const floor = new THREE.Mesh(
  new THREE.BoxGeometry(6.2, 5.2, 0.2),
  new THREE.MeshPhongMaterial({
    map: floorTexture,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wallTexture = loader.load("./assets/img/wall.jpg");

const walls = new THREE.Group();
walls.add(
  new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 2.5, 0.2),
    new THREE.MeshPhongMaterial({
      map: wallTexture,
    })
  ),
  new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 2.5, 0.2),
    new THREE.MeshPhongMaterial({
      map: wallTexture,
    })
  ),
  new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 2.5, 0.2),
    new THREE.MeshPhongMaterial({
      map: wallTexture,
    })
  ),
  new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.9, 0.2),
    new THREE.MeshPhongMaterial({
      map: wallTexture,
    })
  ),
  new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.6, 0.2),
    new THREE.MeshPhongMaterial({
      map: wallTexture,
    })
  )
);

walls.children.forEach((wall) => {
  wall.receiveShadow = true;
  wall.castShadow = true;
});

walls.children[0].position.x = -3;
walls.children[0].position.y = 1.35;
walls.children[0].rotation.y = Math.PI / 2;
walls.children[1].position.x = -1.8;
walls.children[1].position.y = 1.35;
walls.children[1].position.z = -2.5;
walls.children[2].position.x = 1.9;
walls.children[2].position.y = 1.35;
walls.children[2].position.z = -2.5;
walls.children[3].position.y = 0.55;
walls.children[3].position.z = -2.5;
walls.children[4].position.y = 2.3;
walls.children[4].position.z = -2.5;
scene.add(walls);

const wallWindow = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 1, 0.01),
  new THREE.MeshPhongMaterial({
    color: 0xacdde7,
    transparent: true,
    opacity: 0.25,
  })
);
wallWindow.position.x = 0.05;
wallWindow.position.y = 1.5;
wallWindow.position.z = -2.5;
scene.add(wallWindow);

fbxLoader.load(
  "./assets/models/door.fbx",
  (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhongMaterial();
        child.receiveShadow = true;
      }
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(-2.9, 0, 1.5);
    object.rotation.y = Math.PI;
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

fbxLoader.load(
  "./assets/models/bed.fbx",
  (object) => {
    object.traverse((child) => {
      child.receiveShadow = true;
      child.castShadow = true;
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.rotation.y = Math.PI / 2;
    object.position.set(-4.75, 0.08, 0.8);
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

fbxLoader.load(
  "./assets/models/desk.fbx",
  (object) => {
    object.traverse((child) => {
      child.receiveShadow = true;
      child.castShadow = true;
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(0.05, 0.1, -2);
    object.rotation.y = Math.PI / 2;
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

fbxLoader.load(
  "./assets/models/chair.fbx",
  (object) => {
    object.traverse((child) => {
      child.receiveShadow = true;
      child.castShadow = true;
    });
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(-0.25, -0.1, -1.75);
    object.rotation.y = Math.PI;
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
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
        child.material = new THREE.MeshPhongMaterial();
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });
    object.scale.set(0.001, 0.001, 0.001);
    object.position.set(2.2, 0.1, -2);
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

// lights

const pointLight = new THREE.PointLight(0xffffff, 1, 50);
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

const ambientLight = new THREE.AmbientLight(0x404040, 3);

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
