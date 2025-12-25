'use client';

import { useState } from 'react';
import FloatingParticles from "@/components/FloatingParticles";
import HeroSection from "@/components/HeroSection";
import GetWellSection from "@/components/GetWellSection";
import StudySection from "@/components/StudySection";
import QuotesSection from "@/components/QuotesSection";
import MessageSection from "@/components/MessageSection";
import CuteFooter from "@/components/CuteFooter";
import SplashScreen from "@/components/SplashScreen";
import RippleEffect from "@/components/RippleEffect";
import EasterEgg from "@/components/EasterEgg";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="gradient-bg relative">
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      
      <div className={showSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <FloatingParticles />
        <RippleEffect />
        <EasterEgg />
        
        <main className="relative z-10">
          <HeroSection />
          <GetWellSection />
          <StudySection />
          <QuotesSection />
          <MessageSection />
          <CuteFooter />
        </main>
      </div>
    </div>
  );
}
