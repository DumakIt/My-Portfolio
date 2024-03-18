"use client";

import { Canvas } from "@react-three/fiber";
import * as S from "./pageStyles";
import Lights from "./_components/lights";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { City } from "./_components/city";

export default function HomePage() {
  return (
    <S.Main>
      <Canvas shadows camera={{ far: 500, near: 1 }}>
        <color attach={"background"} args={["rgb(56, 135, 255)"]} />
        <Lights />
        <Suspense>
          <Physics>
            <City />
          </Physics>
        </Suspense>
      </Canvas>
    </S.Main>
  );
}
