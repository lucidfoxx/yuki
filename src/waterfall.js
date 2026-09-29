import * as THREE from 'three';

let waterfall;

export function createWaterfall(scene) {
  const geo = new THREE.PlaneGeometry(2, 6, 1, 10);

  const mat = new THREE.MeshBasicMaterial({
    color: 0xaeefff,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide
  });

  waterfall = new THREE.Mesh(geo, mat);

  waterfall.position.set(10, 3, -10);
  waterfall.rotation.y = Math.PI / 4;

  scene.add(waterfall);
}

export function updateWaterfall(time) {
  waterfall.position.y = 3 + Math.sin(time * 2) * 0.2;
}