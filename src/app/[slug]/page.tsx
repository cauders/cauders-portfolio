
'use client';

import { getProjects } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import type { Project } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectDetailsNav from '@/components/cauders/ProjectDetailsNav';
import StandardizedHeading from '@/components/cauders/StandardizedHeading';
import { cn } from '@/lib/utils';

const ShimmerImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn(
      "relative w-full h-full overflow-hidden rounded-xl",
      isLoading && "shimmer-bg"
    )}>
      <Image 
        src={src} 
        alt={alt} 
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 75vw"
        className={cn(
          "object-cover transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};


export default function ProjectPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [previousProject, setPreviousProject] = useState<Project | undefined>(undefined);
  const [nextProject, setNextProject] = useState<Project | undefined>(undefined);
  
  const allProjects = getProjects();

  useEffect(() => {
    if (slug) {
      const projectIndex = allProjects.findIndex((p) => p.slug === slug);
      if (projectIndex === -1) {
        notFound();
        return;
      }
      
      const currentProject = allProjects[projectIndex];
      setProject(currentProject);
      
      setPreviousProject(projectIndex > 0 ? allProjects[projectIndex - 1] : undefined);
      setNextProject(projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : undefined);
    }
  }, [slug, allProjects]);

  if (!project) {
    return null; // Or a loading skeleton
  }

  const { title, category, longDescription, technologies, gallery, imageUrl, url, industry, status, year, implementation, mobileScreenshots } = project;

  const sections = [
    {id: 'about', label: 'About'},
    {id: 'gallery', label: 'Gallery'},
  ];

  const buttonClasses = "border-primary text-primary glass-effect hover:shadow-primary-glow hover:bg-transparent hover:text-primary";

  return (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="lg:flex"
      >
        {/* Left Fixed Column */}
        <aside className="w-full lg:w-80 lg:fixed lg:left-0 lg:top-0 lg:h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-r border-border">
          <div>
            <div className="mb-8">
              <Button asChild variant="outline" className={buttonClasses}>
                  <Link href="/portfolio">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                  </Link>
              </Button>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-semibold tracking-tight mb-4">{title}</h1>
            <Badge variant="secondary" className="mb-6">{category}</Badge>
            <div className="space-y-2 text-sm text-foreground mb-8">
                <p><strong>Industry:</strong> {industry}</p>
                <p><strong>Status:</strong> {status} - {year}</p>
            </div>
             <ProjectDetailsNav sections={sections} />
          </div>
          
          <div className="flex flex-col space-y-4 mt-12">
            {url && url !== '#' && (
                 <Button asChild variant="link" className="text-foreground justify-start p-0 h-auto text-2xl">
                    <Link href={url} target="_blank">
                        {category === 'Mobile App' ? 'Download App' : 'Visit Website'} <ExternalLink className="ml-2 h-4 w-4"/>
                    </Link>
                </Button>
            )}

            <div className="hidden lg:flex justify-between items-center gap-2">
                {previousProject ? (
                    <Button asChild variant="outline" className={`flex-1 ${buttonClasses}`}>
                        <Link href={`/${previousProject.slug}`} aria-label="Previous Project">
                            <ArrowLeft className="mr-2 h-4 w-4" /> <span className="hidden xl:inline">Previous</span>
                        </Link>
                    </Button>
                ) : <div className="flex-1" />}
                {nextProject && (
                    <Button asChild variant="outline" className={`flex-1 ${buttonClasses}`}>
                        <Link href={`/${nextProject.slug}`} aria-label="Next Project">
                            <span className="hidden xl:inline">Next</span> <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
          </div>
        </aside>

        {/* Right Scrollable Column */}
        <main className="w-full lg:ml-80">
          <div className="p-4 sm:p-8 md:p-12 space-y-8 pb-32">
            <div id="about" className="relative w-full aspect-video rounded-xl overflow-hidden scroll-mt-24">
               <ShimmerImage 
                  src={imageUrl} 
                  alt={title} 
                  data-ai-hint="project hero image"
              />
            </div>

            <div className="max-w-3xl py-8">
                <h2 className="font-headline text-2xl font-bold mb-4 text-foreground">About the Project</h2>
                <p className="text-foreground text-lg">{longDescription}</p>
            </div>

            {category === 'Mobile App' && mobileScreenshots && mobileScreenshots.length > 0 && (
              <div className="py-8">
                <div className="mobile-gallery max-w-5xl mx-auto">
                    {mobileScreenshots.map((src, i) => (
                      <div key={i} className="phone-mockup">
                        <div className="phone-screen">
                           <Image
                              src={src}
                              alt={`${title} screenshot ${i + 1}`}
                              width={400}
                              height={800}
                              className="object-cover w-full h-full"
                              data-ai-hint="mobile app screenshot"
                           />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            <div id="gallery" className="scroll-mt-24">
              {gallery.map((imgSrc, index) => (
                <div key={index} className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
                  <ShimmerImage 
                    src={imgSrc} 
                    alt={`${title} screenshot ${index + 1}`} 
                    data-ai-hint="project gallery image"
                  />
                </div>
              ))}
            </div>

             <div className="max-w-3xl py-16 text-left">
                <div className='mb-4'>
                  <StandardizedHeading text={"Do you like it?"} />
                </div>
                <a href="mailto:info@cauders.com" className="font-headline text-3xl md:text-5xl underline hover:text-primary transition-colors">
                    info@cauders.com
                </a>
             </div>
          </div>
        </main>
      </motion.div>
      {/* Mobile Nav */}
       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4 z-50">
            <div className="flex justify-between items-center gap-2">
                 {previousProject ? (
                    <Button asChild variant="outline" className={`flex-1 ${buttonClasses}`}>
                        <Link href={`/${previousProject.slug}`} aria-label="Previous Project">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Link>
                    </Button>
                ) : <div className="flex-1"/>}
                {nextProject && (
                    <Button asChild variant="outline" className={`flex-1 ${buttonClasses}`}>
                        <Link href={`/${nextProject.slug}`} aria-label="Next Project">
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
       </div>
    </div>
  );
}
