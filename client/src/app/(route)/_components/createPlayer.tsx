"use client";

import style from "./createPlayer.module.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSocket } from "@/app/_lib/socketProvider";
import CharacterModel from "../_components/characterModel";
import Lights from "../_components/lights";

export default function CreatePlayerPage() {
  const [name, setName] = useState("");
  const [currentStep, setCurrentStep] = useState("name");
  const [selectCharacter, setSelectCharacter] = useState(0);
  const socket = useSocket();

  return (
    <div className={style.container}>
      {currentStep === "name" && (
        <section className={style.section}>
          <label className={style.label} htmlFor="nickname">
            Play-World에서 사용할 닉네임을 입력해 주세요.
          </label>
          <input
            className={style.input}
            type="text"
            id="nickname"
            name="nickname"
            defaultValue={name}
            placeholder="닉네임을 입력해 주세요."
            onChange={(e) => {
              setName(e.currentTarget.value.trim().replace(/ {2,}/g, " "));
            }}
          />
          <button
            className={style.btn}
            disabled={name === ""}
            onClick={() => {
              setCurrentStep("character");
            }}
          >
            다음으로
          </button>
        </section>
      )}
      {currentStep === "character" && (
        <section className={style.section}>
          <div className={style.canvasWrapper}>
            <Canvas shadows camera={{ position: [0, 0, 1.5] }}>
              <Lights />
              <OrbitControls autoRotate autoRotateSpeed={5} enableZoom={false} />
              <CharacterModel playerStatus={"create"} nextAction={"Idle"} selectCharacter={selectCharacter} position={[0, -0.7, 0]} rotation={[0, 0, 0]} />
            </Canvas>
          </div>
          <button
            className={style.btn}
            onClick={() => {
              setSelectCharacter((prev) => (prev + 1) % 4);
            }}
          >
            다른 캐릭터 확인하기
          </button>
          <button
            className={style.btn}
            onClick={() => {
              setCurrentStep("name");
            }}
          >
            이전으로
          </button>
          <button className={style.btn} onClick={() => socket?.emit("enter", { name, selectCharacter })}>
            입장하기
          </button>
        </section>
      )}
    </div>
  );
}
