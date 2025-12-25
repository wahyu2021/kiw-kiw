'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * StudySection Component
 * 
 * Section berisi motivasi dan tips belajar untuk menghadapi ujian.
 * Menggunakan IntersectionObserver untuk animasi scroll-triggered.
 * Menampilkan pesan dukungan dan tips belajar yang praktis.
 */
export default function StudySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tips = [
    "Belajar sebentar-sebentar, istirahat dulu kalau capek",
    "Fokus ke materi yang paling penting dulu",
    "Jangan begadang, tidur cukup supaya otak fresh",
    "Kamu udah belajar banyak, percaya sama kemampuanmu!",
  ];

  return (
    <section ref={sectionRef} className="relative py-20 px-6">
      <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="text-3xl mb-4 block">📚</span>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Semangat Ujiannya!
        </h2>
        <p className="text-pink-200/60 text-sm md:text-base max-w-sm mx-auto">
          Aku tau ujian udah dekat dan dirimu juga lagi sakit. Tapi aku percaya dirimu pasti bisa bell!
        </p>
      </div>

      <div className={`glass-card max-w-lg mx-auto p-8 text-center mb-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-pink-100/90 text-lg md:text-xl leading-relaxed mb-6">
          Kamu pasti lagi stres ya, badan sakit tapi harus belajar juga...
        </p>
        <p className="text-pink-100/70 text-base leading-relaxed mb-6">
          Tapi ingat, <span className="text-pink-300 font-medium">kesehatan tetap nomor satu</span>. 
          Nggak apa-apa kalau harus belajar pelan-pelan. Yang penting kamu sembuh dulu.
        </p>
        <div className="text-3xl mb-4">💪✨</div>
        <p className="text-pink-100/80 text-lg font-medium gradient-text-soft">
          Aku yakin dirimu pasti bisa melewati ini semua!
        </p>
      </div>

      <div className={`max-w-lg mx-auto transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h3 className="text-center text-pink-200/70 text-sm mb-4 uppercase tracking-wider">Tips dari temanmu</h3>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 glass-card px-5 py-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-pink-400">✦</span>
              <p className="text-pink-100/70 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-16 right-8 text-pink-300/20 text-3xl animate-float">✿</div>
      <div className="absolute bottom-16 left-8 text-violet-400/20 text-2xl animate-sway">★</div>
    </section>
  );
}
