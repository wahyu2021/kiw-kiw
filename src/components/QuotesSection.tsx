'use client';

import { useState, useEffect, useRef } from 'react';

/** Daftar quotes motivasi dengan emoji */
const quotes = [
  { text: "Kamu lebih kuat dari yang kamu kira", emoji: "💫" },
  { text: "Setiap hari adalah kesempatan baru", emoji: "🌅" },
  { text: "Sakit itu hanya sebentar kok", emoji: "🌈" },
  { text: "Temanmu selalu ada di sini untukmu", emoji: "🌸" },
  { text: "Aku tau kamu kuat!", emoji: "⭐" }
];

/**
 * QuotesSection Component
 * 
 * Section carousel quotes motivasi dengan efek typewriter.
 * Auto-rotate setiap 6 detik, bisa manual tap dot indicator.
 * Animasi scroll-triggered dengan IntersectionObserver.
 */
export default function QuotesSection() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const text = quotes[currentQuote].text;
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentQuote]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 bg-pink-500/10 blur-[100px] rounded-full animate-pulse"></div>
      </div>

      <div className={`relative max-w-md mx-auto text-center transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="glass-card p-10 md:p-12 animate-pulse-glow">
          <div className="text-4xl mb-6 animate-bounce-soft">
            {quotes[currentQuote].emoji}
          </div>
          
          <p className="text-2xl md:text-3xl font-medium gradient-text leading-relaxed mb-6 min-h-[80px] flex items-center justify-center">
            &ldquo;{displayedText}
            {isTyping && <span className="animate-pulse ml-1">|</span>}
            &rdquo;
          </p>

          <div className="flex justify-center gap-2 mb-4">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuote 
                    ? 'bg-pink-400 w-6' 
                    : 'bg-pink-400/30 hover:bg-pink-400/50'
                }`}
              />
            ))}
          </div>

          <p className="text-pink-200/50 text-xs">Tap dot untuk quote lainnya</p>
        </div>
      </div>

      <div className="absolute top-12 left-12 text-pink-300/20 text-2xl animate-float">✦</div>
      <div className="absolute bottom-12 right-12 text-violet-400/20 text-3xl animate-sway delay-500">❀</div>
    </section>
  );
}
