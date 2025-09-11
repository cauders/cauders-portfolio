
'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
    const videoRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!videoRef.current) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = videoRef.current.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) / (width / 2);
            const y = (clientY - (top + height / 2)) / (height / 2);
            
            setStyle({
                '--rotate-x': `${-y * 10}deg`,
                '--rotate-y': `${x * 10}deg`,
            });
        };

        const handleMouseLeave = () => {
            setStyle({
                '--rotate-x': '0deg',
                '--rotate-y': '0deg',
            });
        };

        const container = document.getElementById('hero-section');
        container?.addEventListener('mousemove', handleMouseMove);
        container?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container?.removeEventListener('mousemove', handleMouseMove);
            container?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section id="hero-section" className="relative py-24 sm:py-32 overflow-hidden flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
                <div 
                    className="perspective-container max-w-5xl mx-auto animate-zoom-in"
                    style={{ animationDelay: '0.2s' }}
                >
                    <div 
                        ref={videoRef}
                        className="video-tilt-container rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 relative"
                        style={style}
                    >
                         <video
                            className="w-full h-full object-cover"
                            poster="/images/portfolio/hero-poster.jpg"
                            muted
                            autoPlay
                            loop
                            playsInline
                        >
                            <source src="videos/portfolio-vid.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-8">
                             <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-highlight-group">
                                <span className="block word-highlight">Innovate.</span>
                                <span className="block word-highlight">Integrate.</span>
                                <span className="block word-highlight">Inspire.</span>
                            </h1>
                            <div className="mt-8">
                                <Button asChild size="lg" variant="default">
                                    <Link href="#portfolio-preview">Explore our projects</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
