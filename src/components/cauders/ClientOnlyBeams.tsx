'use client';

import dynamic from 'next/dynamic';

const Beams = dynamic(() => import('@/components/cauders/Beams'), {
  ssr: false,
  loading: () => null,
});

export function ClientOnlyBeams() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={24}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={0}
      />
    </div>
  );
}
