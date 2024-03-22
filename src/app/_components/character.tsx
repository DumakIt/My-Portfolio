import { useGLTF } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useLayoutEffect } from "react";

export default function Character() {
  const { scene } = useGLTF("/models/femaleTypeA.glb");

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
      <primitive object={scene} />
    </RigidBody>
  );
}

useGLTF.preload("/models/femaleTypeA.glb");
