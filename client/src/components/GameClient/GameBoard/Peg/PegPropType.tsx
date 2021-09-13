import { BoardStateAction } from "types/BoardStateActionType";
import { PegTypes } from "types/PegTypes";
export interface PegPropType {
  key: number;
  // pegId: number;
  pegType: PegTypes | number;
  pegCoords: number[];
  selectedPeg: number[];
  setSelectedPeg: React.Dispatch<React.SetStateAction<number[]>>;
  selfBoardState: number[][];
  selfBoardStateDispatch: React.Dispatch<BoardStateAction>;
  type: String;
  enableClicks: boolean;
}
