import { BoardStateAction, BoardStateActionTypes } from "types/BoardStateActionType";
import { clearGameBoardArray } from "utils/clearArray";
import { applyStateChangesToFrom } from "utils/applyStateChanges";
import { GameBoardChangesType } from "types/GameStateChanges";
import { InitGameBoardState2 } from "gameConstraints/InitGameBoardState";
import vm1 from "utils/ValidMoves";

export const selfBoardStateReducer = (state: number[][], action: BoardStateAction): number[][] => {
  switch (action.type) {
    case BoardStateActionTypes.MoveComplete:
      let newState1 = [...state];
      newState1 = clearGameBoardArray(newState1);
      const payload1: GameBoardChangesType = { ...action.payload } as GameBoardChangesType;
      newState1 = applyStateChangesToFrom(newState1, payload1);
      vm1.calculateNewValidMoves([
        payload1.EmptySlot[0],
        payload1.EmptySlot[1],
        payload1.FilledSlot[0],
      ]);
      return newState1;

    case BoardStateActionTypes.SelectAPeg:
      let newState2 = [...state];
      newState2 = clearGameBoardArray(newState2);
      const payload2: GameBoardChangesType = { ...action.payload } as GameBoardChangesType;
      // applying changes to newState2
      newState2 = applyStateChangesToFrom(newState2, payload2);
      return newState2;

    default:
      return InitGameBoardState2;
  }
};
