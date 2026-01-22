
'use client';

import ScrollFadeIn from "./ScrollFadeIn";

export default function AboutSection() {
    const text = "We don't just build\nWe create experiences.";
    const lines = text.split('\n');

    return (
        <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
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
                </div>
            </div>
        </section>
    )
}
