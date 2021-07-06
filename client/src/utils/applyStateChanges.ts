import { GameBoardChangesType } from "types/GameStateChanges";
import { PegTypes } from "types/PegTypes";

export const applyStateChangesToFrom = (
  stateArrCopy: string[],
  changes: GameBoardChangesType
): string[] => {
  stateArrCopy[changes.SelectedPeg![0]] = PegTypes.SelectedPeg;
  changes.DeletePeg!.forEach((pegId) => {
    stateArrCopy[pegId] = PegTypes.DeletePeg;
  });
  changes.DroppableEmptySlot!.forEach((pegId) => {
    stateArrCopy[pegId] = PegTypes.DroppableEmptySlot;
  });

  return [...stateArrCopy];
};
