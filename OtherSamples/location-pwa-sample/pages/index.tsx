import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic'

import useStore from '../components/store';
import markers from '../components/markers';

const GlobalMenu = dynamic(() => import('../components/global-menu'), { ssr: false });
const LeafletView = dynamic(() => import('../components/leaflet-view'), { ssr: false });
const AnimationViewer = dynamic(() => import('../components/animation-viewer'), { ssr: false });
const ArchiveViewer = dynamic(() => import('../components/archive-viewer'), { ssr: false });

export default function Home() {
  const activeView = useStore((s) => s.activeView);
  const toggleAnimationView = useStore((s) => s.toggleAnimationView);

  return (
    <>
      <GlobalMenu />
      <main>
      <LeafletView markers={markers} />
        {
          (activeView == 1) &&
          <AnimationViewer />
        }
        {
          (activeView == 2) &&
          <ArchiveViewer markers={markers} />
        }
      </main>
    </>
  );
}
