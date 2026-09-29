let controls = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  camX: 0,
  camY: 0
};

let joystick = { active: false, x: 0, y: 0 };
let cameraTouch = { active: false, lastX: 0, lastY: 0 };

export function setupControls() {

  // KEYBOARD
  window.addEventListener('keydown', (e) => {
    if (e.key === 'w') controls.forward = true;
    if (e.key === 's') controls.backward = true;
    if (e.key === 'a') controls.left = true;
    if (e.key === 'd') controls.right = true;
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'w') controls.forward = false;
    if (e.key === 's') controls.backward = false;
    if (e.key === 'a') controls.left = false;
    if (e.key === 'd') controls.right = false;
  });

  // TOUCH
  window.addEventListener('touchstart', (e) => {
    for (let t of e.touches) {
      if (t.clientX < window.innerWidth / 2) {
        joystick.active = true;
        joystick.x = t.clientX;
        joystick.y = t.clientY;
      } else {
        cameraTouch.active = true;
        cameraTouch.lastX = t.clientX;
        cameraTouch.lastY = t.clientY;
      }
    }
  });

  window.addEventListener('touchmove', (e) => {
    for (let t of e.touches) {
      if (t.clientX < window.innerWidth / 2 && joystick.active) {

        const dx = t.clientX - joystick.x;
        const dy = t.clientY - joystick.y;

        controls.forward = dy < -20;
        controls.backward = dy > 20;
        controls.left = dx < -20;
        controls.right = dx > 20;

      } else if (cameraTouch.active) {

        const dx = t.clientX - cameraTouch.lastX;
        const dy = t.clientY - cameraTouch.lastY;

        controls.camX -= dx * 0.005;
        controls.camY -= dy * 0.005;

        cameraTouch.lastX = t.clientX;
        cameraTouch.lastY = t.clientY;
      }
    }
  });

  window.addEventListener('touchend', () => {
    joystick.active = false;
    cameraTouch.active = false;

    controls.forward = false;
    controls.backward = false;
    controls.left = false;
    controls.right = false;
  });

  return controls;
}