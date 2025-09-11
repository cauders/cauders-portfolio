
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Section {
    id: string;
    label: string;
}

interface ProjectDetailsNavProps {
    sections: Section[];
}

export default function ProjectDetailsNav({ sections }: ProjectDetailsNavProps) {
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            
            let currentSection = '';

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition) {
                    currentSection = section.id;
                }
            }
            setActiveSection(currentSection);
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Adjust offset as needed
                behavior: 'smooth',
            });
            setActiveSection(sectionId);
        }
    };


    return (
        <nav>
            <ul className="space-y-2">
                {sections.map(section => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            onClick={(e) => handleLinkClick(e, section.id)}
                            className={cn(
                                "flex items-center text-base transition-colors hover:text-primary",
                                activeSection === section.id ? 'text-primary font-bold active-nav-link' : 'text-foreground'
                            )}
                        >
                           <span className="nav-dot mr-3 h-2 w-2 rounded-full bg-transparent transition-colors"></span>
                           {section.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
