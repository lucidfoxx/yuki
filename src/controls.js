export function setupControls() {

  const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false
  };

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

  return controls;
}