import * as THREE from "three";
import { initWorld } from "./world.js";
import "./styles.css";

let renderer, scene, camera, clock;

init();

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance",
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    500,
  );

  clock = new THREE.Clock();

  const world = initWorld(scene, camera);

  let lastTime = 0;
  const FPS = 30;
  const frameTime = 1 / FPS;

  function animate(now = 0) {
    requestAnimationFrame(animate);

    const delta = (now - lastTime) / 1000;

    if (delta < frameTime) return;

    lastTime = now;

    world.update(delta);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.remove();
  });
  let frameCount = 0;
  let accTime = 0;

  function animate(now = 0) {
    requestAnimationFrame(animate);

    const delta = (now - lastTime) / 1000;
    if (delta < frameTime) return;

    lastTime = now;

    accTime += delta;
    frameCount++;

    if (accTime >= 2) {
      const fps = frameCount / accTime;

      if (fps < 28) {
        console.log("Dropping quality...");
        world.reduceQuality();
      }

      accTime = 0;
      frameCount = 0;
    }

    world.update(delta);
    renderer.render(scene, camera);
  }
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
