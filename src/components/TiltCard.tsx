'use client';

import { useState, useEffect, useRef } from 'react';

/** Props untuk TiltCard component */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TiltCard Component
 * 
 * Wrapper yang memberikan efek 3D tilt saat mouse/touch bergerak di atasnya.
 * Termasuk efek glare yang mengikuti posisi pointer.
 * Smooth animation dengan transform perspective.
 */
export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (clientX: number, clientY: number) => {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleLeave = () => {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
      setGlarePosition({ x: 50, y: 50 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('mouseleave', handleLeave);
    card.addEventListener('touchend', handleLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('mouseleave', handleLeave);
      card.removeEventListener('touchend', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      {children}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
