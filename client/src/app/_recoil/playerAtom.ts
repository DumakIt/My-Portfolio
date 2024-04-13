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

export const playerState = atom<Player>({
  key: "playerState",
  default: undefined,
});

export const playersState = atom<Players[]>({
  key: "playersState",
  default: undefined,
});
