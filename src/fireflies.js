import * as THREE from "three";

let points, positions;

export function createFireflies(scene) {
  const count = 100;

  const geo = new THREE.BufferGeometry();
  positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = Math.random() * 5 + 1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xfff2aa,
    size: 0.2,
    transparent: true,
    opacity: 0.9,
  });

  points = new THREE.Points(geo, mat);
  scene.add(points);
}

export function updateFireflies(time) {
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] += Math.sin(time + i) * 0.002;
  }

  points.geometry.attributes.position.needsUpdate = true;
}
