import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();
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
const objLoader = new OBJLoader();

// meshes

const floorTexture = loader.load("./img/floor.jpg");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(5, 3); // Adjust the repeat values as needed

const floor = new THREE.Mesh(
  new THREE.BoxGeometry(5.2, 4.2, 0.2),
  new THREE.MeshPhongMaterial({
    map: floorTexture,
  })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wallTexture = loader.load("./img/wall.jpg");

const walls = new THREE.Group();
walls.add(
  new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 2.5, 0.2),
    new THREE.MeshPhongMaterial({
      map: wallTexture,
    })
  ),
  new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 2.5, 0.2),
    new THREE.MeshPhongMaterial({
      map: wallTexture,
    })
  )
);
walls.children[0].position.y = 1.35;
walls.children[0].position.z = -2;
walls.children[1].position.x = -2.5;
walls.children[1].position.y = 1.35;
walls.children[1].rotation.y = Math.PI / 2;
scene.add(walls);

objLoader.load(
  "models/door.obj",
  (object) => {
    object.traverse((child) => {
      object.position.set(-2.4, 0, 1);
      child.castShadow = true;
      child.receiveShadow = true;
    });
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

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
directionalLight.position.set(2.5, 2.5, 1);
scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);

const ambientLight = new THREE.AmbientLight(0x404040, 5);

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
