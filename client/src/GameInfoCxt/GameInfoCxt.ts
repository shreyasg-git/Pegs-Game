import { createContext } from "react";
import { GameInfoType, GameStatuses } from "types/gameInfoType";
import { GameInfoActionType } from "reducers/gameInfoReducer";
import {} from "types/gameInfoType";

type GameInfoContextType = {
  gameInfo: GameInfoType;
  gameInfoDispatch: React.Dispatch<GameInfoActionType>;
};
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
