'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';

function Kernel({ position, color }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) {
      return;
    }
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.8;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.42, 48, 48]} />
      <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
    </mesh>
  );
}

export default function MakhanaScene() {
  const kernels = useMemo(
    () => [
      { position: [-1.2, 0.1, 0], color: '#f5efe2' },
      { position: [0, 0, 0], color: '#f0e7d8' },
      { position: [1.1, 0.2, 0], color: '#f7f1e5' },
      { position: [-0.4, -0.9, 0.1], color: '#ede4d5' },
      { position: [0.8, -0.8, -0.3], color: '#f4ecde' }
    ],
    []
  );

  return (
    <div className="h-[420px] w-full rounded-3xl border border-brand-100 bg-gradient-to-b from-[#fffaf0] to-[#fff4e3] shadow-card">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        {kernels.map((kernel) => (
          <Float key={kernel.position.join(',')} speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
            <Kernel position={kernel.position} color={kernel.color} />
          </Float>
        ))}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
