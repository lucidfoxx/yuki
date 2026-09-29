import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { getHeight } from './terrain.js';

let sakuraMesh, grassMesh, flowerMesh;

export function createVegetation(scene) {

  const dummy = new THREE.Object3D();
  //Sakura Trees
  const trunkGeo = new THREE.CylinderGeometry(0.15, 0.2, 2, 6);
  const canopyGeo = new THREE.SphereGeometry(0.6, 8, 8);
  canopyGeo.translate(0, 1, 0);

  const treeGeo = BufferGeometryUtils.mergeGeometries([trunkGeo, canopyGeo]);

  const sakuraMat = new THREE.MeshStandardMaterial({
    color: 0xffc1d9,
    flatShading: true
  });

  const TREE_COUNT = 200;
  sakuraMesh = new THREE.InstancedMesh(treeGeo, sakuraMat, TREE_COUNT);

  let treeIndex = 0;

  for (let i = 0; i < TREE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 150;
    const z = (Math.random() - 0.5) * 150;

    const y = getHeight(x, z);
    if (y < -1 || y > 3) continue;

    dummy.position.set(x, y, z);
    dummy.scale.setScalar(0.8 + Math.random() * 2);
    dummy.updateMatrix();

    sakuraMesh.setMatrixAt(treeIndex++, dummy.matrix);
  }

  sakuraMesh.count = treeIndex;
  scene.add(sakuraMesh);

  // GRASS
  const grassGeo = new THREE.PlaneGeometry(0.2, 0.5);
  const grassMat = new THREE.MeshBasicMaterial({
    color: 0x88cc88,
    side: THREE.DoubleSide
  });

  const GRASS_COUNT = 800;
  grassMesh = new THREE.InstancedMesh(grassGeo, grassMat, GRASS_COUNT);

  let grassIndex = 0;

  for (let i = 0; i < GRASS_COUNT; i++) {
    const x = (Math.random() - 0.5) * 120;
    const z = (Math.random() - 0.5) * 120;

    const y = getHeight(x, z);
    if (y < -1 || y > 3) continue;

    dummy.position.set(x, y + 0.1, z);
    dummy.rotation.y = Math.random() * Math.PI;
    dummy.updateMatrix();

    grassMesh.setMatrixAt(grassIndex++, dummy.matrix);
  }

  grassMesh.count = grassIndex;
  scene.add(grassMesh);

  // FLOWERS
  const flowerGeo = new THREE.SphereGeometry(0.1, 4, 4);
  const flowerMat = new THREE.MeshBasicMaterial({
    color: 0xff99cc
  });

  const FLOWER_COUNT = 150;
  flowerMesh = new THREE.InstancedMesh(flowerGeo, flowerMat, FLOWER_COUNT);

  let flowerIndex = 0;

  for (let i = 0; i < FLOWER_COUNT; i++) {
    const x = (Math.random() - 0.5) * 120;
    const z = (Math.random() - 0.5) * 120;

    const y = getHeight(x, z);
    if (y < -1 || y > 3) continue;

    dummy.position.set(x, y + 0.2, z);
    dummy.updateMatrix();

    flowerMesh.setMatrixAt(flowerIndex++, dummy.matrix);
  }

  flowerMesh.count = flowerIndex;
  scene.add(flowerMesh);
}