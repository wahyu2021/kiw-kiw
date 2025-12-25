'use client';

import { useState } from 'react';
import FloatingParticles from "@/components/FloatingParticles";
import HeroSection from "@/components/HeroSection";
import GetWellSection from "@/components/GetWellSection";
import CountdownSection from "@/components/CountdownSection";
import StudySection from "@/components/StudySection";
import PlaylistSection from "@/components/PlaylistSection";
import QuotesSection from "@/components/QuotesSection";
import MessageSection from "@/components/MessageSection";
import CuteFooter from "@/components/CuteFooter";
import SplashScreen from "@/components/SplashScreen";
import EasterEgg from "@/components/EasterEgg";
import ShakeMessage from "@/components/ShakeMessage";

/**
 * Home Page
 * 
 * Halaman utama website "Untuk Kamu" yang menampilkan:
 * - SplashScreen dengan loading animation
 * - HeroSection dengan greeting
 * - GetWellSection dengan tips kesehatan
 * - CountdownSection untuk ujian
 * - StudySection dengan motivasi belajar
 * - PlaylistSection dengan lagu favorit
 * - QuotesSection dengan quotes motivasi
 * - MessageSection dengan pesan personal
 * - CuteFooter dengan ucapan penutup
 * 
 * Fitur tambahan: ShakeMessage, EasterEgg, FloatingParticles
 */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <ShakeMessage />
      
      <div className="gradient-bg relative overflow-x-hidden max-w-full">
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
        
        <div className={`overflow-x-hidden ${showSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
          <FloatingParticles />
          <EasterEgg />
          
          <main className="relative z-10 overflow-x-hidden">
            <HeroSection />
            <GetWellSection />
            <CountdownSection />
            <StudySection />
            <PlaylistSection />
            <QuotesSection />
            <MessageSection />
            <CuteFooter />
          </main>
        </div>
      </div>
    </>
  );
}
