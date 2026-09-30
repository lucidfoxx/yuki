import * as THREE from "three";

let sky;

export function setupAtmosphere(scene) {
  scene.fog = new THREE.Fog(0xffd6e8, 20, 120);

  const geo = new THREE.SphereGeometry(200, 32, 32);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffe4f2,
    side: THREE.BackSide,
  });

  sky = new THREE.Mesh(geo, mat);
  scene.add(sky);
}

export function updateAtmosphere(time, scene) {
  const t = (Math.sin(time * 0.05) + 1) / 2;

  const dayColor = new THREE.Color(0xffe4f2);
  const nightColor = new THREE.Color(0x1a1a2e);

  const current = dayColor.lerp(nightColor, t);

  sky.material.color.copy(current);
  scene.fog.color.copy(current);
}
