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
  boardState: string[] | PegTypes[];
  setBoardState: React.Dispatch<React.SetStateAction<string[]>>;
  // clearGameBoard: Function;

  // clearOtherSelection: Function;
  // newGame: Function;
}
