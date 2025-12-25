'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useConfetti } from '@/hooks/useConfetti';

/** Daftar pesan rahasia yang akan ditampilkan secara acak saat goyang HP */
const secretMessages = [
  "Kamu adalah orang yang luar biasa! ✨",
  "I still have a crush on you, bercanda WKWKWKKKWK jangan dibawa serius",
  "Aku bangga sama kamu! 💫",
  "Tetap semangat ya! 🌟",
  "Kamu pasti bisa! 💪",
  "Jangan lupa senyum hari ini! 😊",
  "Rezeki lancar menantimu! 💸",
  "Hari ini akan jadi hari yang indah! 🌈",
];

/**
 * ShakeMessage Component
 * Mendeteksi goyangan HP dan menampilkan pesan rahasia
 * - Mendukung iOS 13+ dengan permission request
 * - Mendukung Android dengan hybrid acceleration detection
 */
export default function ShakeMessage() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [shakeProgress, setShakeProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showPermissionButton, setShowPermissionButton] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [toastIcon, setToastIcon] = useState('');
  const [isIOS, setIsIOS] = useState(false);

  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastShakeTimeRef = useRef(0);
  const shakeCountRef = useRef(0);
  
  const { triggerConfetti } = useConfetti();

  /** Menampilkan toast notification selama 4 detik */
  const displayToast = useCallback((icon: string, text: string) => {
    setToastIcon(icon);
    setToastText(text);
    setShowToast(true);

    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setShowToast(false), 4000);
  }, []);

  /** Menampilkan pesan rahasia dan trigger confetti */
  const revealMessage = useCallback(() => {
    const randomMessage = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    setShakeProgress(0);
    shakeCountRef.current = 0;
    setShowProgress(false);
    triggerConfetti();
  }, [triggerConfetti]);

  /** Request permission untuk DeviceMotion (khusus iOS 13+) */
  const requestPermission = async () => {
    try {
      // @ts-ignore - iOS specific API
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        // @ts-ignore
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          setShowPermissionButton(false);
          displayToast('✅', 'Sensor aktif! Coba goyang HP-nya!');
        } else {
          displayToast('❌', 'Izin sensor ditolak.');
        }
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  /** Initial check saat component mount */
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isiOSDevice = /iPhone|iPad|iPod/i.test(ua);
    setIsIOS(isiOSDevice);

    if (!isMobile) {
      displayToast('💻', 'Fitur ini khusus dibuka di HP ya~');
      return;
    }

    if (!window.DeviceMotionEvent) {
      displayToast('⚠️', 'Browser HP kamu tidak support sensor gerak.');
      return;
    }

    // @ts-ignore
    if (isiOSDevice && typeof DeviceMotionEvent.requestPermission === 'function') {
      setShowPermissionButton(true);
    } else {
      setPermissionGranted(true);
    }

    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      if (progressTimeoutRef.current) clearTimeout(progressTimeoutRef.current);
    };
  }, [displayToast]);

  /** Core shake detection logic */
  useEffect(() => {
    if (!permissionGranted || !mounted) return;

    const handleMotion = (event: DeviceMotionEvent) => {
      let acc = event.acceleration;
      let usingGravity = false;

      // Fallback ke accelerationIncludingGravity untuk Android low-end
      if (!acc || (acc.x === null && acc.y === null)) {
        acc = event.accelerationIncludingGravity;
        usingGravity = true;
      }

      if (!acc) return;

      const x = acc.x || 0;
      const y = acc.y || 0;
      const z = acc.z || 0;

      const currentIntensity = Math.sqrt(x * x + y * y + z * z);
      const threshold = usingGravity ? 25 : 15;

      if (currentIntensity > threshold) {
        const now = Date.now();
        
        // Debounce 400ms
        if (now - lastShakeTimeRef.current > 400) {
          lastShakeTimeRef.current = now;
          shakeCountRef.current += 1;
          
          setShakeProgress(shakeCountRef.current);
          setShowProgress(true);
          
          if (progressTimeoutRef.current) clearTimeout(progressTimeoutRef.current);
          
          progressTimeoutRef.current = setTimeout(() => {
            setShowProgress(false);
            shakeCountRef.current = 0;
            setShakeProgress(0);
          }, 2000);

          if (shakeCountRef.current >= 3) {
            revealMessage();
          }
        }
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [permissionGranted, mounted, revealMessage]);

  const handleClose = () => setShowMessage(false);

  const getProgressMessage = () => {
    const remaining = 3 - shakeProgress;
    if (remaining === 2) return "Ayo! 2 kali lagi! 🌪️";
    if (remaining === 1) return "Dikit lagi! 1 kali lagi! 🔥";
    return "Membuka pesan... ✨";
  };

  if (!mounted) return null;

  // Render toast menggunakan Portal ke document.body agar fixed positioning bekerja
  const ToastPortal = showToast ? createPortal(
    <div className="fixed top-0 left-0 right-0 z-[9999] animate-fade-in-up">
      <div className="bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-md">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-center gap-3">
          <span className="text-2xl">{toastIcon}</span>
          <p className="text-white text-sm font-medium">{toastText}</p>
          <button 
            onClick={() => setShowToast(false)}
            className="text-white/70 hover:text-white ml-2"
          >
            ✕
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {ToastPortal}

      {/* Tombol Izin iOS */}
      {showPermissionButton && !permissionGranted && isIOS && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-6 flex justify-center">
          <button
            onClick={requestPermission}
            className="glass-card px-6 py-4 flex items-center gap-3 animate-pulse-glow hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="text-2xl animate-bounce">📱</span>
            <div className="text-left">
              <p className="text-pink-100 font-bold text-sm">Aktifkan Sensor Goyang</p>
              <p className="text-pink-200/70 text-xs">Tap di sini agar bisa main!</p>
            </div>
          </button>
        </div>
      )}

      {/* Indikator Progress Goyangan - via Portal */}
      {showProgress && shakeProgress > 0 && shakeProgress < 3 && createPortal(
        <div className="fixed top-0 left-0 right-0 z-[9999]">
          <div className="bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-md py-3 px-4">
            <div className="max-w-md mx-auto flex flex-col items-center gap-2">
              <p className="text-white text-sm font-bold whitespace-nowrap">
                {getProgressMessage()}
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dot <= shakeProgress 
                        ? 'w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                        : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal Pesan Rahasia */}
      {showMessage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={handleClose}
        >
          <div 
            className="glass-card w-full max-w-sm p-8 text-center relative overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-pink-500/20 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="text-6xl mb-6 animate-bounce-soft relative z-10">🎉</div>
            
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-4">
              Pesan Untukmu!
            </h3>
            
            <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/5">
              <p className="text-pink-50 text-lg font-medium leading-relaxed">
                &quot;{currentMessage}&quot;
              </p>
            </div>
            
            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold tracking-wide shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              type="button"
            >
              Simpan Pesan ❤️
            </button>
          </div>
        </div>
      )}
    </>
  );
}