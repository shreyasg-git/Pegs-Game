import { GameBoardChangesType } from "types/GameStateChanges";
import { PegTypes } from "types/PegTypes";

export const applyStateChangesToFrom = (
  stateArrCopy: number[][],
  changes: GameBoardChangesType
): number[][] => {
  changes.SelectedPeg.forEach((coords) => {
    stateArrCopy[coords[0]][coords[1]] = PegTypes.SelectedPeg;
  });
  changes.EmptySlot.forEach((coords) => {
    stateArrCopy[coords[0]][coords[1]] = PegTypes.EmptySlot;
  });
  changes.DeletePeg.forEach((coords) => {
    stateArrCopy[coords[0]][coords[1]] = PegTypes.DeletePeg;
  });
  changes.DroppableEmptySlot.forEach((coords) => {
    stateArrCopy[coords[0]][coords[1]] = PegTypes.DroppableEmptySlot;
  });
  changes.FilledSlot.forEach((coords) => {
    stateArrCopy[coords[0]][coords[1]] = PegTypes.FilledSlot;
  });

  return [...stateArrCopy];
};

// SelectedPeg: [],
// DeletePeg: [],
// DroppableEmptySlot: [],
// EmptySlot: [],
// FilledSlot: [],
// InvisiblePeg: [],
