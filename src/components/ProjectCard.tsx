'use client';
import type { Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { useState, useRef, useLayoutEffect } from "react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [descriptionLineClamp, setDescriptionLineClamp] = useState('line-clamp-3');
  const [isImageLoading, setIsImageLoading] = useState(true);


  useLayoutEffect(() => {
    const checkTitleLines = () => {
      if (titleRef.current) {
        const titleHeight = titleRef.current.offsetHeight;
        const computedStyle = getComputedStyle(titleRef.current);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const lines = Math.round(titleHeight / lineHeight);

        if (lines > 1) {
          setDescriptionLineClamp('line-clamp-2');
        } else {
          setDescriptionLineClamp('line-clamp-3');
        }
      }
    };
    
    checkTitleLines();
    
    // Fallback for resize events
    window.addEventListener('resize', checkTitleLines);
    return () => window.removeEventListener('resize', checkTitleLines);
  }, [project.title]);


  return (
    <div className="group flip-card h-full">
      <div className="flip-card-inner relative w-full aspect-[4/3] rounded-2xl"> {/* Updated to rounded-2xl for more pronounced corners */}
        {/* Front of the card */}
        <div className="flip-card-front absolute w-full h-full rounded-2xl overflow-hidden"> {/* Updated to rounded-2xl */}
          <Card className={cn("w-full h-full overflow-hidden rounded-2xl", isImageLoading && "shimmer-bg")}> {/* Updated to rounded-2xl */}
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className={cn(
                "object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsImageLoading(false)}
              data-ai-hint="project hero image"
            />
              {!isImageLoading && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" /> {/* Added rounded-2xl */}
                <div className="absolute bottom-0 left-0 p-6"> 
                  <h3 className="font-headline text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                    <p className="mt-4 text-xs text-primary font-semibold uppercase tracking-wide drop-shadow-md">
                      {project.category}
                    </p>
                  
                </div>
              </>
            )}
          </Card>
        </div>

        {/* Back of the card */}
        <div className="flip-card-back absolute w-full h-full rounded-2xl overflow-hidden"> {/* Updated to rounded-2xl */}
          <Card className="w-full h-full bg-secondary flex flex-col justify-between p-6 animated-border-card border-primary rounded-2xl"> {/* Updated to rounded-2xl */}
              <div>
                <Badge variant="default" className="mb-2 rounded-2xl"> {/* Updated to rounded-2xl */}
                  {project.category}
                </Badge>
                <h3 ref={titleRef} className="font-headline text-2xl font-bold text-secondary-foreground mb-2">
                  {project.title}
                </h3>
                <p className={cn("text-secondary-foreground/80 text-sm mb-4", descriptionLineClamp)}>
                  {project.longDescription}
                </p>
              </div>
              <Link href={`/${project.slug}`} className="w-full rounded-2xl"> {/* Added rounded-2xl */}
                  <Button className="w-full button rounded-2xl" variant="default"> {/* Updated to rounded-2xl */}
                    View Project <MoveRight className="ml-2" />
                  </Button>
              </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}