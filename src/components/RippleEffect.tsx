'use client';

import { useEffect, useRef, useState } from 'react';

export default function RippleEffect() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const createRipple = (e: MouseEvent | TouchEvent) => {
      const ripple = document.createElement('div');
      
      let x: number, y: number;
      if ('touches' in e) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, transparent 70%);
        transform: translate(-50%, -50%) scale(0);
        animation: ripple-expand 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 9998;
      `;
      
      document.body.appendChild(ripple);
      
      // Create floating emoji
      const emoji = document.createElement('div');
      const emojis = ['✿', '✦', '★', '❀', '✧'];
      const randomIndex = Math.floor(Math.random() * emojis.length);
      emoji.textContent = emojis[randomIndex];
      emoji.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        color: rgba(244, 114, 182, 0.8);
        transform: translate(-50%, -50%);
        animation: float-up 1s ease-out forwards;
        pointer-events: none;
        z-index: 9998;
        text-shadow: 0 0 10px rgba(244, 114, 182, 0.5);
      `;
      document.body.appendChild(emoji);
      
      setTimeout(() => {
        ripple.remove();
        emoji.remove();
      }, 1000);
    };

    document.addEventListener('click', createRipple);
    document.addEventListener('touchstart', createRipple);

    return () => {
      document.removeEventListener('click', createRipple);
      document.removeEventListener('touchstart', createRipple);
    };
  }, [mounted]);

  // Add styles only on client
  useEffect(() => {
    if (!mounted) return;

    const styleId = 'ripple-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes ripple-expand {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(15);
          opacity: 0;
        }
      }
      @keyframes float-up {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -150%) scale(1.5) rotate(20deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }, [mounted]);

  return null;
}
