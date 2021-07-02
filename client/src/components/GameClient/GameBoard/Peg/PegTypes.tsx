import { selfBoardStateAction } from "../../GameClientTypes";

export type GameBoardChangesType = {
  EmptySlot: number[];
  FilledSlot: number[];
  DroppableEmptySlot: number[];
  DeletePeg: number[];
  SelectedPeg: number[];
  InvisiblePeg: number[];
};

export enum PegTypes {
  EmptySlot = "EmptySlot",
  FilledSlot = "FilledSlot",
  DroppableEmptySlot = "DroppableEmptySlot",
  DeletePeg = "DeletePeg",
  SelectedPeg = "SelectedPeg",
  InvisiblePeg = "InvisiblePeg",
}

export interface PegPropType {
  key: number;
  pegId: number;
  pegType: PegTypes | string;
  selectedPeg: number | null;
  setSelectedPeg: React.Dispatch<React.SetStateAction<number | null>>;
  // boardState: string[] | PegTypes[];
  // setBoardState: React.Dispatch<React.SetStateAction<string[]>>;
  selfBoardState: string[] | undefined;
  selfBoardStateDispatch: React.Dispatch<selfBoardStateAction> | undefined;
  // clearGameBoard: Function;

  // clearOtherSelection: Function;
  // newGame: Function;
}

export const intToPegTypeLookUp = {
  0: "EmptySlot",
  1: "FilledSlot",
  2: "DroppableEmptySlot",
  3: "DeletePeg",
  4: "SelectedPeg",
  5: "InvisiblePeg",
};

console.log(intToPegTypeLookUp[0]);
