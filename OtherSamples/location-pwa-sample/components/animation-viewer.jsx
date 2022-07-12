import { Suspense, useEffect, useRef, useState } from 'react';

import { XIcon } from '@primer/octicons-react';

import useStore from './store';

const AnimationViewer = (props) => {
  const nearestMarker = useStore((s) => s.nearestMarker);
  const toggleAnimationView = useStore((s) => s.toggleAnimationView);
  const handleCloseClick = () => {
    toggleAnimationView();
  };

  return (
    <Suspense fallback={null}>
      <div className="fixed inset-0 bg-black/50" style={{ zIndex: 100 }}>
        <nav className='absolute bottom-0 inset-x-0 px-2 py-4'>
          <button
            className="bg-white border border-gray-300 w-12 h-12 rounded-full"
            onClick={handleCloseClick}>
            <XIcon size={24} />
          </button>
        </nav>
        <section className="flex w-full h-full p-2 text-white">
          {/* TODO */}
          <img className='object-contain' src={nearestMarker ? nearestMarker.media : 'assets/test.gif'} />
          {/* -- */}
        </section>
      </div>
    </Suspense>
  );
};

export default AnimationViewer;
