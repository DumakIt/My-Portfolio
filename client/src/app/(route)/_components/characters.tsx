"use client";

import { useRecoilValue } from "recoil";
import { playerState, playersState } from "@/app/_recoil/playerAtom";
import { useSocket } from "@/app/_lib/socketProvider";
import CharacterSetting from "./characterSetting";
import CharacterModel from "./characterModel";

export default function Characters() {
  const me = useRecoilValue(playerState);
  const players = useRecoilValue(playersState);
  const socket = useSocket();

  return (
    <>
      {players?.map((player) =>
        player.id === me?.id ? (
          <CharacterSetting key={player.id} socket={socket} playerPosition={player?.position} selectCharacter={player.selectCharacter} />
        ) : (
          <CharacterModel key={player.id} me={false} nextAction={player.action} selectCharacter={player.selectCharacter} position={player.position} rotation={player.rotation} />
        )
      )}
    </>
  );
}
