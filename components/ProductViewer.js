'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function ProductModel({ color = '#f59e0b', product = 'classic' }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const getGeometry = () => {
    switch (product) {
      case 'masala':
        return <octahedronGeometry args={[1.3, 4]} />;
      case 'honey':
        return <dodecahedronGeometry args={[1.1, 0]} />;
      case 'premium':
        return <icosahedronGeometry args={[1.4, 8]} />;
      default:
        return <icosahedronGeometry args={[1.2, 8]} />;
    }
  };

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshPhongMaterial
          color={color}
          emissive={new THREE.Color(color).multiplyScalar(0.8)}
          emissiveIntensity={0.5}
          shininess={100}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function ParticleRing({ productColor = '#f59e0b' }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={2} position={[(i - 2.5) * 1.2, 0, 0]}>
          <mesh position={[Math.cos((i / 6) * Math.PI * 2) * 2.5, 0, Math.sin((i / 6) * Math.PI * 2) * 2.5]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshPhongMaterial color={productColor} emissive={new THREE.Color(productColor).multiplyScalar(0.6)} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ProductViewer({ product = 'classic', color = '#f59e0b', classNameProp = '' }) {
  return (
    <div className={`w-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 ${classNameProp}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <pointLight position={[-8, -8, 8]} intensity={0.9} color={color} />
        <pointLight position={[0, 5, 3]} intensity={0.6} />

        <group>
          <ProductModel color={color} product={product} />
          <ParticleRing productColor={color} />
          <Sparkles count={120} scale={4.5} size={2.5} speed={0.3} color={color} />
        </group>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={5} maxPolarAngle={Math.PI} minPolarAngle={0} />
      </Canvas>
    </div>
  );
}
