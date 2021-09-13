import { createContext } from "react";
import { GameInfoType, GameStatuses } from "types/GameInfoType";
import { GameInfoActionType } from "reducers/gameInfoReducer";
import GameInfoContextType from "types/GameInfoContextType";

const GameInfoCxt = createContext<GameInfoContextType>({
  gameInfo: {
    username1: "",
    username2: "",
    isMultiplayer: false,
    gameStatus: GameStatuses.NotInitiated,
  },
  gameInfoDispatch: () => {},
});

export default GameInfoCxt;
