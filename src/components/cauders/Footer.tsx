
'use client';

import Link from 'next/link';
import MagneticLink from './MagneticLink';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getProjects } from '@/lib/data';


const quickLinks = [
    { href: 'https://cauders.com', label: 'Home' },
    { href: 'https://cauders.com/services', label: 'Services' },
    { href: '/', label: 'Portfolio' },
];

const companyLinks = [
    { href: 'https://cauders.com/about', label: 'About Us' },
    { href: 'https://cauders.com/contact', label: 'Contact' },
    { href: 'https://cauders.com/careers', label: 'Careers' },
    { href: 'https://cauders.com/faq', label: 'FAQ' },
]

const legalLinks = [
    { href: 'https://cauders.com/privacy-policy', label: 'Privacy Policy' },
    { href: 'https://cauders.com/terms-of-service', label: 'Terms of Service' },
]

const socialLinks = [
    { href: 'https://www.facebook.com/people/Cauders/61580041683735/', label: 'Facebook' },
    { href: 'https://www.instagram.com/ccauders/', label: 'Instagram' },
    { href: 'https://github.com/cauders', label: 'Github' },
    { href: 'https://www.linkedin.com/company/cauders/', label: 'LinkedIn' },
]

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  const pathname = usePathname();
  const allProjects = getProjects();
  const projectSlugs = allProjects.map(p => `/${p.slug}`);
  const isProjectPage = projectSlugs.includes(pathname);


  useEffect(() => {
    setYear(new Date().getFullYear());
    setIsClient(true);
  }, []);

  if (isProjectPage) {
    return null;
  }

  return (
      <footer className="relative text-white overflow-hidden z-20">
        <div 
          className="absolute top-[-120px] left-[-80px] w-64 h-64 bg-primary/30 rounded-full blur-3xl opacity-80"
        ></div>
        <div 
          className="absolute bottom-[-120px] right-[-80px] w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-80"
        ></div>
        <div className="glass-effect relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Column 1: Logo and Copyright */}
                <div className="lg:col-span-4 flex flex-col items-start">
                    <Link href="/" className="text-4xl font-bold hover:text-primary transition-colors mb-4">
                        Cauders
                    </Link>
                    <p className="text-sm text-white/70 mt-2 max-w-xs">
                        Crafting premium, modern, and dynamic websites and applications to elevate your digital presence.
                    </p>
                </div>

                {/* Column 2: Links */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold tracking-wider uppercase mb-4">Quick Links</h3>
                        <nav className="flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div>
                        <h3 className="font-semibold tracking-wider uppercase mb-4">Company</h3>
                        <nav className="flex flex-col gap-3">
                            {companyLinks.map((link) => (
                                <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Column 3: Contact & Legal */}
                <div className="lg:col-span-4">
                    <h3 className="font-semibold tracking-wider uppercase mb-4">Get in Touch</h3>
                    <a href="mailto:info@cauders.com" className="block hover:text-primary transition-colors mb-8">info@cauders.com</a>

                    <h3 className="font-semibold tracking-wider uppercase mb-4">Legal</h3>
                    <nav className="flex flex-col gap-3">
                        {legalLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-8">
                {isClient && (
                  <p className="text-sm text-white/70 text-center md:text-left">
                    &copy; {year} Cauders. All Rights Reserved.
                  </p>
                )}
                <div className="flex items-center justify-center flex-wrap gap-2">
                    {socialLinks.map((link) => (
                        <MagneticLink key={link.label} href={link.href} className="text-white !text-sm w-24 h-24">
                            {link.label}
                        </MagneticLink>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </footer>
  );
}
