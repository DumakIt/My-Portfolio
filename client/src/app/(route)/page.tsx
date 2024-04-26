"use client";

import style from "./page.module.css";
import { Canvas } from "@react-three/fiber";
import Lights from "./_components/lights";
import { Suspense, useRef } from "react";
import { Physics } from "@react-three/rapier";
import City from "./_components/city";
import Characters from "./_components/characters";
import ControlsMap from "./_components/controlsMap";
import CreatePlayerPage from "./_components/createPlayer";
import { useRecoilValue } from "recoil";
import { playerState } from "../_recoil/playerAtom";
import Loading from "./_components/loading";
import ChatArea from "./_components/chatArea";
import KeyInfo from "./_components/keyInfo";
import Sea from "./_components/sea";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const player = useRecoilValue(playerState);

  return (
    <main className={style.main}>
      <Suspense fallback={null}>
        {!player && <CreatePlayerPage />}
        <ControlsMap>
          <Canvas ref={canvasRef} shadows camera={{ far: 500, near: 1 }} onClick={() => canvasRef.current?.requestPointerLock()}>
            <Lights />
            <Physics>
              <City />
              <Characters />
            </Physics>
            <Sea />
          </Canvas>
        </ControlsMap>
        <ChatArea />
        <KeyInfo />
      </Suspense>
      <Loading />
    </main>
  );
}
