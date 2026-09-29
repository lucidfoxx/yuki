import * as THREE from "three";

let distance = 6;
let height = 3;

export function setupCamera(camera, player) {
  camera.position.set(0, 3, 6);
}

export function updateCamera(camera, player, delta, controls) {
  const angle = controls.camX;
  const pitch = Math.max(-0.5, Math.min(0.8, controls.camY));
  const offsetX = Math.sin(angle) * distance;
  const offsetZ = Math.cos(angle) * distance;

  const targetPos = new THREE.Vector3(
    player.position.x + offsetX,
    player.position.y + height + pitch * 5,
    player.position.z + offsetZ,
  );

  camera.position.lerp(targetPos, 0.1);
  camera.lookAt(player.position.x, player.position.y + 1, player.position.z);
}
