import { createTerrain, updateTerrain } from "./terrain.js";
import { createPlayer, updatePlayer } from "./player.js";
import { setupCamera, updateCamera } from "./camera.js";
import { setupControls } from "./controls.js";
import { setupAtmosphere } from "./atmosphere.js";

export function initWorld(scene, camera) {
  setupAtmosphere(scene);

  const terrain = createTerrain(scene);
  const player = createPlayer(scene);

  const controls = setupControls();

  setupCamera(camera, player);

  function update(delta) {
    updatePlayer(player, controls, terrain, delta);
    updateCamera(camera, player, delta, controls);
    updateTerrain(player.position);
  }

  return { update };
}
