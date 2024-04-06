import * as THREE from "three";
import { RefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, useRapier } from "@react-three/rapier";

export const useRaycast = (rapierRef: RefObject<RapierRigidBody>) => {
  const groundDirection = useMemo(() => new THREE.Vector3(0, -1, 0), []); // raycast를 쏘는 방향
  const raycastPosition = useMemo(() => new THREE.Vector3(), []); // raycast를 쏘기 위한 현재 캐릭터 물리 위치

  const canJump = useRef(true);
  const isFalling = useRef(false);

  const { rapier, world } = useRapier();

  useFrame(() => {
    if (!rapierRef.current) return;
    // raycast를 쏘기 위한 현재 캐릭터 물리 위치에 Y방향 +0.4
    raycastPosition.copy(rapierRef.current.translation()).add({ x: 0, y: 0.4, z: 0 });

    const rayCast = new rapier.Ray(raycastPosition, groundDirection);
    // raycast가 얼마나 떨어진 물체에 hit 했는지 결과
    const hit = world.castRay(rayCast, 1.6, true, undefined, undefined, undefined, rapierRef.current);

    // hit이 null일 경우에는 떨어지고 있는 경우
    if (hit === null) {
      isFalling.current = true;
      canJump.current = false;
    }
    // hit.toi가 0.4 보다 작을 경우에는 땅에 캐릭터가 있다고 가정
    if (hit && hit?.toi < 0.4) {
      isFalling.current = false;
      canJump.current = true;
    }
  });

  return { canJump, isFalling };
};
