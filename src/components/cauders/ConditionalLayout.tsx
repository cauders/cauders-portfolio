'use client';

import { usePathname } from 'next/navigation';
import { getProjects } from '@/lib/data';
import { type ReactNode } from 'react';

export function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const allProjects = getProjects();
  const projectSlugs = allProjects.map(p => `/${p.slug}`);
  const isProjectPage = projectSlugs.includes(pathname);

  if (isProjectPage) {
    return null;
  }

  return <>{children}</>;
}
