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

export const playerState = atom<Player | null>({
  key: "playerState",
  default: null,
});

export const playersState = atom<Players[] | null>({
  key: "playersState",
  default: null,
});
