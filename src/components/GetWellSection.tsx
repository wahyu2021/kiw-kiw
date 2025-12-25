'use client';

import { useEffect, useState, useRef } from 'react';

export default function GetWellSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.get-well-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const messages = [
    {
      icon: "🌸",
      title: "Istirahat yang Cukup",
      content: "ga boleh maksain diri ya. Badanmu butuh istirahat supaya bisa melawan sakitnya. Tidur yang nyenyak malam ini yahh~"
    },
    {
      icon: "💊",
      title: "Jangan Lupa Minum Obat",
      content: "Sudah minum obat belum hari ini? Kalau belum, ayo diminum dulu yahh kakak cantik"
    },
    {
      icon: "🍵",
      title: "Minum Air Hangat",
      content: "Tenggorokanmu pasti nggak enak banget. Coba minum air hangat atau teh madu, biar tenggorokannya lebih nyaman."
    },
    {
      icon: "🥣",
      title: "Makan yang Bergizi",
      content: "Walaupun mungkin nggak nafsu makan, tetap harus makan ya. Coba makan bubur atau sup hangat~"
    }
  ];

  return (
    <section id="get-well" ref={sectionRef} className="relative py-20 px-6">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="text-3xl mb-4 block">🌷</span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Get Well Soon!
        </h2>
        <p className="text-pink-200/60 text-sm md:text-base max-w-xs mx-auto">
          Sebagai teman, aku cuma bisa ingetin kamu ini~
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-lg mx-auto grid gap-6">
        {messages.map((message, index) => (
          <div
            key={index}
            data-index={index}
            className={`get-well-card glass-card p-6 transform transition-all duration-700 ${
              visibleCards.includes(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">{message.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-pink-100 mb-2">{message.title}</h3>
                <p className="text-pink-100/70 text-sm md:text-base leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Last Card */}
      <div className="text-center mt-12">
        <div className="glass-card inline-block px-8 py-4 animate-pulse-glow">
          <p className="text-pink-100/80 text-lg">
            🤗 <span className="gradient-text font-semibold">Cepet Sembuh</span>
          </p>
        </div>
      </div>
    </section>
  );
}
