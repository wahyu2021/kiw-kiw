'use client';

import { useEffect, useState } from 'react';
import TiltCard from './TiltCard';
import { useConfetti } from '@/hooks/useConfetti';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleButtonClick = () => {
    triggerConfetti();
    setTimeout(() => {
      document.getElementById('get-well')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Decorative elements */}
      <div className="absolute top-20 left-8 text-3xl animate-float text-pink-300/40">✿</div>
      <div className="absolute top-32 right-12 text-2xl animate-float-slow delay-300 text-violet-400/40">✦</div>
      <div className="absolute bottom-40 left-16 text-xl animate-sway text-pink-200/30">❀</div>
      <div className="absolute bottom-28 right-8 text-2xl animate-bounce-soft delay-500 text-violet-300/30">★</div>

      {/* Main content with 3D tilt */}
      <TiltCard
        className={`transform transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="glass-card p-8 md:p-12 text-center max-w-md w-full">
          {/* Greeting */}
          <div className="mb-6">
            <span className="text-pink-300/60 text-lg">✦ ✿ ✦</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 leading-tight">
            Allo!
          </h1>

          <p className="text-pink-100/80 text-lg md:text-xl mb-4 leading-relaxed">
            Orang yang lagi nggak enak badan 😉
          </p>

          <p className="text-pink-200/60 text-sm md:text-base leading-relaxed mb-4">
            Telinga dan tenggorokanmu lagi sakit kan nih yahh?
          </p>

          <p className="text-pink-100/70 text-base leading-relaxed mb-8">
            this website is made just for you 🌛
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/50"></div>
            <span className="text-pink-300/50 text-sm">✿</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400/50"></div>
          </div>

          {/* CTA Button with confetti */}
          <button 
            className="btn-cute animate-pulse-glow"
            onClick={handleButtonClick}
          >
            Baca pesan untukmu ↓
          </button>

          {/* Easter egg hint */}
          <p className="text-pink-200/40 text-xs mt-6 italic">
            Psst... Ada sesuatu tersembunyi di pojok kanan bawah 🤫
          </p>
        </div>
      </TiltCard>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
        <div className="w-6 h-10 rounded-full border-2 border-pink-300/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-pink-300/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
