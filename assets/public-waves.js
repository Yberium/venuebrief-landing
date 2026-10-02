const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let frame = 0;

function setOffsets(x = 0, y = 0) {
  root.style.setProperty('--wave-back-x', `${(x * 4).toFixed(2)}px`);
  root.style.setProperty('--wave-back-y', `${(y * 2.5).toFixed(2)}px`);
  root.style.setProperty('--wave-middle-x', `${(x * 8).toFixed(2)}px`);
  root.style.setProperty('--wave-middle-y', `${(y * 4.5).toFixed(2)}px`);
  root.style.setProperty('--wave-front-x', `${(x * 13).toFixed(2)}px`);
  root.style.setProperty('--wave-front-y', `${(y * 7).toFixed(2)}px`);
}

function applyPointer(event) {
  if (reduceMotion.matches || !finePointer.matches) return;
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    setOffsets(x, y);
  });
}

function resetPointer() {
  setOffsets();
}

window.addEventListener('pointermove', applyPointer, { passive: true });
document.documentElement.addEventListener('pointerleave', resetPointer);
reduceMotion.addEventListener('change', resetPointer);
