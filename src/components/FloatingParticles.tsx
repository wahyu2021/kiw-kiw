'use client';

import { useEffect, useState } from 'react';

/** Interface untuk data particle */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'star' | 'flower';
  delay: number;
  duration: number;
  color: string;
}

/** Palette warna untuk particles */
const colors = [
  'rgba(244, 114, 182, 0.5)',
  'rgba(167, 139, 250, 0.5)',
  'rgba(249, 168, 212, 0.4)',
];

/** Symbol mapping untuk particle types */
const symbols = {
  star: ['✦', '★'],
  flower: ['✿', '❀'],
};

/**
 * FloatingParticles Component
 * 
 * Background decorative dengan particles animasi floating.
 * Menggunakan 12 particles untuk balance visual dan performance.
 * Random position, size, dan animation delay untuk variasi natural.
 */
export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const count = 12;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const types: ('star' | 'flower')[] = ['star', 'flower'];
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 12 + 10,
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  const getSymbol = (particle: Particle) => {
    const typeSymbols = symbols[particle.type];
    return typeSymbols[particle.id % typeSymbols.length];
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            color: particle.color,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.6,
          }}
        >
          {getSymbol(particle)}
        </span>
      ))}
    </div>
  );
}
