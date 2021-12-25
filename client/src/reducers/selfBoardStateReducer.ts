import { BoardStateAction, BoardStateActionTypes } from "types/BoardStateActionType";
import { clearGameBoardArray } from "utils/clearArray";
import { applyStateChangesToFrom } from "utils/applyStateChanges";
import { GameBoardChangesType } from "types/GameStateChanges";
import { InitGameBoardState2 } from "gameConstraints/InitGameBoardState";
import vm1 from "utils/ValidMoves";
import { PegTypes } from "types/PegTypes";

export const selfBoardStateReducer = (state: number[][], action: BoardStateAction): number[][] => {
  switch (action.type) {
    case BoardStateActionTypes.MoveComplete: {
      let newState = [...state];
      newState = clearGameBoardArray(newState);
      const payload1: GameBoardChangesType = { ...action.payload } as GameBoardChangesType;
      newState = applyStateChangesToFrom(newState, payload1);
      vm1.calculateNewValidMoves([
        payload1.EmptySlot[0],
        payload1.EmptySlot[1],
        payload1.FilledSlot[0],
      ]);

      return newState;
    }

    case BoardStateActionTypes.SelectAPeg: {
      let newState = [...state];
      newState = clearGameBoardArray(newState);
      const payload2: GameBoardChangesType = { ...action.payload } as GameBoardChangesType;
      // applying changes to newState
      newState = applyStateChangesToFrom(newState, payload2);
      return newState;
    }

    case BoardStateActionTypes.NewGame: {
      console.log("NEW GAME");

      return [
        [
          PegTypes.InvisiblePeg,
          PegTypes.InvisiblePeg,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.InvisiblePeg,
          PegTypes.InvisiblePeg,
        ],
        [
          PegTypes.InvisiblePeg,
          PegTypes.InvisiblePeg,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.InvisiblePeg,
          PegTypes.InvisiblePeg,
        ],
        [
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
        ],
        [
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.EmptySlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
        ],
        [
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
        ],
        [
          PegTypes.InvisiblePeg,
          PegTypes.InvisiblePeg,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.InvisiblePeg,
          PegTypes.InvisiblePeg,
        ],
        [
          PegTypes.InvisiblePeg,
          PegTypes.InvisiblePeg,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.FilledSlot,
          PegTypes.InvisiblePeg,
          PegTypes.InvisiblePeg,
        ],
      ];
    }

    default:
      console.log("DEFAULT");
      console.log(InitGameBoardState2);
      return InitGameBoardState2;
  }
};
