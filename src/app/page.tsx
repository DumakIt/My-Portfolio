"use client";

import { Canvas } from "@react-three/fiber";
import * as S from "./pageStyles";
import Lights from "./_components/lights";

export default function HomePage() {
  return (
    <S.Main>
      <Canvas shadows camera={{ far: 500, near: 1 }}>
        <color attach={"background"} args={["rgb(56, 135, 255)"]} />
        <Lights />
      </Canvas>
    </S.Main>
  );
}
