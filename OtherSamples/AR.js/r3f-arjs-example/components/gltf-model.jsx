import dynamic from 'next/dynamic';
import { useGLTF } from '@react-three/drei';
import { Suspense, useEffect } from 'react';

const GLTFModel = (props) => {
  const {
    src,
    scale = [1.0, 1.0, 1.0]
  } = props;
  const { scenes, nodes, materials } = useGLTF(src, false);

  // useEffect(() => {
  //   console.log(
  //     scenes, nodes, materials
  //   );
  // }, [nodes, materials]);

  return (
    <Suspense fallback={null}>
      <group scale={scale}>
        <primitive object={scenes[0]} />
      </group>
    </Suspense>
  );
};

export default dynamic(
  () => Promise.resolve(GLTFModel),
  { ssr: false }
);
