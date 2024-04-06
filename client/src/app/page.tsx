"use client";

import { Canvas } from "@react-three/fiber";
import * as S from "./pageStyles";
import Lights from "./components/lights";
import { Suspense, useRef } from "react";
import { Physics } from "@react-three/rapier";
import { City } from "./components/city";
import Character from "./components/character";
import ControlsMap from "./components/controlsMap";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onClickCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.requestPointerLock();
    }
  };

  return (
    <S.Main>
      <ControlsMap>
        <Canvas ref={canvasRef} shadows camera={{ far: 500, near: 1 }} onClick={onClickCanvas}>
          <Suspense>
            <color attach={"background"} args={["rgb(56, 135, 255)"]} />
            <Lights />
            <Physics>
              <City />
              <Character />
            </Physics>
          </Suspense>
        </Canvas>
      </ControlsMap>
    </S.Main>
  );
}
