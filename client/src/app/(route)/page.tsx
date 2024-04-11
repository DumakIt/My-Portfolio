"use client";

import style from "./page.module.css";
import { Canvas } from "@react-three/fiber";
import Lights from "./_components/lights";
import { Suspense, useRef } from "react";
import { Physics } from "@react-three/rapier";
import { City } from "./_components/city";
import Characters from "./_components/characters";
import ControlsMap from "./_components/controlsMap";
import CreatePlayerPage from "./_components/createPlayer";
import { useRecoilValue } from "recoil";
import { playerState } from "../_recoil/playerAtom";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const player = useRecoilValue(playerState);

  const onClickCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.requestPointerLock();
    }
  };

  return (
    <main className={style.main}>
      {player ? (
        <Suspense fallback={null}>
          <ControlsMap>
            <Canvas ref={canvasRef} shadows camera={{ far: 500, near: 1 }} onClick={onClickCanvas}>
              <color attach={"background"} args={["rgb(56, 135, 255)"]} />
              <Lights />
              <Physics>
                <City />
                <Characters />
              </Physics>
            </Canvas>
          </ControlsMap>
        </Suspense>
      ) : (
        <CreatePlayerPage />
      )}
    </main>
  );
}
