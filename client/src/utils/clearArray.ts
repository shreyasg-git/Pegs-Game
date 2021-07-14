import { PegTypes } from "types/PegTypes";

export const clearGameBoardArray = (gboard: number[]) => {
  let newBoardState = [...gboard];

  newBoardState.forEach((peg, index) => {
    if (peg === PegTypes.DeletePeg) {
      newBoardState[index] = PegTypes.FilledSlot;
    } else if (peg === PegTypes.DroppableEmptySlot) {
      newBoardState[index] = PegTypes.EmptySlot;
    } else if (peg === PegTypes.SelectedPeg) {
      newBoardState[index] = PegTypes.FilledSlot;
    }
  });
  return newBoardState;
};

export const clearGameBoardArrayButExclude = (gboard: number[], exc: number[]) => {
  let newBoardState = [...gboard];

  newBoardState.forEach((peg, index) => {
    if (exc.includes(index)) {
      return;
    }
    if (peg === PegTypes.DeletePeg) {
      newBoardState[index] = PegTypes.FilledSlot;
    } else if (peg === PegTypes.DroppableEmptySlot) {
      newBoardState[index] = PegTypes.EmptySlot;
    } else if (peg === PegTypes.SelectedPeg) {
      newBoardState[index] = PegTypes.FilledSlot;
    }
  });
  return newBoardState;
};