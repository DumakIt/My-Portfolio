import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useLayoutEffect, useRef } from "react";
import { useCharacterCam } from "../_hooks/useCharacterCam";
import { useThree } from "@react-three/fiber";

export default function Character() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const { scene } = useGLTF("/models/femaleTypeA.glb");
  const { XRotation, YRotation } = useCharacterCam();

  useLayoutEffect(() => {
    if (camera && groupRef.current) {
      // 카메라 관련 기본 설정
      camera.position.set(scene.position.x, scene.position.y + 2, scene.position.z - 2.5); // 카메라 기본 위치 설정
      camera.lookAt(scene.position.x, scene.position.y + 1, scene.position.z); // 카메라가 캐릭터를 바라보게 설정

      groupRef.current?.add(YRotation); // YRotation을 groupRef 그룹에 추가
      YRotation.add(XRotation); // XRotation을 YRotation 그룹에 추가
      XRotation.add(camera); // 카메라를 XRotation 그룹에 추가
    }
  }, [camera, groupRef, XRotation, YRotation, scene]);

  useLayoutEffect(() => {
    if (scene) {
      // 모델에 그림자 속성 추가
      scene.traverse((obj) => {
        obj.castShadow = true;
        obj.receiveShadow = true;
      });
    }
  }, [scene]);

  return (
    <RigidBody colliders={false} position={[0, 1.6, 0]} friction={2} lockRotations>
      <CapsuleCollider args={[0.4, 0.4]} position={[0, 0.8, 0]} />
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models/femaleTypeA.glb");
