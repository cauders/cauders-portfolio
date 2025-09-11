'use client';

import { useRef, type ReactNode, type FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface MagneticLinkProps {
  href: string;
  onClick?: () => void;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const MagneticLink: FC<MagneticLinkProps> = ({ href, onClick, children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMagneticEffect(ref);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
      }}
      className="relative group w-28 h-28 flex items-center justify-center"
    >
      <Link
        href={href}
        onClick={onClick}
        target={href.startsWith('http') ? '_blank' : '_self'}
        className={cn(
            "relative text-xl font-medium z-10 transition-colors duration-300 flex items-center justify-center w-full h-full text-center p-8",
            props.className
        )}
        style={props.style}
      >
        {children}
      </Link>
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 60 60"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          className="outline-circle"
          cx="30" cy="30"
          r="29"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default MagneticLink;
