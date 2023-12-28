import * as THREE from "three";

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
import createPhotoFrame from "./objects/interior/photo_frame.js";
import createClock from "./objects/interior/clock.js";

export default function createScene(camera) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7da1df);
  let openBook, closedBook, lamp, windowObj;

  const elementsToAddToScene = [
    {
      createSceneElement: createFloor,
      rotation: new THREE.Euler(-Math.PI / 2),
    },
    { createSceneElement: createDoorWall },
    {
      createSceneElement: () => {
        const windowWall = createWindowWall();
        windowObj = windowWall.children[4];
        return windowWall;
      },
    },
    { createSceneElement: () => toggleWindow(camera) },
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
      createSceneElement: () => toggleBook(camera),
    },
    {
      createSceneElement: () => toggleLamp(camera),
    },
    {
      createSceneElement: createPhotoFrame,
      position: new THREE.Vector3(-1.85, 1.5, -2.35),
    },
    {
      createSceneElement: createClock,
      position: new THREE.Vector3(-2.89, 1.6, -1.3),
      rotation: new THREE.Euler(0, Math.PI / 2),
    },
    {
      createSceneElement: () => hoverOverClickableObjects(camera),
    },
  ];

  function toggleWindow(camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener(
      "click",
      (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (windowObj) {
          const windowIntersects = raycaster.intersectObjects([windowObj]);

          if (windowIntersects.length > 0) {
            windowObj.children[8].visible = !windowObj.children[8].visible;
            windowObj.children[9].visible = !windowObj.children[9].visible;
          }
        }
      },
      false
    );
  }

  function toggleBook(camera) {
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

  function toggleLamp(camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const lampOnMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lampOffMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

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
            lamp.children[2].children[12].material = lampOnMaterial;
          } else {
            lamp.children[2].children[12].material = lampOffMaterial;
          }
        }
      },
      false
    );
  }

  function hoverOverClickableObjects(camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener(
      "mousemove",
      (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (openBook && closedBook && lamp && windowObj) {
          const intersects = raycaster.intersectObjects([
            openBook,
            closedBook,
            lamp,
            windowObj,
          ]);

          if (intersects.length > 0) {
            document.body.style.cursor = "pointer";
          } else {
            document.body.style.cursor = "default";
          }
        }
      },
      false
    );
  }

  return { scene, elementsToAddToScene };
}
