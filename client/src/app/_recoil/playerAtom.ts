import { atom } from "recoil";

interface Player {
  id: string;
  position: number[];
  rotation: number[];
  action: string;
}

export const playerState = atom<Player | null>({
  key: "playerState",
  default: null,
});

export const playersState = atom<Player[] | null>({
  key: "playersState",
  default: null,
});
