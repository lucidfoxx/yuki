import * as THREE from "three";

let water;

export function createWater(scene) {
  const geo = new THREE.PlaneGeometry(300, 300, 50, 50);
  geo.rotateX(-Math.PI / 2);

  const mat = new THREE.MeshBasicMaterial({
    color: 0x9fe4d9,
    transparent: true,
    opacity: 0.7,
    wireframe: false,
  });

  water = new THREE.Mesh(geo, mat);
  water.position.y = -1.2;

  scene.add(water);
}

export function updateWater(time) {
  const pos = water.geometry.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const y = Math.sin(i * 0.3 + time) * 0.1;
    pos.setY(i, y);
  }

  pos.needsUpdate = true;
}
