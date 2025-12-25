'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'star' | 'flower' | 'sparkle';
  delay: number;
  duration: number;
  color: string;
}

const colors = [
  'rgba(244, 114, 182, 0.6)', // pink-400
  'rgba(167, 139, 250, 0.6)', // violet-400
  'rgba(249, 168, 212, 0.5)', // pink-300
  'rgba(251, 207, 232, 0.4)', // pink-200
  'rgba(255, 255, 255, 0.3)', // white
];

const symbols = {
  star: ['✦', '✧', '★', '☆', '✯'],
  flower: ['✿', '❀', '✾', '❁', '✽'],
  sparkle: ['·', '•', '◦'],
};

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = window.innerWidth < 640 ? 20 : 35;

      for (let i = 0; i < count; i++) {
        const types: ('star' | 'flower' | 'sparkle')[] = ['star', 'flower', 'sparkle'];
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 16 + 8,
          type: types[Math.floor(Math.random() * types.length)],
          delay: Math.random() * 5,
          duration: Math.random() * 4 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const getSymbol = (particle: Particle) => {
    const typeSymbols = symbols[particle.type];
    // Use particle id for consistent symbol selection
    return typeSymbols[particle.id % typeSymbols.length];
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute opacity-0"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            color: particle.color,
            animation: `float ${particle.duration}s ease-in-out infinite, sparkle 3s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            textShadow: `0 0 10px ${particle.color}`,
          }}
        >
          {getSymbol(particle)}
        </span>
      ))}
    </div>
  );
}
