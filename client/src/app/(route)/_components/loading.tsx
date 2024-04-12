"use client";

import Spinner from "@/app/_components/spinner/spinner";
import style from "./loading.module.css";
import { useProgress } from "@react-three/drei";

export default function Loading() {
  const { progress } = useProgress();

  return (
    <div className={`${style.container} ${progress === 100 && style["container--none"]}`}>
      <h1 className={style.h1}>Play-World</h1>
      <Spinner />
      <p>{Math.floor(progress)}%</p>
    </div>
  );
}
