"use client";

import { CuboidCollider } from "@react-three/rapier";

export default function BlockWall() {
  // 월드 가장자리의 보이지 않는 벽
  return (
    <>
      <CuboidCollider position={[-27.1, 2, -17.7]} args={[58, 4, 1]} />
      <CuboidCollider position={[31.3, 2, 7]} args={[1, 4, 26]} />
      <CuboidCollider position={[24, 2, 32.6]} args={[7.5, 4, 1]} />
      <CuboidCollider position={[16.7, 2, 59.1]} args={[1, 4, 26.5]} />
      <CuboidCollider position={[-34.4, 2, 85.6]} args={[51, 4, 1]} />
      <CuboidCollider position={[-85.5, 2, 33.9]} args={[1, 4, 51.6]} />
    </>
  );
}
