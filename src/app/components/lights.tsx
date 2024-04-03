"use client";

import { Environment } from "@react-three/drei";

export default function Lights() {
  return (
    <>
      <Environment preset="sunset" />
      <directionalLight
        position={[0, 100, -10]}
        intensity={1}
        castShadow
        shadow-camera-near={0.1}
        shadow-camera-far={10000}
        shadow-camera-left={-80}
        shadow-camera-right={240}
        shadow-camera-top={150}
        shadow-camera-bottom={-50}
        shadow-mapSize-width={5120}
        shadow-mapSize-height={5120}
      />
    </>
  );
}
