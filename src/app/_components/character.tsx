import * as THREE from "three";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useCharacterCam } from "../_hooks/useCharacterCam";
import { useFrame, useThree } from "@react-three/fiber";
import { useRaycast } from "../_hooks/useRaycast";

export default function Character() {
  const velocity = useMemo(() => new THREE.Vector3(), []);
  const inputDirection = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const linvelDirection = useMemo(() => new THREE.Vector3(), []);

  const characterRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const rapierRef = useRef<RapierRigidBody>(null);

  const { scene } = useGLTF("/models/femaleTypeA.glb");
  const { camera } = useThree();
  const { XRotation, YRotation } = useCharacterCam();
  const { canJump } = useRaycast(rapierRef);
  const [, getKeys] = useKeyboardControls();

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

  useFrame(() => {
    if (!characterRef.current) return;
    if (!rapierRef.current) return;
    if (!groupRef.current) return;

    const { forward, backward, left, right, jump } = getKeys();
    inputDirection.copy({ x: Number(left) - Number(right), y: 0, z: Number(forward) - Number(backward) }); // 현재 입력 방향 값 저장
    velocity.copy(rapierRef.current.linvel()); // 현재 캐릭터의 물리 값 저장

    if (forward) {
      // "W" 입력시 현재 카메라가 보고 있는 방향으로 캐릭터 회전
      const rotate = YRotation.rotation.y;
      groupRef.current?.rotateY(rotate);
      YRotation.rotateY(-rotate);
    }

    // "W, A, S, D" 입력시 현재 방향 기준으로 캐릭터 회전
    // ex) "S" 입력시 카메라는 계속 앞을 보고 캐릭터가 뒤를 보게 회전
    characterRef.current.rotation.y = Math.atan2(inputDirection.x, inputDirection.z);
    // 현재 캐릭터가 보는 방향으로 이동하기 위한 물리 값 지정
    linvelDirection.set(inputDirection.x, 0, inputDirection.z).normalize().multiplyScalar(4).applyEuler(groupRef.current.rotation);
    // 캐릭터 이동
    rapierRef.current.setLinvel({ x: linvelDirection.x, y: velocity.y, z: linvelDirection.z }, true);

    if (jump && canJump.current) {
      // 캐릭터 점프
      rapierRef.current.setLinvel({ x: velocity.x, y: 3, z: velocity.z }, true);
      canJump.current = false;
    }
  });

  return (
    <RigidBody ref={rapierRef} colliders={false} position={[0, 1.6, 0]} friction={2} lockRotations>
      <CapsuleCollider args={[0.4, 0.4]} position={[0, 0.8, 0]} />
      <group ref={groupRef}>
        <primitive ref={characterRef} object={scene} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models/femaleTypeA.glb");
