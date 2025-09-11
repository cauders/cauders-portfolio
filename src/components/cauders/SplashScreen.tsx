'use client';

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '../../../public/lottie/loader-animation.json';
import { cn } from '@/lib/utils';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Add a small delay to ensure all visuals are ready
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-700 ease-out",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="w-48 h-48">
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    </div>
  );
}
