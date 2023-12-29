import * as THREE from "three";

import createFloor from "./objects/layout/floor.js";
import createWindowWall from "./objects/layout/windowWall.js";
import createDoorWall from "./objects/layout/doorWall.js";
import createDoorClosed from "./objects/interior/doorClosed.js";
import createDoorOpen from "./objects/interior/doorOpen.js";
import createBed from "./objects/interior/bed.js";
import createDesk from "./objects/interior/desk.js";
import createChair from "./objects/interior/chair.js";
import createWardrobe from "./objects/interior/wardrobe.js";
import createLights from "./objects/lights.js";
import createBookOpen from "./objects/interior/bookOpen.js";
import createBookClosed from "./objects/interior/bookClosed.js";
import lampWithLight from "./objects/layout/lampWithLight.js";
import createPhotoFrame from "./objects/interior/photoFrame.js";
import createClock from "./objects/interior/clock.js";
import createPoster from "./objects/interior/poster.js";
import character from "./objects/character.js";

export default function createScene(camera) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7da1df);
  let windowObj, rollerBlind, openBook, closedBook, lamp, doorClosed, doorOpen;

  const elementsToAddToScene = [
    {
      createSceneElement: createFloor,
      rotation: new THREE.Euler(-Math.PI / 2),
    },
    {
      createSceneElement: createDoorWall,
    },
    {
      createSceneElement: async () => {
        doorClosed = await createDoorClosed();
        return doorClosed;
      },
      position: new THREE.Vector3(-2.9, 0.1, 1.5),
      rotation: new THREE.Euler(0, Math.PI),
    },
    {
      createSceneElement: async () => {
        doorOpen = await createDoorOpen();
        doorOpen.visible = false;
        return doorOpen;
      },
      position: new THREE.Vector3(-2.9, 0.1, 1.5),
      rotation: new THREE.Euler(0, Math.PI),
    },
    {
      createSceneElement: () => toggleDoor(camera),
    },
    {
      createSceneElement: () => {
        const windowWall = createWindowWall();
        windowObj = windowWall.children[4];
        rollerBlind = windowObj.children[2];
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
        lamp = lampWithLight();
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
      position: new THREE.Vector3(-1.85, 1.5, -2.395),
    },
    {
      createSceneElement: createClock,
      position: new THREE.Vector3(-2.89, 1.9, 0.2),
      rotation: new THREE.Euler(0, Math.PI / 2),
    },
    {
      createSceneElement: () => hoverOverClickableObjects(camera),
    },
    {
      createSceneElement: createPoster,
      position: new THREE.Vector3(-2.885, 1.5, -1.5),
      rotation: new THREE.Euler(0, Math.PI / 2),
    },
    {
      createSceneElement: character,
      position: new THREE.Vector3(0.25, 0.1, 1.5),
      rotation: new THREE.Euler(0, Math.PI / 3),
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
            rollerBlind.children[2].visible = !rollerBlind.children[2].visible;
            rollerBlind.children[3].visible = !rollerBlind.children[3].visible;
          }
        }
      },
      false
    );
  }

  function toggleDoor(camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener(
      "click",
      (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (doorClosed && doorOpen) {
          const doorIntersects = raycaster.intersectObjects([
            doorClosed,
            doorOpen,
          ]);

          if (doorIntersects.length > 0) {
            doorClosed.visible = !doorClosed.visible;
            doorOpen.visible = !doorOpen.visible;
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

    let isLampOn = false;

    window.addEventListener(
      "click",
      (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const lampIntersects = raycaster.intersectObjects([lamp]);

        if (lampIntersects.length > 0) {
          if (isLampOn) {
            lamp.children[2].children[12].material = lampOffMaterial;
            lamp.children[0].visible = false;
            isLampOn = false;
          } else {
            lamp.children[2].children[12].material = lampOnMaterial;
            lamp.children[0].visible = true;
            isLampOn = true;
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

        if (
          openBook &&
          closedBook &&
          lamp &&
          windowObj &&
          doorClosed &&
          doorOpen
        ) {
          const intersects = raycaster.intersectObjects([
            openBook,
            closedBook,
            lamp,
            windowObj,
            doorClosed,
            doorOpen,
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
