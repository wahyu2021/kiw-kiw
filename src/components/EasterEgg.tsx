'use client';

import { useState } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

export default function EasterEgg() {
  const [showSecret, setShowSecret] = useState(false);
  const { triggerConfetti } = useConfetti();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showSecret) {
      setShowSecret(true);
      triggerConfetti();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSecret(false);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full glass-card flex items-center justify-center z-50 opacity-30 hover:opacity-60 transition-opacity"
        aria-label="Easter egg"
      >
        <span className="text-xl">✦</span>
      </button>

      {/* Modal */}
      {showSecret && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up"
          onClick={handleClose}
        >
          <div 
            className="glass-card p-8 mx-6 text-center max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4 animate-bounce-soft">🎉</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Kamu Menemukan Easter Egg!
            </h3>
            <p className="text-pink-100/70 text-sm mb-6">
              Selamat! Ini adalah pesan rahasia untukmu...
            </p>
            <p className="text-pink-200/90 text-lg italic mb-6">
              &ldquo;Kamu itu spesial banget, tau nggak?&rdquo; 💫
            </p>
            <button
              onClick={handleClose}
              className="btn-cute text-sm"
              type="button"
            >
              Tutup ✨
            </button>
          </div>
        </div>
      )}
    </>
  );
}
