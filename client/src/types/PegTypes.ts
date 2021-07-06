export enum PegTypes {
  EmptySlot = "EmptySlot",
  FilledSlot = "FilledSlot",
  DroppableEmptySlot = "DroppableEmptySlot",
  DeletePeg = "DeletePeg",
  SelectedPeg = "SelectedPeg",
  InvisiblePeg = "InvisiblePeg",
}

export const intToPegTypeLookUp = {
  0: "EmptySlot",
  1: "FilledSlot",
  2: "DroppableEmptySlot",
  3: "DeletePeg",
  4: "SelectedPeg",
  5: "InvisiblePeg",
};
