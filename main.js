import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

import createFloor from "./objects/layout/floor.js";
import createWindowWall from "./objects/layout/windowWall.js";
import createDoorWall from "./objects/layout/doorWall.js";
import createBed from "./objects/interior/bed.js";
import createDesk from "./objects/interior/desk.js";
import createChair from "./objects/interior/chair.js";

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

// textures

const woodTexture = new THREE.TextureLoader().load(
  "./assets/models/txt/wood.jpg"
);
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(3, 3);

// meshes

const floor = createFloor();
scene.add(floor);

const doorWall = createDoorWall();
const windowWall = createWindowWall();

scene.add(doorWall, windowWall);

async function loadBed() {
  const bed = await createBed();
  bed.position.set(-4.75, 0.08, 0.8);
  bed.rotation.y = Math.PI / 2;
  scene.add(bed);
}

loadBed();

async function loadDesk() {
  const desk = await createDesk();
  desk.position.set(0.05, 0.1, -2);
  desk.rotation.y = Math.PI / 2;
  scene.add(desk);
}

loadDesk();

async function loadChair() {
  const chair = await createChair();
  chair.position.set(-0.25, -0.075, -1.75);
  chair.rotation.y = Math.PI;
  scene.add(chair);
}

loadChair();

new FBXLoader().load(
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
