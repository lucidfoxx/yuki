import * as THREE from "three";
import { getHeight } from "./terrain.js";

let velocityY = 0;
const gravity = -20;
const jumpForce = 8;

export function createPlayer(scene) {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.5, 1.4, 6),
    new THREE.MeshStandardMaterial({ color: 0xf3d1ff }),
  );
  body.position.y = 0.7;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xffe0cc }),
  );
  head.position.y = 1.6;

  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x2a1a1a }),
  );
  hair.position.y = 1.75;
  hair.scale.set(1, 0.8, 1);

  const armGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6);
  const armMat = new THREE.MeshStandardMaterial({ color: 0xf3d1ff });

  const leftArm = new THREE.Mesh(armGeo, armMat);
  const rightArm = new THREE.Mesh(armGeo, armMat);

  leftArm.position.set(-0.5, 0.9, 0);
  rightArm.position.set(0.5, 0.9, 0);

  leftArm.rotation.z = Math.PI / 6;
  rightArm.rotation.z = -Math.PI / 6;

  const legGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 6);
  const legMat = new THREE.MeshStandardMaterial({ color: 0x333333 });

  const leftLeg = new THREE.Mesh(legGeo, legMat);
  const rightLeg = new THREE.Mesh(legGeo, legMat);

  leftLeg.position.set(-0.15, 0.2, 0);
  rightLeg.position.set(0.15, 0.2, 0);

  group.add(body, head, hair, leftArm, rightArm, leftLeg, rightLeg);

  scene.add(group);
  return group;
}

export function updatePlayer(player, controls, camera, delta) {
  const speed = 6;

  // movement
  const move = new THREE.Vector3(controls.moveX, 0, controls.moveZ);

  if (move.length() > 0.01) {
    move.normalize();

    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const right = new THREE.Vector3()
      .crossVectors(camDir, new THREE.Vector3(0, 1, 0))
      .normalize();

    const finalMove = new THREE.Vector3();

    finalMove.addScaledVector(camDir, -move.z);
    finalMove.addScaledVector(right, move.x);

    player.position.addScaledVector(finalMove, speed * delta);

    const angle = Math.atan2(finalMove.x, finalMove.z);
    player.rotation.y = angle;

    // walk animation
    const t = performance.now() * 0.005;
    player.children.forEach((child, i) => {
      if (i >= 3 && i <= 6) {
        child.rotation.x = Math.sin(t + i) * 0.3;
      }
    });
  }

  // ground + jump
  const ground = getHeight(player.position.x, player.position.z);
  const isGrounded = player.position.y <= ground + 0.001;

  if (isGrounded) {
    player.position.y = ground;
    velocityY = 0;

    if (controls.jump) {
      velocityY = jumpForce;
    }
  }

  // gravity
  velocityY += gravity * delta;
  player.position.y += velocityY * delta;
}
