let controls = {
  moveX: 0,
  moveZ: 0,
  camX: 0,
  camY: 0,
  jump: false,
};

export function setupControls() {
  // =========================
  // 🖱️ MOUSE CAMERA
  // =========================
  let mouseDown = false;
  let lastX = 0;
  let lastY = 0;

  window.addEventListener("mousedown", (e) => {
    mouseDown = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  window.addEventListener("mouseup", () => {
    mouseDown = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!mouseDown) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    controls.camX -= dx * 0.005;
    controls.camY -= dy * 0.003;

    lastX = e.clientX;
    lastY = e.clientY;
  });

  // =========================
  // ⌨️ KEYBOARD
  // =========================
  const keys = {};

  window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
  });

  function updateKeyboard() {
    controls.moveX = 0;
    controls.moveZ = 0;

    if (keys["w"]) controls.moveZ -= 1;
    if (keys["s"]) controls.moveZ += 1;
    if (keys["a"]) controls.moveX -= 1;
    if (keys["d"]) controls.moveX += 1;

    // normalize diagonal movement
    const len = Math.hypot(controls.moveX, controls.moveZ);
    if (len > 1) {
      controls.moveX /= len;
      controls.moveZ /= len;
    }

    // jump
    controls.jump = keys[" "] || false;
  }

  // =========================
  // 📱 JOYSTICK (LEFT)
  // =========================
  const joystick = document.getElementById("joystick");

  if (joystick) {
    let active = false;
    let startX = 0;
    let startY = 0;

    joystick.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      active = true;
      startX = t.clientX;
      startY = t.clientY;
    });

    joystick.addEventListener("touchmove", (e) => {
      if (!active) return;

      const t = e.touches[0];

      let dx = t.clientX - startX;
      let dy = t.clientY - startY;

      const max = 50;
      dx = Math.max(-max, Math.min(max, dx));
      dy = Math.max(-max, Math.min(max, dy));

      controls.moveX = dx / max;
      controls.moveZ = dy / max;
    });

    joystick.addEventListener("touchend", () => {
      active = false;
      controls.moveX = 0;
      controls.moveZ = 0;
    });
  }

  // =========================
  // 📱 CAMERA TOUCH (RIGHT)
  // =========================
  let camActive = false;
  let lastTX = 0;
  let lastTY = 0;

  window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];

    if (t.clientX > window.innerWidth / 2) {
      camActive = true;
      lastTX = t.clientX;
      lastTY = t.clientY;
    }
  });

  window.addEventListener("touchmove", (e) => {
    if (!camActive) return;

    const t = e.touches[0];

    const dx = t.clientX - lastTX;
    const dy = t.clientY - lastTY;

    controls.camX -= dx * 0.005;
    controls.camY -= dy * 0.003;

    lastTX = t.clientX;
    lastTY = t.clientY;
  });

  window.addEventListener("touchend", () => {
    camActive = false;
  });

  // =========================
  // 📱 JUMP BUTTON (optional)
  // =========================
  const jumpBtn = document.getElementById("jumpBtn");

  if (jumpBtn) {
    jumpBtn.addEventListener("touchstart", () => {
      controls.jump = true;
    });

    jumpBtn.addEventListener("touchend", () => {
      controls.jump = false;
    });
  }

  // =========================
  // UPDATE LOOP HOOK
  // =========================
  controls.update = updateKeyboard;

  return controls;
}
