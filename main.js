import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

import createFloor from "./objects/layout/floor.js";
import createWindowWall from "./objects/layout/windowWall.js";
import createDoorWall from "./objects/layout/doorWall.js";
import createBed from "./objects/interior/bed.js";
import createDesk from "./objects/interior/desk.js";
import createChair from "./objects/interior/chair.js";
import createWardrobe from "./objects/interior/wardrobe.js";

import setupLights from "./objects/lights.js";

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

async function loadInterior() {
  const floor = createFloor();
  scene.add(floor);
  const doorWall = createDoorWall();
  scene.add(doorWall);
  const windowWall = createWindowWall();
  scene.add(windowWall);
  const lights = setupLights();
  scene.add(lights);
  const bed = await createBed();
  bed.position.set(-4.75, 0.08, 0.8);
  bed.rotation.y = Math.PI / 2;
  scene.add(bed);
  const desk = await createDesk();
  desk.position.set(0.05, 0.1, -2);
  desk.rotation.y = Math.PI / 2;
  scene.add(desk);
  const chair = await createChair();
  chair.position.set(-0.25, -0.075, -1.75);
  chair.rotation.y = Math.PI;
  scene.add(chair);
  const wardrobe = await createWardrobe();
  wardrobe.position.set(2.2, 0.1, -2);
  scene.add(wardrobe);
}

loadInterior();

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

document.body.appendChild(stats.dom);
animate();
