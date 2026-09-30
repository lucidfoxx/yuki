let audio;

export function setupAudio() {

  audio = new Audio('/ambient.mp3');
  audio.loop = true;
  audio.volume = 0.5;

  document.addEventListener('click', () => {
    audio.play();
  }, { once: true });
}