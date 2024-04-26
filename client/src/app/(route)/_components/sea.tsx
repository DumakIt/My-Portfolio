"use client";

import { Plane } from "@react-three/drei";

export default function Sea() {
  return (
    <Plane args={[300, 300]} rotation-x={-Math.PI / 2} receiveShadow>
      <meshStandardMaterial color={"#5272cb"} />
    </Plane>
  );
}
