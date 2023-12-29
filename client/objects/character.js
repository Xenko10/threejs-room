import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GUI } from "dat.gui";

export default function createCharacter() {
  return new Promise((resolve) => {
    let character;
    let mixer;
    let modelReady = false;
    let activeAction;
    let lastAction;
    const animationActions = [];
    const gui = new GUI();

    const animationsFolder = gui.addFolder("Animations");

    const fbxLoader = new FBXLoader();

    fbxLoader.load("./assets/models/Leonardo.fbx", (object) => {
      object.traverse((child) => {
        object.scale.set(0.01, 0.01, 0.01);
        if (child.isMesh) {
          child.castShadow = true;
          if (child.material) {
            child.material.transparent = false;
          }
        }
      });
      character = object;
      resolve(object);
      mixer = new THREE.AnimationMixer(object);
      fbxLoader.load("./assets/models/Leonardo@standing_idle.fbx", (object) => {
        object.animations[0].tracks.shift();
        const animationAction = mixer.clipAction(object.animations[0]);
        activeAction = animationAction;
        animationAction.play();
        animationActions.push(animationAction);
        animationsFolder.add(animations, "idle");

        fbxLoader.load("./assets/models/Leonardo@hiphop.fbx", (object) => {
          object.animations[0].tracks.shift();
          const animationAction = mixer.clipAction(object.animations[0]);
          animationActions.push(animationAction);
          animationsFolder.add(animations, "hiphop");
          fbxLoader.load(
            "./assets/models/Leonardo@twistdance.fbx",
            (object) => {
              object.animations[0].tracks.shift();
              const animationAction = mixer.clipAction(object.animations[0]);
              animationActions.push(animationAction);
              animationsFolder.add(animations, "twistdance");
              fbxLoader.load("./assets/models/Leonardo@angry.fbx", (object) => {
                object.animations[0].tracks.shift();
                const animationAction = mixer.clipAction(object.animations[0]);
                animationActions.push(animationAction);
                animationsFolder.add(animations, "angry");
                fbxLoader.load(
                  "./assets/models/Leonardo@jabcross.fbx",
                  (object) => {
                    object.animations[0].tracks.shift();
                    const animationAction = mixer.clipAction(
                      object.animations[0]
                    );
                    animationActions.push(animationAction);
                    animationsFolder.add(animations, "jabcross");
                    modelReady = true;
                  }
                );
              });
            }
          );
        });
      });
    });

    const animations = {
      idle: () => {
        setAction(animationActions[0]);
        character.position.set(0.25, 0.1, 1.5);
      },
      hiphop: () => {
        setAction(animationActions[1]);
        character.position.set(0.25, 0.025, 1.5);
      },
      twistdance: () => {
        setAction(animationActions[2]);
        character.position.set(0.25, -0.025, 1.5);
      },
      angry: () => {
        setAction(animationActions[3]);
        character.position.set(0.25, 0.1, 1.5);
      },
      jabcross: () => {
        setAction(animationActions[4]);
        character.position.set(0.25, 0, 1.5);
      },
    };

    const setAction = (toAction) => {
      if (toAction != activeAction) {
        lastAction = activeAction;
        activeAction = toAction;
        lastAction.fadeOut(1);
        activeAction.reset();
        activeAction.fadeIn(1);
        activeAction.play();
      }
    };

    animationsFolder.open();

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (modelReady) mixer.update(clock.getDelta());
    }
    animate();
  });
}
