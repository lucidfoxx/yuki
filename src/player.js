import * as THREE from 'three';
import { getHeight } from './terrain.js';

export function createPlayer(scene) {

  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1.2, 0.3),
    new THREE.MeshStandardMaterial({ color: 0xead2ff })
  );

  body.position.y = 1;

  group.add(body);
  group.position.set(0, 2, 0);

  scene.add(group);

  return group;
}

export function updatePlayer(player, controls, terrain, delta) {

  const speed = 6;

  const dir = new THREE.Vector3();

  if (controls.forward) dir.z -= 1;
  if (controls.backward) dir.z += 1;
  if (controls.left) dir.x -= 1;
  if (controls.right) dir.x += 1;

  dir.normalize();

  player.position.x += dir.x * speed * delta;
  player.position.z += dir.z * speed * delta;

  const height = getHeight(player.position.x, player.position.z);
  player.position.y = height + 1.2;
}