import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { ARCanvas, ARMarker } from '@artcom/react-three-arjs';

import GLTFModel from '../components/gltf-model';

const MultiModelPage = () => {
  const [dpr, setDpr] = useState(1);
  const [t, setT] = useState(0);
  const itvl = useRef(null);

  useEffect(() => {
    setDpr(window.devicePixelRatio);

    itvl.current = setInterval(() => {
      setT((ct) => (ct + 1) % 3);
    }, 3000);

    return () => {
      if (itvl.current) {
        clearInterval(itvl.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>multi model test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <ARCanvas
        /* detectionMode={"mono_and_matrix"} */
        /* cameraParametersUrl={"data/camera_para.dat"} */
        /* matrixCodeType={"3x3"} */
        camera={{ position: [0, 0, 0] }}
        dpr={dpr}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight);
        }}>
        <ambientLight />
        <pointLight position={[10, 10, 0]} />
        <ARMarker
          type={'barcode'}
          barcodeValue={1}>
          {
            t == 0 && (
              <GLTFModel src="https://dl.dropbox.com/s/4mrwdag0shhwygv/soja-pcl.glb" scale={[0.1,0.1,0.1]} />
            )
          }
          {
            t == 1 && (
              <GLTFModel src="/suzanne-brick.glb" />
            )
          }
          {
            t == 2 && (
              <mesh>
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={"green"} />
              </mesh>
            )
          }
        </ARMarker>
      </ARCanvas>
    </>
  );
};

export default MultiModelPage;
