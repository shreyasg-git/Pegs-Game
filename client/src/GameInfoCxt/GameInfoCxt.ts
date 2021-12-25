import { createContext } from "react";
import { GameStatuses, GameTypeEnum } from "types/GameInfoType";
import GameInfoContextType from "types/GameInfoContextType";

const GameInfoCxt = createContext<GameInfoContextType>({
  gameInfo: {
    username1: "",
    username2: "",
    gameType: GameTypeEnum.NotStarted,
    // isMultiplayer: false,
    gameStatus: GameStatuses.NotInitiated,
  },
  gameInfoDispatch: () => {},
});

export default GameInfoCxt;
