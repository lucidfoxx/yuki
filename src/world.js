import { createTerrain, updateTerrain } from "./terrain.js";
import { createPlayer, updatePlayer } from "./player.js";
import { setupCamera, updateCamera } from "./camera.js";
import { setupControls } from "./controls.js";
import { setupAtmosphere } from "./atmosphere.js";
import { createVegetation } from "./vegetation.js";
import { createWater, updateWater } from "./water.js";
import { createWaterfall, updateWaterfall } from "./waterfall.js";
import { createLandmarks, getSitSpots } from "./landmarks.js";
import { createPetals, updatePetals } from "./petals.js";
import { createFireflies, updateFireflies } from "./fireflies.js";
import { updateAtmosphere } from "./atmosphere.js";
import { setupAudio } from "./audio.js";
import { autoDetectQuality, getQuality } from "./quality.js";

// import { updateSitting } from "./sitting.js";

export function initWorld(scene, camera) {
  setupAtmosphere(scene);

  const terrain = createTerrain(scene);
  createVegetation(scene);
  createWater(scene);
  createWaterfall(scene);
  createLandmarks(scene);
  createPetals(scene);
  createFireflies(scene);
  setupAudio();
  autoDetectQuality();
  // const sitSpots = getSitSpots();

  const player = createPlayer(scene);

  const controls = setupControls();

  setupCamera(camera, player);

  function update(delta) {
    updatePlayer(player, controls, camera, delta);
    updateCamera(camera, player, delta, controls);
    updateTerrain(player.position);
    const time = performance.now() * 0.001;
    updateWater(time);
    updateWaterfall(time);
    controls.update();
    // const time = performance.now() * 0.001;

    updatePetals(delta);
    updateFireflies(time);
    updateAtmosphere(time, scene);
    // updateSitting(player, camera, controls, sitSpots);
  }

  function reduceQuality() {
    // future: reduce grass, petals etc
    console.log("Quality reduced (stub)");
  }

  return { update, reduceQuality };

  return { update };
}
