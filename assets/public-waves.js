const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let frame = 0;

function applyPointer(event) {
  if (reduceMotion.matches || !finePointer.matches) return;
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    root.style.setProperty('--wave-pointer-x', x.toFixed(3));
    root.style.setProperty('--wave-pointer-y', y.toFixed(3));
  });
}

function resetPointer() {
  root.style.setProperty('--wave-pointer-x', '0');
  root.style.setProperty('--wave-pointer-y', '0');
}

window.addEventListener('pointermove', applyPointer, { passive: true });
document.documentElement.addEventListener('pointerleave', resetPointer);
reduceMotion.addEventListener('change', resetPointer);
