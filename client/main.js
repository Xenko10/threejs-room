import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import createScene from "./createScene.js";
import {
  setTotalItemsToLoad,
  updateProgressBar,
} from "./utils/loadingScreen.js";

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(5.95, 3.4, 4.95);

const { scene, elementsToAddToScene } = createScene(camera);

setTotalItemsToLoad(elementsToAddToScene.length + 1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = -10;
controls.maxDistance = 10;
controls.target = new THREE.Vector3(1.9, 1.3, 1.3);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
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

  animate();
  updateProgressBar();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}

loadSceneElements();
