'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/** Interface untuk data lagu */
interface Song {
  title: string;
  artist: string;
  album: string;
  image: string;
}

/** Daftar lagu favorit dengan album art */
const songs: Song[] = [
  { title: 'FEEL', artist: 'Beneld, BURY', album: 'FEEL', image: '01-feel.jpg' },
  { title: 'Brooklyn Baby', artist: 'Lana Del Rey', album: 'Ultraviolence', image: '02-brooklyn-baby.jpg' },
  { title: 'OBSESSION - SLOWED', artist: 'DAMAGE, PRISET', album: 'OBSESSION', image: '03-obsession.jpg' },
  { title: 'PELIGROSA', artist: 'FloyyMenor', album: 'PELIGROSA', image: '04-peligrosa.jpg' },
  { title: 'Gata Only', artist: 'FloyyMenor, Cris MJ', album: 'Gata Only', image: '05-gata-only.jpg' },
  { title: 'Calma (Remix)', artist: 'Pedro Capó, Farruko', album: 'Calma', image: '06-calma.jpg' },
  { title: 'Sin Pijama', artist: 'Becky G, NATTI NATASHA', album: 'Sin Pijama', image: '07-sin-pijama.jpg' },
  { title: 'Ride Or Die, Pt. 2', artist: 'Sevdaliza, Villano Antillano', album: 'Ride Or Die', image: '08-ride-or-die.jpg' },
  { title: 'Gasolina', artist: 'Daddy Yankee', album: 'Barrio Fino', image: '09-gasolina.jpg' },
  { title: 'Nuestra Canción', artist: 'BrunOG', album: 'Nuestra Canción', image: '10-nuestra-cancion.jpg' },
];

/**
 * PlaylistSection Component
 * 
 * Carousel slider yang menampilkan lagu-lagu favorit dengan album art.
 * Auto-slide setiap 4 detik dengan navigasi manual (arrows dan dots).
 * Link langsung ke playlist Spotify.
 */
export default function PlaylistSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});
  const spotifyLink = 'https://open.spotify.com/playlist/0IlEZeOV9n39sk9dJqgVtz?si=311cca78b9d84dde';

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  const currentSong = songs[currentIndex];
  const hasImageError = imageError[currentSong.image];

  return (
    <section className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <span className="text-3xl mb-4 block">🎵</span>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
            Playlist Favorit
          </h2>
          <p className="text-pink-200/60 text-sm">
            Lagu-lagu yang sering kamu dengerin~
          </p>
        </div>

        <div className="relative">
          <div className="glass-card p-6 md:p-8 relative overflow-hidden">
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-2xl overflow-hidden mb-6 shadow-lg transform transition-all duration-500 hover:scale-105 relative bg-gradient-to-br from-pink-500 to-violet-600">
              {!hasImageError ? (
                <Image
                  src={`/albums/${currentSong.image}`}
                  alt={currentSong.album}
                  fill
                  className="object-cover"
                  onError={() => setImageError(prev => ({...prev, [currentSong.image]: true}))}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl md:text-7xl text-white/30">♪</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-pink-100 mb-2 truncate">
                {currentSong.title}
              </h3>
              <p className="text-pink-200/70 text-sm md:text-base truncate">
                {currentSong.artist}
              </p>
              <p className="text-pink-200/50 text-xs mt-1 truncate">
                {currentSong.album}
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-pink-300 hover:text-pink-100 transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-pink-300 hover:text-pink-100 transition-colors"
              >
                →
              </button>
            </div>

            <div className="flex justify-center gap-1.5 mb-6">
              {songs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-pink-400 w-4' 
                      : 'bg-pink-400/30 hover:bg-pink-400/50'
                  }`}
                />
              ))}
            </div>

            <p className="text-pink-200/40 text-xs mb-4">
              {currentIndex + 1} / {songs.length} lagu
            </p>

            <a
              href={spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-cute text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span>Buka di Spotify</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute top-12 left-8 text-pink-300/20 text-2xl animate-sway">♪</div>
      <div className="absolute bottom-12 right-8 text-violet-400/20 text-xl animate-float">♫</div>
    </section>
  );
}
