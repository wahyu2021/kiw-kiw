'use client';

import { useEffect, useState } from 'react';

/** Props untuk SplashScreen component */
interface SplashScreenProps {
  onComplete: () => void;
}

/**
 * SplashScreen Component
 * 
 * Loading screen dengan progress bar dan animasi welcome.
 * Progress accelerating dari 0-100%, kemudian tampilkan pesan selamat datang.
 * Auto-dismiss setelah 3 detik total.
 */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 70 ? 2 : prev < 90 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setShowWelcome(true), 300);
      setTimeout(() => setFadeOut(true), 2500);
      setTimeout(() => onComplete(), 3000);
    }
  }, [progress, onComplete]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-bg">
        <div className="text-center">
          <div className="mb-8">
            <span className="text-7xl md:text-8xl font-bold gradient-text tabular-nums">0</span>
            <span className="text-4xl md:text-5xl font-bold gradient-text">%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gradient-bg transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute top-20 left-10 text-2xl animate-float text-pink-300/30">✿</div>
      <div className="absolute top-32 right-16 text-xl animate-sway text-violet-400/30">✦</div>
      <div className="absolute bottom-32 left-16 text-xl animate-bounce-soft text-pink-200/30">❀</div>
      <div className="absolute bottom-20 right-10 text-2xl animate-float-slow text-violet-300/30">★</div>

      {!showWelcome ? (
        <div className="text-center">
          <div className="mb-8">
            <span className="text-7xl md:text-8xl font-bold gradient-text tabular-nums">
              {progress}
            </span>
            <span className="text-4xl md:text-5xl font-bold gradient-text">%</span>
          </div>

          <div className="w-64 md:w-80 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-pink-200/60 text-sm mt-6 animate-pulse">
            Memuat sesuatu yang spesial...
          </p>
        </div>
      ) : (
        <div className="text-center animate-fade-in-up">
          <div className="mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Selamat Datang
          </h1>
          <p className="text-2xl md:text-3xl text-pink-200/80 font-medium">
            Cantik~
          </p>
          <div className="mt-6 flex justify-center gap-2 text-pink-300/50">
            <span className="animate-bounce-soft">✿</span>
            <span className="animate-bounce-soft delay-100">✦</span>
            <span className="animate-bounce-soft delay-200">✿</span>
          </div>
        </div>
      )}
    </div>
  );
}
