
'use client';

import Lottie from 'lottie-react';
import loaderAnimation from '../../public/lottie/loader-animation.json';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[201] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-48 h-48">
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    </div>
  );
}
