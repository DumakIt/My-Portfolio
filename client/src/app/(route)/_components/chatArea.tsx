"use client";

import style from "./chatArea.module.css";
import { useRecoilValue } from "recoil";
import { messagesState } from "@/app/_recoil/playerAtom";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "@/app/_lib/socketProvider";

export default function ChatArea() {
  const socket = useSocket();
  const messages = useRecoilValue(messagesState);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const sendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.nativeEvent.isComposing && message) {
      socket?.emit("message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    // 새로운 메시지가 있을때 스크롤을 가장 아래로 이동
    scrollDownRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className={style.container}>
      <div className={style.messageWrapper} ref={scrollDownRef}>
        {messages.map((el) =>
          el.senderId === "system" ? (
            <p key={el.id} className={`${style.message} ${style.systemMessage}`}>
              {el.message}
            </p>
          ) : (
            <p key={el.id} className={style.message}>
              [{el.senderName}] <span>{el.message}</span>
            </p>
          )
        )}
      </div>
      <input type="text" className={style.input} placeholder="채팅을 입력해주세요." value={message} onChange={(e) => setMessage(e.currentTarget.value.trim())} onKeyDown={sendMessage} />
    </section>
  );
}
