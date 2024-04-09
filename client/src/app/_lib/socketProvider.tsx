"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Socket, io } from "socket.io-client";
import { playerState, playersState } from "../_recoil/playerAtom";

export const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [contextSocket, setContextSocket] = useState<Socket | null>(null);
  const setPlayer = useSetRecoilState(playerState);
  const setPlayers = useSetRecoilState(playersState);

  useEffect(() => {
    const socket = io("http://localhost:4000");
    setContextSocket(socket);

    socket.on("player", (player) => {
      setPlayer(player);
    });

    socket.on("players", (players) => {
      setPlayers(players);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [setPlayer, setPlayers]);

  return <SocketContext.Provider value={contextSocket}>{children}</SocketContext.Provider>;
}
