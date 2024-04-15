import { atom } from "recoil";

interface player {
  id: string;
  name: string;
  selectCharacter: number;
}

interface players extends player {
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

export const playerState = atom<player>({
  key: "playerState",
  default: undefined,
});

export const playersState = atom<players[]>({
  key: "playersState",
  default: undefined,
});

export const messagesState = atom<messages[]>({
  key: "messagesState",
  default: [],
});
