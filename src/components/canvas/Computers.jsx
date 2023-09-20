import { Suspense, useEffect, useState } from 'react';
import { Canvas, events } from '@react-three/fiber'; //Solo el canvas
import { Gltf, OrbitControls, Preload, useGLTF } from '@react-three/drei';// pa dibujar en el canvas

import CanvasLoader from '../Loader'; //dunno rai nau

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15}
      groundColor="black" />
      <pointLight intensity={2.5} color={"purple"}/>
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 1 : 2.9}
        position={isMobile ? [0, 0, 0] : [-1, -5.1, 1]}
        rotation={[0, 0.8, 0]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {setIsMobile(event.matches)};

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])


  return (
    <Canvas
      frameLoop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;