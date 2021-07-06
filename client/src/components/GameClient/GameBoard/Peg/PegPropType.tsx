import { BoardStateAction } from "types/BoardStateActionType";
import { PegTypes } from "types/PegTypes";
export interface PegPropType {
  key: number;
  pegId: number;
  pegType: PegTypes | string;
  selectedPeg: number | null;
  setSelectedPeg: React.Dispatch<React.SetStateAction<number | null>>;
  selfBoardState: string[] | undefined;
  selfBoardStateDispatch: React.Dispatch<BoardStateAction> | undefined;
}
