'use client';

import { useEffect, useState } from 'react';

/** Interface untuk struktur waktu countdown */
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * CountdownSection Component
 * 
 * Menampilkan countdown timer sampai tanggal ujian selesai (18 Januari 2026).
 * Timer update setiap detik dengan animasi real-time.
 * Menampilkan hari, jam, menit, dan detik dalam format yang menarik.
 */
export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);
  const targetDate = new Date('2026-01-18T23:59:59').getTime();

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <span className="text-3xl mb-4 block">⏰</span>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
            Countdown Ujian Selesai
          </h2>
          <p className="text-pink-200/60 text-sm">
            Tinggal sebentar lagi, semangat!
          </p>
        </div>

        {timeLeft ? (
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {[
                { value: timeLeft.days, label: 'Hari' },
                { value: timeLeft.hours, label: 'Jam' },
                { value: timeLeft.minutes, label: 'Menit' },
                { value: timeLeft.seconds, label: 'Detik' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="glass-card p-2 md:p-4 mb-2 flex items-center justify-center min-h-[50px] md:min-h-[70px]">
                    <span className="text-xl md:text-4xl font-bold gradient-text tabular-nums">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-pink-200/60 text-[10px] md:text-sm">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-pink-100/50 text-xs mt-6">
              Sampai 18 Januari 2026
            </p>
          </div>
        ) : (
          <div className="glass-card p-8 animate-pulse-glow">
            <span className="text-4xl mb-4 block">🎉</span>
            <p className="text-xl gradient-text font-bold">Ujian Selesai!</p>
            <p className="text-pink-200/60 text-sm mt-2">Selamat, kamu berhasil!</p>
          </div>
        )}
      </div>

      <div className="absolute top-8 right-8 text-pink-300/20 text-2xl animate-float">✦</div>
      <div className="absolute bottom-8 left-8 text-violet-400/20 text-xl animate-sway">✿</div>
    </section>
  );
}
