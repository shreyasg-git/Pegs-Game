import { GameInfoType } from "types/gameInfoType";
import { Dispatch, SetStateAction } from "react";

export type HomePagePropsType = {
  gameInfo: GameInfoType;
  setGameInfo: Dispatch<SetStateAction<GameInfoType>>;
};
