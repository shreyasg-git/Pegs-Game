export enum PegTypes {
  EmptySlot = "EmptySlot",
  FilledSlot = "FilledSlot",
  DroppableEmptySlot = "DroppableEmptySlot",
  DeletePeg = "DeletePeg",
  SelectedPeg = "SelectedPeg",
  InvisiblePeg = "InvisiblePeg",
}
export interface PegPropType {
  pegId: number;
  pegType: PegTypes | string;
  setSelectedPeg: React.Dispatch<React.SetStateAction<number>>;
  boardState: string[] | PegTypes[];
  setBoardState: React.Dispatch<React.SetStateAction<string[]>>;
}
