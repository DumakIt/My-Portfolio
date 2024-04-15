import { atom } from "recoil";

interface Player {
  id: string;
  name: string;
  selectCharacter: number;
}

interface Players extends Player {
  position: number[];
  rotation: number[];
  action: string;
}

interface messages {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
}

export const playerState = atom<Player>({
  key: "playerState",
  default: undefined,
});

export const playersState = atom<Players[]>({
  key: "playersState",
  default: undefined,
});

export const messagesState = atom<messages[]>({
  key: "messagesState",
  default: [],
});
