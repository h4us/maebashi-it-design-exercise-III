
import { LocationIcon, BookIcon } from '@primer/octicons-react';

import useStore from './store';

const GlobalMenu = (props) => {
  const updateNow = useStore((s) => s.updateNow);
  const toggleArchiveView = useStore((s) => s.toggleArchiveView);

  return (
    <>
      <div
        /* className='fixed top-0 bg-red-500/50' */
        className='fixed top-0'
        style={{ zIndex: 101 }}>
        <nav className="px-2 py-4">
          <button
            className="bg-white w-12 h-12 border border-gray-300 rounded-full p-1"
            onClick={() => updateNow()}>
            <LocationIcon size={24} />
          </button>
        </nav>
      </div>

      <div
        /* className='fixed bottom-0 right-0 bg-red-500/50' */
        className='fixed bottom-0 right-0'
        style={{ zIndex: 101 }}>
        <nav className="px-2 py-4">
          <button
            className="bg-white w-12 h-12 border border-gray-300 rounded-full p-1"
            onClick={() => toggleArchiveView() }>
            <BookIcon size={24} />
          </button>
        </nav>
      </div>
    </>
  );
};

export default GlobalMenu;
