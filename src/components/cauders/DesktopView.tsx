
'use client';

import { Laptop, X } from 'lucide-react';
import { type ReactNode, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function DesktopView({ children }: { children: ReactNode }) {
  const [isDismissed, setIsDismissed] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage only on the client side
    const dismissed = localStorage.getItem('desktopPromptDismissed');
    if (!dismissed) {
      setIsDismissed(false);
      // Use a timeout to fade in the notice for a smoother experience
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Allow animation to complete before setting display to none
    setTimeout(() => {
        setIsDismissed(true);
        localStorage.setItem('desktopPromptDismissed', 'true');
    }, 300)
  };

  return (
    <>
      <div className="hidden sm:block">
        {children}
      </div>
      
      {!isDismissed && (
        <div 
          className={cn(
            "sm:hidden fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm text-center p-4 transition-opacity duration-300",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 rounded-full"
            onClick={handleDismiss}
            aria-label="Dismiss notice"
          >
            <X className="w-6 h-6" />
          </Button>
          <Laptop className="w-16 h-16 mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Desktop Experience Recommended</h2>
          <p className="text-muted-foreground max-w-sm">
            For the best viewing experience, please visit this site on a desktop device. You can dismiss this message to continue.
          </p>
        </div>
      )}

      {/* Render children on mobile only if the prompt is dismissed */}
      <div className={cn("sm:hidden", !isDismissed && "hidden")}>
          {children}
      </div>
    </>
  );
}
