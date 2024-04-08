"use client";
import style from "./page.module.css";
import { Canvas } from "@react-three/fiber";
import Lights from "./_components/lights";
import { Suspense, useRef } from "react";
import { Physics } from "@react-three/rapier";
import { City } from "./_components/city";
import Character from "./_components/character";
import ControlsMap from "./_components/controlsMap";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onClickCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.requestPointerLock();
    }
  };

  return (
    <main className={style.main}>
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
    </main>
  );
}
