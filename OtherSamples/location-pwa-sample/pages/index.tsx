import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic'

// import LeafletView from '../components/leaflet-view';
const LeafletView = dynamic(() => import('../components/leaflet-view'), { ssr: false });

export default function Home() {
  useEffect(() => {
    //
  }, []);

  return (
    <main>
      <LeafletView />
    </main>
  );
}
