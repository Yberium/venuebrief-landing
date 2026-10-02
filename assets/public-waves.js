const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let frame = 0;

const waveMarkup = `
  <svg class="wave-scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" focusable="false">
    <defs>
      <linearGradient id="wave-back-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#c9f7ea" stop-opacity=".04"/><stop offset=".42" stop-color="#5bd5c1" stop-opacity=".3"/><stop offset="1" stop-color="#087b7b" stop-opacity=".12"/>
      </linearGradient>
      <linearGradient id="wave-middle-gradient" x1="0" y1=".2" x2="1" y2=".8">
        <stop offset="0" stop-color="#effff8" stop-opacity=".08"/><stop offset=".38" stop-color="#72e3cf" stop-opacity=".42"/><stop offset=".72" stop-color="#159c99" stop-opacity=".38"/><stop offset="1" stop-color="#075c66" stop-opacity=".12"/>
      </linearGradient>
      <linearGradient id="wave-front-gradient" x1="0" y1="0" x2="1" y2=".7">
        <stop offset="0" stop-color="#d9fff3" stop-opacity=".08"/><stop offset=".38" stop-color="#75e6d1" stop-opacity=".5"/><stop offset=".68" stop-color="#118b8c" stop-opacity=".56"/><stop offset="1" stop-color="#064c5a" stop-opacity=".18"/>
      </linearGradient>
      <linearGradient id="wave-light-gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#cffff0" stop-opacity="0"/><stop offset=".48" stop-color="#dffff6" stop-opacity=".72"/><stop offset="1" stop-color="#8df0dc" stop-opacity="0"/>
      </linearGradient>
      <filter id="wave-soften" x="-15%" y="-30%" width="130%" height="160%"><feGaussianBlur stdDeviation="16"/></filter>
      <filter id="wave-glow" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="11"/></filter>
    </defs>
    <g class="wave-path wave-path--back">
      <path d="M-180 650 C120 470 312 508 535 604 C754 699 932 683 1112 536 C1278 402 1432 378 1780 535 L1780 980 L-180 980 Z" fill="url(#wave-back-gradient)"/>
      <path d="M-130 640 C142 492 330 532 540 618 C760 708 944 677 1119 531 C1298 382 1482 402 1730 526" fill="none" stroke="#9debdc" stroke-opacity=".2" stroke-width="54" filter="url(#wave-soften)"/>
    </g>
    <g class="wave-path wave-path--middle">
      <path d="M-180 758 C105 630 276 438 533 488 C787 538 790 752 1062 710 C1288 675 1367 492 1780 412 L1780 980 L-180 980 Z" fill="url(#wave-middle-gradient)"/>
      <path d="M-120 746 C132 628 295 462 526 509 C753 555 812 750 1060 710 C1285 674 1394 500 1730 431" fill="none" stroke="url(#wave-light-gradient)" stroke-width="3"/>
    </g>
    <g class="wave-path wave-path--ribbon">
      <path d="M-190 828 C104 736 232 545 461 558 C735 573 784 792 1054 774 C1327 756 1415 539 1780 512" fill="none" stroke="url(#wave-front-gradient)" stroke-width="138" stroke-linecap="round" opacity=".38"/>
      <path d="M-190 802 C100 718 244 560 466 574 C720 590 800 786 1051 770 C1311 753 1434 555 1780 528" fill="none" stroke="url(#wave-light-gradient)" stroke-width="5" filter="url(#wave-glow)"/>
    </g>
    <g class="wave-path wave-path--front">
      <path d="M-180 872 C85 793 261 675 468 695 C725 720 815 868 1083 819 C1342 771 1461 641 1780 650 L1780 980 L-180 980 Z" fill="url(#wave-front-gradient)"/>
      <path d="M-120 858 C112 790 270 690 470 710 C716 734 824 860 1078 815 C1328 771 1474 655 1730 663" fill="none" stroke="url(#wave-light-gradient)" stroke-width="4" opacity=".62"/>
    </g>
  </svg>`;

for (const field of document.querySelectorAll('.wave-field')) field.innerHTML = waveMarkup;

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

function resetPointer() { setOffsets(); }

window.addEventListener('pointermove', applyPointer, { passive: true });
document.documentElement.addEventListener('pointerleave', resetPointer);
reduceMotion.addEventListener('change', resetPointer);
