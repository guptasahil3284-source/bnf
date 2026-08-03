'use client';

import React, { useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import FloatingParticles from './FloatingParticles';

function CylinderScene() {
  const meshRef = useRef();
  
  const texturePaths = [
    '/images/hero/students.jpg',
    '/images/hero/workshop.jpg',
    '/images/hero/guidance.jpg',
    '/images/hero/volunteers.jpg',
    '/images/hero/learning.jpg',
    '/images/hero/activity.jpg'
  ];
  
  const textures = useTexture(texturePaths);
  
  textures.forEach(t => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const materials = useMemo(() => {
    const sideMats = textures.map(t => new THREE.MeshStandardMaterial({ map: t, roughness: 0.2, metalness: 0.1 }));
    
    const capMaterial = new THREE.MeshStandardMaterial({ 
      color: '#0D4F4F', 
      roughness: 0.5, 
      metalness: 0.2 
    });
    
    return { sideMats, capMaterial };
  }, [textures]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetZ = (state.pointer.y * Math.PI) / 10;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetZ, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetX, 0.1);
    }
  });
  
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(2, 2, 3, 6);
    geo.clearGroups();
    
    for (let i = 0; i < 6; i++) {
      geo.addGroup(i * 6, 6, i);
    }
    
    geo.addGroup(36, 18, 6); // Top
    geo.addGroup(54, 18, 7); // Bottom
    
    return geo;
  }, []);

  const meshMaterials = useMemo(() => {
    return [...materials.sideMats, materials.capMaterial, materials.capMaterial];
  }, [materials]);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} geometry={geometry} material={meshMaterials} />
    </Float>
  );
}

function Loader() {
  return (
    <mesh>
      <cylinderGeometry args={[2, 2, 3, 6]} />
      <meshStandardMaterial color="#0D4F4F" wireframe />
    </mesh>
  );
}

export default function HeroCylinder() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} style={{ height: '500px' }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={<Loader />}>
          <CylinderScene />
          <FloatingParticles />
        </Suspense>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
