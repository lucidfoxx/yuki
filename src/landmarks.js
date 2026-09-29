import * as THREE from 'three';
import { getHeight } from './terrain.js';

let sitSpots = [];

export function createLandmarks(scene) {

  sitSpots = [];

  const chairGeo = new THREE.BoxGeometry(1.2, 0.2, 1.2);
  const chairMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });

  const spots = [
    [0, 0],       // central meadow
    [6, -4],      // near torii area (if still exists)
    [-8, 5],      // side hill
    [10, 2]       // elevated view
  ];

  spots.forEach(([x, z]) => {

    const y = getHeight(x, z);

    const chair = new THREE.Mesh(chairGeo, chairMat);
    chair.position.set(x, y + 0.3, z);

    scene.add(chair);

    sitSpots.push({
      position: new THREE.Vector3(x, y + 0.3, z),
      occupied: false
    });
  });

  // 🌱 Optional: subtle stones instead of structures
  const stoneGeo = new THREE.DodecahedronGeometry(0.6);
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x999999 });

  for (let i = 0; i < 6; i++) {
    const x = (Math.random() - 0.5) * 30;
    const z = (Math.random() - 0.5) * 30;
    const y = getHeight(x, z);

    const stone = new THREE.Mesh(stoneGeo, stoneMat);
    stone.position.set(x, y + 0.2, z);
    stone.scale.setScalar(0.8 + Math.random());

    scene.add(stone);
  }
}

export function getSitSpots() {
  return sitSpots;
}