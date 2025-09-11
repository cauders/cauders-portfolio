'use client';

import { Laptop } from 'lucide-react';
import type { ReactNode } from 'react';

export default function DesktopView({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="hidden sm:block">
        {children}
      </div>
      <div className="sm:hidden flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4">
        <Laptop className="w-16 h-16 mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Desktop Experience Recommended</h2>
        <p className="text-muted-foreground">
          For the best viewing experience, please visit this site on a desktop device.
        </p>
      </div>
    </>
  );
}
