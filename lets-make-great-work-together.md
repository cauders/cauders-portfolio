# Code for "Let's Make Great Work Together" Section

Here is the code needed to recreate the animated Call-to-Action section.

## 1. Component Structure (React/JSX)

This is the structure of the main section and the heading component. You will likely need to adjust the import paths for the `Button`, `Link`, and `ScrollFadeIn` components.

### `CtaSection.tsx`

```tsx
'use client';

import Link from 'next/link';
import { Button } from './ui/button'; // Adjust path
import StandardizedHeading from './StandardizedHeading'; // Adjust path

export default function CtaSection() {
    return (
        // This section is designed to take the full screen height
        <section className="relative py-20 md:py-32 overflow-hidden h-screen flex items-center justify-center">
            <div className="relative container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <StandardizedHeading text={"Let's make great\nwork together"} />
                    <div className="mt-12">
                        <Button asChild size="lg" variant="default">
                            <Link href="/contact">Get in touch</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
```

### `StandardizedHeading.tsx`

This component takes a string, splits it by newlines (`\n`) and spaces, and wraps each word in an animated container.

```tsx
'use client';

import ScrollFadeIn from "./ScrollFadeIn"; // Adjust path

interface StandardizedHeadingProps {
  text: string;
}

export default function StandardizedHeading({ text }: StandardizedHeadingProps) {
  const lines = text.split('\n');

  return (
    <h2 className="font-headline text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
      {lines.map((line, lineIndex) => (
        <ScrollFadeIn
          key={lineIndex}
          direction={lineIndex % 2 === 0 ? 'left' : 'right'}
          delay={0.1}
          className="text-highlight-group"
        >
          <span className="block whitespace-nowrap">
            {line.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="word-highlight">
                {word}{' '}
              </span>
            ))}
          </span>
        </ScrollFadeIn>
      ))}
    </h2>
  );
}
```

## 2. Scroll Animation Component (Framer Motion)

This component uses `framer-motion` to fade in elements as you scroll them into view.

### `ScrollFadeIn.tsx`

```tsx
"use client";

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils'; // Utility for merging class names

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
```

## 3. Global CSS Styles (Tailwind CSS)

These utility classes are needed for the text highlight effect. Add these to your global CSS file. You will need to have Tailwind CSS configured. The colors (`--primary`, `--foreground`) are defined using CSS variables, which is a common practice with ShadCN UI and Tailwind.

```css
@layer utilities {
  /* This group is for the word highlight effect */
  .text-highlight-group .word-highlight {
    transition: color 0.3s ease-out, text-shadow 0.3s ease-out;
  }

  .word-highlight:hover {
    color: hsl(var(--primary));
    text-shadow: 0 0 8px hsl(var(--primary) / 0.7);
  }

  /* Keyframe animations for the ScrollFadeIn effect */
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }

  @keyframes fade-in-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-down {
      animation: fade-in-down 0.5s ease-out forwards;
  }
}
```
