import * as THREE from 'three';

let offset = new THREE.Vector3(0, 3, 6);

export function setupCamera(camera, player) {
  camera.position.copy(player.position).add(offset);
}

export function updateCamera(camera, player, delta) {

  const target = player.position.clone().add(offset);

  camera.position.lerp(target, 0.1);

  camera.lookAt(player.position);
}