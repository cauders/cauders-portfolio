
"use client";

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollFadeInProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export default function ScrollFadeIn({ children, className, style, direction = 'up', delay = 0 }: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [direction === 'left' ? -100 : direction === 'right' ? 100 : 0, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [direction === 'up' ? 100 : direction === 'down' ? -100 : 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={ref} className={cn("overflow-hidden py-2", className)}>
        <motion.div
        style={{ 
            ...style,
            x,
            y,
            opacity,
            transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
        }}
        >
        {children}
        </motion.div>
    </div>
  );
}
