
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CARD_ANGLE = 30; // Angle between each card in the carousel

export default function PortfolioPreview() {
  const projects = getProjects().slice(0, 12);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isCursorNearCard, setIsCursorNearCard] = useState<number | null>(null);

  const middleCardIndex = Math.floor(projects.length / 2);
  const initialRotation = -middleCardIndex * CARD_ANGLE;

  const cursorPosition = useRef({ x: 0, y: 0 });
  const followerPosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const wasDragging = useRef(false);
  const startX = useRef(0);
  const startRotateY = useRef(initialRotation);
  const currentRotateY = useRef(initialRotation);
  const targetRotateY = useRef(initialRotation);
  const velocity = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  
  const carouselRadius = -630 / (2 * Math.tan(Math.PI / projects.length));

  useEffect(() => {
    const animate = () => {
      if (followerRef.current) {
        followerPosition.current.x += (cursorPosition.current.x - followerPosition.current.x - 20) * 0.1;
        followerPosition.current.y += (cursorPosition.current.y - followerPosition.current.y - 20) * 0.1;
        followerRef.current.style.transform = `translate(-50%, -50%) translate3d(${followerPosition.current.x}px, ${followerPosition.current.y}px, 0)`;
      }

      if (carouselWrapRef.current) {
        if (!isDragging.current) {
          velocity.current *= 0.95; // Damping factor for momentum
          if (Math.abs(velocity.current) > 0.01) {
            targetRotateY.current += velocity.current;
          }
        }
        
        const damping = isDragging.current ? 0.15 : 0.08;
        currentRotateY.current += (targetRotateY.current - currentRotateY.current) * damping;
        carouselWrapRef.current.style.transform = `translateZ(${Math.abs(carouselRadius)}px) rotateY(${currentRotateY.current}deg) rotateX(0deg)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [carouselRadius]);

  useEffect(() => {
    const handleScroll = () => {
      if (isDragging.current) return;
      const deltaScroll = window.scrollY - lastScrollY.current;
      targetRotateY.current -= deltaScroll * 0.05;
      lastScrollY.current = window.scrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cursorPosition.current = { x: e.clientX, y: e.clientY };

    if (isDragging.current) {
      const walk = e.pageX - startX.current;
      const newTargetRotateY = startRotateY.current + walk * -0.5;
      velocity.current = (newTargetRotateY - targetRotateY.current) * 0.5;
      targetRotateY.current = newTargetRotateY;
      startX.current = e.pageX;
      startRotateY.current = newTargetRotateY;
    }
    
    let nearestCardIndex: number | null = null;
    let minDistance = 250;

    cardRefs.current.forEach((card, index) => {
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - cardCenterX, 2) +
          Math.pow(e.clientY - cardCenterY, 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestCardIndex = index;
        }
      }
    });

    setIsCursorNearCard(nearestCardIndex);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    wasDragging.current = false;
    startX.current = e.pageX;
    startRotateY.current = currentRotateY.current;
    velocity.current = 0;
    // Set a timeout to check if the mouse has moved, indicating a drag
    setTimeout(() => {
        if(isDragging.current) wasDragging.current = true;
    }, 150);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    setIsCursorNearCard(null);
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    if (wasDragging.current) {
      e.preventDefault();
      wasDragging.current = false; // Reset for next click
    }
  }

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col justify-center h-full w-full"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={followerRef}
        className={cn(
          "fixed w-24 h-24 rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold pointer-events-none z-20 transition-all duration-300 ease-out top-0 left-0",
          "glass-effect border border-primary/50",
          (isCursorNearCard !== null || isDragging.current) ? "opacity-100 scale-100" : "opacity-0 scale-50"
        )}
        style={{ filter: "drop-shadow(0 0 25px hsl(var(--primary) / 0.5))" }}
      >
        <div className="flex items-center text-primary">
          <ChevronLeft className="w-6 h-6" />
          <span className="uppercase text-xs tracking-widest">Drag</span>
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>


      {/* 3D Carousel Area */}
      <div className="h-[45vh] mt-16 perspective-carousel pointer-events-none">
        <div ref={carouselWrapRef} className="relative w-full h-full carousel-wrap">
          {projects.map((project, index) => {
            const cardRotation = index * CARD_ANGLE;
            return (
              <div
                key={project.slug}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="absolute w-[95vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw] h-full top-0 left-0 right-0 mx-auto pointer-events-auto"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  transform: `rotateY(${cardRotation}deg) translateZ(${carouselRadius}px)`,
                }}
              >
                <Link
                  href={`/${project.slug}`}
                  onClick={handleCardClick}
                  className={cn(
                    "block h-full w-full transition-all duration-500 ease-out rounded-3xl group",
                    activeCard === index && "shadow-primary-glow"
                  )}
                  draggable={false}
                >
                  <Card className="h-full w-full overflow-hidden rounded-3xl shadow-lg">
                    <div className="w-full h-full bg-foreground relative overflow-hidden rounded-3xl transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={600}
                        height={450}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </Card>
                  
                  <div
                    className={cn(
                      "absolute w-[95%] bottom-0 p-4 md:p-6 lg:p-8 z-20 transition-all duration-700 ease-out text-left pointer-events-none",
                      "opacity-0 group-hover:opacity-100 group-hover:-translate-y-4"
                    )}
                  >
                    <p className="text-lg md:text-xl lg:text-2xl font-garet text-white font-medium drop-shadow-md">
                      {project.description}
                    </p>
                    <h3 className="font-black text-2xl md:text-3xl lg:text-4xl text-white mt-1 font-headline drop-shadow-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-xs text-primary font-semibold uppercase tracking-wide drop-shadow-md">
                      {project.category}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      
       <div className="container mx-auto px-4 text-center mt-32 relative z-10 pointer-events-auto">
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="border-primary text-primary glass-effect hover:shadow-primary-glow"
          >
            <Link href="/projects">
              See All Projects <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
    </div>
  );
}
