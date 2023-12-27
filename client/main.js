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
import {
  setTotalItemsToLoad,
  updateProgressBar,
} from "./utils/loadingScreen.js";

let openBook, closedBook, lamp;

const elementsToAddToScene = [
  { createSceneElement: createFloor },
  { createSceneElement: createDoorWall },
  { createSceneElement: createWindowWall },
  { createSceneElement: createLights },
  {
    createSceneElement: createBed,
    position: new THREE.Vector3(-4.75, 0.08, 0.8),
    rotation: new THREE.Euler(0, Math.PI / 2),
  },
  {
    createSceneElement: createDesk,
    position: new THREE.Vector3(0.05, 0.1, -2),
    rotation: new THREE.Euler(0, Math.PI / 2),
  },
  {
    createSceneElement: createChair,
    position: new THREE.Vector3(-0.25, -0.075, -1.75),
    rotation: new THREE.Euler(0, Math.PI),
  },
  {
    createSceneElement: createWardrobe,
    position: new THREE.Vector3(2.2, 0.1, -2),
  },
  {
    createSceneElement: async () => {
      openBook = await createBookOpen();
      openBook.visible = false;
      return openBook;
    },
    position: new THREE.Vector3(0, 0.84, -1.9),
  },
  {
    createSceneElement: async () => {
      closedBook = await createBookClosed();
      return closedBook;
    },
    position: new THREE.Vector3(0, 0.845, -1.9),
  },
  {
    createSceneElement: () => {
      lamp = lampController();
      return lamp;
    },
    position: new THREE.Vector3(-0.6, 0.8385, -1.9),
  },
  {
    createSceneElement: toggleBook,
  },
  {
    createSceneElement: toggleLamp,
  },
];

setTotalItemsToLoad(elementsToAddToScene.length + 1);

updateProgressBar();

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

function toggleBook() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener(
    "click",
    (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      if (openBook && closedBook) {
        const bookIntersects = raycaster.intersectObjects([
          openBook,
          closedBook,
        ]);

        if (bookIntersects.length > 0) {
          if (openBook.visible) {
            openBook.visible = false;
            closedBook.visible = true;
          } else {
            openBook.visible = true;
            closedBook.visible = false;
          }
        }
      }
    },
    false
  );
}

function toggleLamp() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener(
    "click",
    (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const lampIntersects = raycaster.intersectObjects([lamp]);

      if (lampIntersects.length > 0) {
        lamp.children[0].visible = !lamp.children[0].visible;
        if (lamp.children[0].visible) {
          lamp.children[2].children[12].material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
          });
        } else {
          lamp.children[2].children[12].material =
            new THREE.MeshStandardMaterial({
              color: 0xffffff,
            });
        }
      }
    },
    false
  );
}

function loadSceneElements() {
  elementsToAddToScene.forEach(async (element) => {
    const { createSceneElement, position, rotation } = element;
    const sceneElement = await createSceneElement();
    if (sceneElement instanceof THREE.Object3D) {
      if (position) sceneElement.position.copy(position);
      if (rotation) sceneElement.rotation.copy(rotation);
      scene.add(sceneElement);
    }
    updateProgressBar();
  });

  document.body.appendChild(stats.dom);
  animate();
  updateProgressBar();
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

loadSceneElements();
