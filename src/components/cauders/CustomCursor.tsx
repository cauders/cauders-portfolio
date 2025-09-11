"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest('a, button, [role="button"], input, textarea'));
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClient]);
  
   useEffect(() => {
    if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
    if (followerRef.current) {
        followerRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`;
    }
  }, [mousePosition]);

  if (!isClient) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] transition-transform ease-out",
          "w-8 h-8 -translate-x-1/2 -translate-y-1/2",
          !isVisible && "opacity-0"
        )}
      >
          {/* STATE 1: DEFAULT CURSOR (CHEVRON) */}
          <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className={cn(
                  "absolute transition-all duration-300",
                  !isPointer ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}
              style={{
                  filter: `drop-shadow(0 0 2px hsl(var(--primary)))`,
              }}
          >
              <path
                  d="M12 15 L10 1 L22 10"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
          </svg>

          {/* STATE 2: POINTER CURSOR (DOT WITH LINES) */}
          <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className={cn(
                  "absolute transition-all duration-300",
                  isPointer ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}
              style={{
                  filter: `drop-shadow(0 0 4px hsl(var(--primary)))`,
              }}
          >
              <circle  cx="9" cy="3" r="3.2" fill="hsl(var(--primary))" />
              <g transform="rotate(40, 16, 24)">
                  <path d="M4 12 H 14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
              </g>
              <g transform="rotate(80, 6, 12)">
                  <path d="M4 8 H 14" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
              </g>
          </svg>
      </div>
      <div
          ref={followerRef}
          style={{ transition: 'transform 0.4s linear' }}
          className={cn(
            "fixed top-0 left-0 pointer-events-none z-[-1]",
            "w-[500px] h-[500px] rounded-full shadow-primary-glow",
            "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 to-transparent blur-3xl",
            "transition-opacity duration-300"
          )}
      >
      </div>
    </>
  );
};

export default CustomCursor;
