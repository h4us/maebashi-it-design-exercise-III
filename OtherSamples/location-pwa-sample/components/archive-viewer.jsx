import { Suspense, useEffect, useRef, useState } from 'react';

import { XIcon } from '@primer/octicons-react';

import useStore from './store';

import SamplCat from './sample-cat';

const ArchiveViewer = (props) => {
  const { markers = [] } = props;

  const toggleArchiveView = useStore((s) => s.toggleArchiveView);
  const handleCloseClick = () => {
    toggleArchiveView();
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
        <section
          /* className="w-full h-full p-2 text-white overflow-scroll bg-red-500/50" */
          className="w-full h-full px-12 py-4 text-white grid grid-cols-3 gap-2 overflow-y-scroll">
            {
              markers.map((el, i) => (
                <a
                  className='flex flex-col items-center justify-center w-full py-4'
                  href="#"
                  key={i}>
                  <h3>{i} : {el.name}</h3>
                  {/* <SamplCat /> */}
                  <img src={el.media} />
                </a>
              ))
            }
        </section>
      </div>
    </Suspense>
  );
};

export default ArchiveViewer;
