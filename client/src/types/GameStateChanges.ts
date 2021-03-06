export type GameBoardChangesType = {
  EmptySlot: number[][];
  FilledSlot: number[][];
  DroppableEmptySlot: number[][];
  DeletePeg: number[][];
  SelectedPeg: number[][];
  InvisiblePeg: number[][];
};

export const emptyGameBoardChangesObj = {
  EmptySlot: [],
  FilledSlot: [],
  DroppableEmptySlot: [],
  DeletePeg: [],
  SelectedPeg: [],
  InvisiblePeg: [],
};
