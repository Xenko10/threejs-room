import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

import createScene from "./createScene.js";
import {
  setTotalItemsToLoad,
  updateProgressBar,
} from "./utils/loadingScreen.js";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4, 2, 1.5);

const { scene, elementsToAddToScene } = createScene(camera);

setTotalItemsToLoad(elementsToAddToScene.length + 1);

updateProgressBar();

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
