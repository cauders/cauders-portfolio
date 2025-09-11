"use client";

import { useState, useEffect, useRef, type RefObject } from 'react';

const LERP_FACTOR = 0.2; 
const MAGNET_RADIUS = 80;

export function useMagneticEffect(ref: RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const parent = element.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clientX = e.clientX;
      const clientY = e.clientY;

      const distance = Math.sqrt(Math.pow(centerX - clientX, 2) + Math.pow(centerY - clientY, 2));

      let targetX = 0;
      let targetY = 0;

      if (distance < MAGNET_RADIUS) {
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        targetX = dx * 0.5;
        targetY = dy * 0.5;
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      const animate = () => {
        setPosition(prevPos => {
          const newX = prevPos.x + (targetX - prevPos.x) * LERP_FACTOR;
          const newY = prevPos.y + (targetY - prevPos.y) * LERP_FACTOR;

          if (Math.abs(targetX - newX) < 0.1 && Math.abs(targetY - newY) < 0.1) {
            if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            return { x: targetX, y: targetY };
          }
          
          animationFrameRef.current = requestAnimationFrame(animate);
          return { x: newX, y: newY };
        });
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
        let targetX = 0;
        let targetY = 0;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        const animate = () => {
            setPosition(prevPos => {
            const newX = prevPos.x + (targetX - prevPos.x) * LERP_FACTOR;
            const newY = prevPos.y + (targetY - prevPos.y) * LERP_FACTOR;

            if (Math.abs(targetX - newX) < 0.1 && Math.abs(targetY - newY) < 0.1) {
                if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
                return { x: 0, y: 0 };
            }
            
            animationFrameRef.current = requestAnimationFrame(animate);
            return { x: newX, y: newY };
            });
        };
        animationFrameRef.current = requestAnimationFrame(animate);
    }

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ref]);

  return position;
}
