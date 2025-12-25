'use client';

import { useEffect, useRef, useState } from 'react';

interface Trail {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = [
  'rgba(244, 114, 182, 0.6)',
  'rgba(167, 139, 250, 0.6)',
  'rgba(251, 207, 232, 0.5)',
  'rgba(196, 132, 252, 0.5)',
];

export default function CursorTrail() {
  const [mounted, setMounted] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    setMounted(true);

    const handleMove = (x: number, y: number) => {
      const newTrail: Trail = {
        id: trailIdRef.current++,
        x,
        y,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setTrails((prev) => [...prev.slice(-15), newTrail]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (trails.length === 0) return;

    const timer = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 100);

    return () => clearTimeout(timer);
  }, [trails]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute rounded-full"
          style={{
            left: trail.x,
            top: trail.y,
            width: trail.size,
            height: trail.size,
            backgroundColor: trail.color,
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / trails.length,
            boxShadow: `0 0 ${trail.size}px ${trail.color}`,
            transition: 'opacity 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
}
