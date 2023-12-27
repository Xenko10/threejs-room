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
import createLights from "./objects/lights.js";
import createBookOpen from "./objects/interior/book_open.js";
import createBookClosed from "./objects/interior/book_closed.js";
import lampController from "./objects/layout/lampController.js";

let bookOpen, bookClosed, lamp;

const elementsToLoad = [
  { createFunction: createFloor },
  { createFunction: createDoorWall },
  { createFunction: createWindowWall },
  { createFunction: createLights },
  {
    createFunction: createBed,
    position: new THREE.Vector3(-4.75, 0.08, 0.8),
    rotation: new THREE.Euler(0, Math.PI / 2),
  },
  {
    createFunction: createDesk,
    position: new THREE.Vector3(0.05, 0.1, -2),
    rotation: new THREE.Euler(0, Math.PI / 2),
  },
  {
    createFunction: createChair,
    position: new THREE.Vector3(-0.25, -0.075, -1.75),
    rotation: new THREE.Euler(0, Math.PI),
  },
  {
    createFunction: createWardrobe,
    position: new THREE.Vector3(2.2, 0.1, -2),
  },
  {
    createFunction: async () => {
      bookOpen = await createBookOpen();
      bookOpen.visible = false;
      return bookOpen;
    },
    position: new THREE.Vector3(0, 0.84, -1.9),
  },
  {
    createFunction: async () => {
      bookClosed = await createBookClosed();
      return bookClosed;
    },
    position: new THREE.Vector3(0, 0.845, -1.9),
  },
  {
    createFunction: () => {
      lamp = lampController();
      return lamp;
    },
    position: new THREE.Vector3(-0.5, 0.8385, -1.9),
  },
];

let itemsLoaded = 0;
const totalItemsToLoad = elementsToLoad.length + 1;

const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.querySelector(".progress-bar-container");

function itemLoaded() {
  itemsLoaded++;
  progressBar.value = (itemsLoaded / totalItemsToLoad) * 100;
  if (itemsLoaded === totalItemsToLoad) {
    progressBarContainer.remove();
  }
}

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

function handleBookClick() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([bookOpen, bookClosed]);

      if (intersects.length > 0) {
        if (bookOpen.visible) {
          bookOpen.visible = false;
          bookClosed.visible = true;
        } else {
          bookOpen.visible = true;
          bookClosed.visible = false;
        }
      }
    },
    false
  );
}

function loadInterior() {
  elementsToLoad.forEach(async (element) => {
    const { createFunction, position, rotation } = element;
    const loadedItem = await createFunction();
    if (position) loadedItem.position.copy(position);
    if (rotation) loadedItem.rotation.copy(rotation);
    scene.add(loadedItem);
    itemLoaded();
  });

  handleBookClick();

  document.body.appendChild(stats.dom);
  animate();
  itemLoaded();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

loadInterior();
