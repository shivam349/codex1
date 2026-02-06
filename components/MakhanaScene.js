'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function MakhanaKernel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 8]} />
        <meshPhongMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.6}
          shininess={100}
        />
      </mesh>
    </Float>
  );
}

function SurroundingParticles() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} position={[-3, 2, -2]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhongMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1} position={[3, -1, -3]}>
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshPhongMaterial color="#fb923c" emissive="#f97316" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={1.5} position={[1, 3, -2]}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhongMaterial color="#fed7aa" emissive="#f97316" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} position={[-2, -2, -1]}>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshPhongMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={1.1} position={[2, 1, -2.5]}>
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshPhongMaterial color="#f97316" emissive="#d97706" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function MakhanaScene({ classNameProp = '' }) {
  return (
    <div className={`w-full rounded-3xl overflow-hidden ${classNameProp}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[8, 8, 8]} intensity={1.2} />
        <pointLight position={[-8, -8, 8]} intensity={0.9} color="#f59e0b" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#fbbf24" />

        <group>
          <MakhanaKernel />
          <SurroundingParticles />
          <Sparkles count={150} scale={5} size={3} speed={0.4} color="#fbbf24" />
        </group>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
      </Canvas>
    </div>
  );
}
