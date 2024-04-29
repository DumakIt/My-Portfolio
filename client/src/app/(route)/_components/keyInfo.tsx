import style from "./keyInfo.module.css";
import Image from "next/image";

export default function KeyInfo() {
  return (
    <section className={style.container}>
      <Image src="/images/keyInfo.svg" alt="조작방법 이미지" width={350} height={140} priority />
    </section>
  );
}
