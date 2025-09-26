'use client';

import confetti from 'canvas-confetti';

export const ConfettiSideCannons = () => {
  const end = Date.now() + 1 * 300; // 300ms
  const colors = ['#a786ff', '#fd8bbc'];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 4,
      angle: 60,
      spread: 45,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 45,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
};
