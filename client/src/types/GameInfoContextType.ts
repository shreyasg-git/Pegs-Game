import { GameInfoType } from "./GameInfoType";
import { GameInfoActionType } from "reducers/gameInfoReducer";

type GameInfoContextType = {
  gameInfo: GameInfoType;
  gameInfoDispatch: React.Dispatch<GameInfoActionType>;
};

export default GameInfoContextType;
