"use client";

import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { RefObject, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { characterGlb } from "@/app/constants/constants";

interface ICharacterModel {
  me: boolean;
  nextAction: string;
  selectCharacter: number;
  characterRef?: RefObject<THREE.Group>;
  position?: number[];
  rotation?: number[];
}

export default function CharacterModel({ me, nextAction, selectCharacter, characterRef, position, rotation }: ICharacterModel) {
  const sceneRef = useRef<THREE.Group>(null);
  const nowAction = useRef("Idle");

  const { scene, animations } = useGLTF(`/models/${characterGlb[selectCharacter]}.glb`);
  const { actions } = useAnimations(animations, characterRef ?? sceneRef);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useEffect(() => {
    if (clone && actions) {
      // 모델에 그림자 속성 추가
      clone.traverse((obj) => {
        obj.castShadow = true;
        obj.receiveShadow = true;
      });
      // 첫 애니메이션 재생
      actions["Idle"]?.reset().play();
    }
  }, [clone, actions]);

  useFrame(() => {
    if (nextAction && nextAction !== nowAction.current) {
      if (nextAction === "Jump") actions[nextAction]?.setDuration(0.8);
      actions[nowAction.current]?.fadeOut(0.3);
      actions[nextAction]?.reset().fadeIn(0.2).play();
      nowAction.current = nextAction;
    }
  });

  useFrame(() => {
    if (me) return;
    if (position && rotation) {
      // 내캐릭터가 아닌 다른 플레이어의 캐릭터 위치 지정
      sceneRef.current?.position.set(position[0], position[1], position[2]);
      sceneRef.current?.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  });

  return <primitive ref={characterRef ?? sceneRef} object={clone} />;
}

useGLTF.preload("/models/characterTypeA.glb");
useGLTF.preload("/models/characterTypeB.glb");
useGLTF.preload("/models/characterTypeC.glb");
useGLTF.preload("/models/characterTypeD.glb");
