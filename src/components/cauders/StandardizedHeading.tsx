
'use client';

import ScrollFadeIn from "./ScrollFadeIn";

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
          <span className="block">
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

