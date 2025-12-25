'use client';

import { useCallback, useEffect, useState } from 'react';

export function useConfetti() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add confetti styles
    const styleId = 'confetti-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(0) rotate(0deg) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg) scale(0.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const triggerConfetti = useCallback(() => {
    if (!mounted) return;

    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
    document.body.appendChild(container);

    const colors = ['#f472b6', '#a78bfa', '#fb7185', '#c084fc', '#f9a8d4', '#fbbf24'];
    const shapes = ['✿', '✦', '★', '❀', '✧', '•'];

    for (let i = 0; i < 50; i++) {
      const el = document.createElement('div');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100;
      const delay = Math.random() * 0.5;
      const rotation = Math.random() * 360;

      el.innerHTML = shape;
      el.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: -20px;
        font-size: ${12 + Math.random() * 16}px;
        color: ${color};
        animation: confetti-fall 3s ease-out ${delay}s forwards;
        transform: rotate(${rotation}deg);
        text-shadow: 0 0 10px ${color};
      `;
      container.appendChild(el);
    }

    // Cleanup
    setTimeout(() => container.remove(), 4000);
  }, [mounted]);

  return { triggerConfetti };
}
