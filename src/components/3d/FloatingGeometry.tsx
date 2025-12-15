import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Octahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = ({ position, color, shape, speed = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  shape: 'icosahedron' | 'octahedron' | 'torus';
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const ShapeComponent = useMemo(() => {
    switch (shape) {
      case 'icosahedron':
        return <Icosahedron args={[1, 1]} />;
      case 'octahedron':
        return <Octahedron args={[1]} />;
      case 'torus':
        return <Torus args={[1, 0.4, 16, 32]} />;
      default:
        return <Icosahedron args={[1, 1]} />;
    }
  }, [shape]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={0.8}>
        {ShapeComponent}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingGeometry = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
        
        <AnimatedShape position={[-3, 2, -2]} color="#22d3ee" shape="icosahedron" speed={0.8} />
        <AnimatedShape position={[3, -1, -3]} color="#a855f7" shape="octahedron" speed={1.2} />
        <AnimatedShape position={[0, -2, -1]} color="#22d3ee" shape="torus" speed={0.6} />
        
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default FloatingGeometry;
