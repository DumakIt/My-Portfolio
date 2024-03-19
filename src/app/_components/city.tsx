import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useLayoutEffect } from "react";

export const City = () => {
  const { scene } = useGLTF("/models/city.glb");

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
    <RigidBody colliders={"trimesh"} type={"fixed"}>
      <primitive object={scene} />
    </RigidBody>
  );
};

useGLTF.preload("/models/city.glb");
