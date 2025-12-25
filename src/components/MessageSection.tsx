'use client';

import { useEffect, useState, useRef } from 'react';

/** Daftar pesan personal dengan icon dan judul */
const messages = [
  {
    title: "Makasih...",
    content: "Makasih udah tetep jadi temen saya yahh.",
    icon: "🌟"
  },
  {
    title: "Cepet Sembuh!",
    content: "Jangan lupa senyum dan jaga kesehatan ya~",
    icon: "🌸"
  },
  {
    title: "Btw...",
    content: "Aku masih suka sama kamu loh. Eh becanda hihii... atau engga ya? 😏 Hehe, bercanda! ...atau?",
    icon: "👀"
  }
];

/**
 * MessageSection Component
 * 
 * Section berisi pesan-pesan personal dari teman.
 * Card muncul dengan animasi slide dari kiri/kanan (alternating).
 * Menggunakan IntersectionObserver untuk scroll-triggered animation.
 */
export default function MessageSection() {
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

    const cards = sectionRef.current?.querySelectorAll('.message-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-6">
      <div className="text-center mb-16">
        <span className="text-pink-300/40 text-2xl">✦</span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text-soft mt-4 mb-3">
          Dari Temanmu
        </h2>
        <p className="text-pink-200/50 text-sm">Yang kamu panggil mr. busy</p>
      </div>

      <div className="max-w-lg mx-auto space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            data-index={index}
            className={`message-card glass-card p-6 md:p-8 transform transition-all duration-700 relative overflow-hidden ${
              visibleCards.includes(index)
                ? 'opacity-100 translate-x-0'
                : index % 2 === 0 
                  ? 'opacity-0 -translate-x-12'
                  : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{message.icon}</span>
              <h3 className="text-xl font-semibold text-pink-100">{message.title}</h3>
            </div>

            <p className="text-pink-100/70 leading-relaxed text-base md:text-lg">
              {message.content}
            </p>

            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-full blur-xl"></div>
          </div>
        ))}
      </div>

      <div className="absolute top-12 right-8 text-pink-300/20 text-4xl animate-rotate-slow">✿</div>
      <div className="absolute bottom-20 left-6 text-violet-400/20 text-3xl animate-float delay-500">★</div>
    </section>
  );
}
