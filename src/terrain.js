import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

const SIZE = 200;
const RES = 100;

let mesh;

export function createTerrain(scene) {

  const geo = new THREE.PlaneGeometry(SIZE, SIZE, RES, RES);
  geo.rotateX(-Math.PI / 2);

  const colors = [];

  for (let i = 0; i < geo.attributes.position.count; i++) {

    const x = geo.attributes.position.getX(i);
    const z = geo.attributes.position.getZ(i);

    const height = getHeight(x, z);
    geo.attributes.position.setY(i, height);

    const color = getBiomeColor(height);
    colors.push(color.r, color.g, color.b);
  }

  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    flatShading: true
  });

  mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 100, 50);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  return mesh;
}

export function getHeight(x, z) {
  let n = noise2D(x * 0.01, z * 0.01);
  return n * 8;
}

function getBiomeColor(h) {
  if (h < -1) return new THREE.Color(0xffd6c9); // beach
  if (h < 3) return new THREE.Color(0xd7f5d1); // plains
  return new THREE.Color(0xb8b8c9); // mountains
}

export function updateTerrain(playerPos) {
  // placeholder for chunking later
}