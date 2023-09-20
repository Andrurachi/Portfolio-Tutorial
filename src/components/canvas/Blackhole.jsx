import { Suspense } from "react"
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader';

const Blackhole = () => {
  const blackhole = useGLTF('./blackhole/scene.gltf')

  return (
    <mesh>
      <pointLight intensity={1000000} color="#151030" position-y={0.3} />

      <primitive 
      object={blackhole.scene}
      scale={1.4}
      position-y={0.3}
      rotation-y={0.5}
    />
    </mesh>
    
  )
}

const BlackholeCanvas = () => {
  return(
    <Canvas
      shadows
      frameloop='demand'
      gl={{ prserveDrawingbuffer: true }}
      camera={{ 
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6]
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Blackhole />
      </Suspense>
    </Canvas>
  )
}

export default BlackholeCanvas;