import { PegTypes } from "./Peg/PegPropTypes";
export const clearGameBoardArray = (gboard: string[]) => {
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
