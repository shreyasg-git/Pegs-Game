import { PegTypes } from "types/PegTypes";

export const clearGameBoardArray = (gboard: number[][]) => {
  let newBoardState = [...gboard];

  newBoardState.forEach((row, rowNo) => {
    row.forEach((pegtyp, colNo) => {
      if (pegtyp === PegTypes.DeletePeg) {
        newBoardState[rowNo][colNo] = PegTypes.FilledSlot;
      } else if (pegtyp === PegTypes.DroppableEmptySlot) {
        newBoardState[rowNo][colNo] = PegTypes.EmptySlot;
      } else if (pegtyp === PegTypes.SelectedPeg) {
        newBoardState[rowNo][colNo] = PegTypes.FilledSlot;
      }
    });
  });
  return newBoardState;
};

export const clearGameBoardArrayButExclude = (gboard: number[][], exc: number[][]) => {
  let newBoardState = [...gboard];

  newBoardState.forEach((row, rowNo) => {
    row.forEach((pegtyp, colNo) => {
      if (exc.includes([rowNo, colNo])) {
        return;
      }
      if (pegtyp === PegTypes.DeletePeg) {
        newBoardState[rowNo][colNo] = PegTypes.FilledSlot;
      } else if (pegtyp === PegTypes.DroppableEmptySlot) {
        newBoardState[rowNo][colNo] = PegTypes.EmptySlot;
      } else if (pegtyp === PegTypes.SelectedPeg) {
        newBoardState[rowNo][colNo] = PegTypes.FilledSlot;
      }
    });
  });
  return newBoardState;
};
