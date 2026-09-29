import * as THREE from 'three';

let distance = 6;
let height = 2;

export function setupCamera(camera, player) {
  camera.position.set(0, 3, 6);
}

export function updateCamera(camera, player, delta, controls) {

  // horizontal rotation
  const angle = controls.camX;

  // vertical rotation (proper clamp)
  controls.camY = Math.max(-0.5, Math.min(1.2, controls.camY));
  const pitch = controls.camY;

  const offsetX = Math.sin(angle) * distance;
  const offsetZ = Math.cos(angle) * distance;

  const offsetY = height + pitch * 4;

  const target = new THREE.Vector3(
    player.position.x + offsetX,
    player.position.y + offsetY,
    player.position.z + offsetZ
  );

  camera.position.lerp(target, 0.1);

  camera.lookAt(
    player.position.x,
    player.position.y + 1,
    player.position.z
  );
}