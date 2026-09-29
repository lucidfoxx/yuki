import * as THREE from 'three';

export function setupAtmosphere(scene) {

  scene.fog = new THREE.Fog(0xffd6e8, 20, 120);

  const skyGeo = new THREE.SphereGeometry(200, 32, 32);
  const skyMat = new THREE.MeshBasicMaterial({
    color: 0xffe4f2,
    side: THREE.BackSide
  });

  const sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);
}