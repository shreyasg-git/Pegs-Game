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
  pegType: PegTypes;
  setPegCount: React.Dispatch<React.SetStateAction<number>>;
}
