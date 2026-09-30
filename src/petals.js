import * as THREE from "three";

let petals, positions;

export function createPetals(scene) {
  const count = 300;

  const geo = new THREE.BufferGeometry();
  positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = Math.random() * 10 + 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xffc1d9,
    size: 0.15,
    transparent: true,
    opacity: 0.8,
  });

  petals = new THREE.Points(geo, mat);
  scene.add(petals);
}

export function updatePetals(delta) {
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] -= 0.5 * delta; // fall
    positions[i] += Math.sin(i) * 0.001; // drift

    if (positions[i + 1] < 0) {
      positions[i + 1] = Math.random() * 10 + 5;
    }
  }

  petals.geometry.attributes.position.needsUpdate = true;
}
