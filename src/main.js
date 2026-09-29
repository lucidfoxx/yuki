import * as THREE from 'three';
import { initWorld } from './world.js';
import './styles.css';

let renderer, scene, camera, clock;

init();

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance"
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);

  clock = new THREE.Clock();

  const world = initWorld(scene, camera);

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    world.update(delta);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}