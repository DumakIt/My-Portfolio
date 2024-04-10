"use client";

import * as THREE from "three";
import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useCharacterCam } from "../_hooks/useCharacterCam";
import { useFrame, useThree } from "@react-three/fiber";
import { useRaycast } from "../_hooks/useRaycast";
import CharacterModel from "./characterModel";
import { Socket } from "socket.io-client";

interface ICharacterSetting {
  socket: Socket | null;
  playerPosition: number[];
}

export default function CharacterSetting({ socket, playerPosition }: ICharacterSetting) {
  const velocity = useMemo(() => new THREE.Vector3(), []);
  const inputDirection = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const linvelDirection = useMemo(() => new THREE.Vector3(), []);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);
  const worldQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const worldEuler = useMemo(() => new THREE.Euler(), []);

  const characterRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const rapierRef = useRef<RapierRigidBody>(null);

  const { camera } = useThree();
  const { XRotation, YRotation } = useCharacterCam();
  const { canJump, isFalling } = useRaycast(rapierRef);
  const [nextAction, setNextAction] = useState("Idle");
  const [, getKeys] = useKeyboardControls();

  useLayoutEffect(() => {
    if (camera && groupRef.current && characterRef.current) {
      // 카메라 관련 기본 설정
      camera.position.set(characterRef.current.position.x, characterRef.current.position.y + 2, characterRef.current.position.z - 2.5); // 카메라 기본 위치 설정
      camera.lookAt(characterRef.current.position.x, characterRef.current.position.y + 1, characterRef.current.position.z); // 카메라가 캐릭터를 바라보게 설정

      groupRef.current?.add(YRotation); // YRotation을 groupRef 그룹에 추가
      YRotation.add(XRotation); // XRotation을 YRotation 그룹에 추가
      XRotation.add(camera); // 카메라를 XRotation 그룹에 추가
    }
  }, [camera, groupRef, XRotation, YRotation, characterRef]);

  useFrame(() => {
    if (!document.pointerLockElement) return;

    // 캐릭터 애니메이션
    const { forward, backward, left, right, run } = getKeys();
    let action = "Idle";

    if (!canJump.current && !isFalling.current) {
      action = "Jump";
    } else if (isFalling.current) {
      action = "Fall";
    } else if (canJump.current && (forward || backward || left || right)) {
      action = run ? "Run" : "Walk";
    }

    if (nextAction !== action) setNextAction(action);
  });

  useFrame(() => {
    if (!document.pointerLockElement) return;
    if (!characterRef.current || !rapierRef.current || !groupRef.current) return;

    const { forward, backward, left, right, jump, run } = getKeys();
    inputDirection.copy({ x: Number(left) - Number(right), y: 0, z: Number(forward) - Number(backward) }); // 현재 입력 방향 값 저장
    velocity.copy(rapierRef.current.linvel()); // 현재 캐릭터의 물리 값 저장

    if (forward || backward || left || right) {
      // "W, A, S, D" 입력시 현재 카메라가 보고 있는 방향이 기준이 되도록 캐릭터 그룹을 회전
      const rotate = YRotation.rotation.y;
      groupRef.current?.rotateY(rotate);
      YRotation.rotateY(-rotate);

      // 현재 방향 기준으로 캐릭터 회전
      // ex) "S" 입력시 카메라는 계속 앞을 보고 캐릭터가 뒤를 보게 회전
      characterRef.current.rotation.y = Math.atan2(inputDirection.x, inputDirection.z);
      const speed = run ? 4.5 : 2.5;
      // 현재 캐릭터가 보는 방향으로 이동하기 위한 물리 값 지정
      linvelDirection.set(inputDirection.x, 0, inputDirection.z).normalize().multiplyScalar(speed).applyEuler(groupRef.current.rotation);
      // 캐릭터 이동
      rapierRef.current.setLinvel({ x: linvelDirection.x, y: velocity.y, z: linvelDirection.z }, true);

      if (jump && canJump.current) {
        // 캐릭터 점프
        rapierRef.current.setLinvel({ x: velocity.x, y: 3, z: velocity.z }, true);
        canJump.current = false;
      }
    }
  });

  useFrame(() => {
    // 월드 좌표 기준 캐릭터의 위치 및 회전값 저장
    characterRef.current?.getWorldPosition(worldPosition);
    characterRef.current?.getWorldQuaternion(worldQuaternion);
    worldEuler.setFromQuaternion(worldQuaternion);

    const position = worldPosition.toArray();
    const rotation = worldEuler.toArray();

    if (playerPosition[0] !== position[0] && playerPosition[1] !== position[1] && playerPosition[2] !== position[2]) {
      // 캐릭터 위치가 변경되면 새로운 위치 전송
      socket?.emit("move", { position, rotation, action: nextAction });
    }
  });

  return (
    <RigidBody ref={rapierRef} colliders={false} position={[0, 1.6, 0]} friction={2} lockRotations>
      <CapsuleCollider args={[0.4, 0.4]} position={[0, 0.8, 0]} />
      <group ref={groupRef}>
        <CharacterModel me={true} nextAction={nextAction} selectCharacter={1} characterRef={characterRef} />
      </group>
    </RigidBody>
  );
}
