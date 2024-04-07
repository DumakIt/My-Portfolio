import * as THREE from "three";
import { useLayoutEffect, useMemo } from "react";

export const useCharacterCam = () => {
  const XRotation = useMemo(() => new THREE.Group(), []); // 카메라 상하(X축) 회전 값 저장
  const YRotation = useMemo(() => new THREE.Group(), []); // 카메라 좌우(Y축) 회전 값 저장

  useLayoutEffect(() => {
    if (XRotation && YRotation) {
      const handleMouseMove = (event: MouseEvent) => {
        if (!document.pointerLockElement) return;
        // mousemove 이벤트는 마우스의 이동값을 상하가 movementY, 좌우가 movementX 이며
        // 마우스를 위로 올리거나, 우측으로 이동시 "+"값 이기 때문에 "-"를 붙임
        YRotation.rotateY(-event.movementX * 0.003);

        // currentX는 현재 상하 값을 나타냄 일정 값 이상 회전 못하게 막기위해 사용
        const currentX = XRotation.rotation.x - event.movementY * 0.003;
        if (currentX > -0.4 && currentX < 0.5) {
          XRotation.rotateX(-event.movementY * 0.003);
        }
      };

      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [XRotation, YRotation]);

  return { XRotation, YRotation };
};
