import Peg from "./Peg";
import React, { useReducer } from "react";
import "./GameBoard.scss";
import { PegTypes } from "types/PegTypes";
import { GameBoardChangesType } from "types/GameStateChanges";

import { InvisiblePegIndices } from "gameConstraints/InvisiblePegIndices";
import { GameBoardPropType } from "./GameBoardPropTypes";
import { InitialGameBoardState } from "gameConstraints/InitGameBoardState";
import { clearGameBoardArray } from "./GameBoardUtils";
import { BoardStateActionTypes, BoardStateAction } from "types/BoardStateActionType";

const GameBoard: React.FC<GameBoardPropType> = () => {
  const [selectedPeg, setSelectedPeg] = React.useState<number | null>(null);
  const [selfBoardState, selfBoardStateDispatch] = useReducer(selfBoardStateReducer, [
    ...InitialGameBoardState,
  ]);

  React.useEffect(() => {
    console.log("Gameboard Rerender/render", selectedPeg);
  }, [selectedPeg, selfBoardState]);

  const generateBoard = () => {
    let j = 0;
    let pegArray = [];
    for (let i = 0; i < 49; i++) {
      if (InvisiblePegIndices.includes(i)) {
        pegArray.push(
          <Peg
            key={i}
            pegId={100 + i}
            pegType={PegTypes.InvisiblePeg}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            selfBoardState={selfBoardState}
            selfBoardStateDispatch={selfBoardStateDispatch}
          />
        );
      } else {
        pegArray.push(
          <Peg
            key={i}
            pegId={j}
            pegType={selfBoardState![j]}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            selfBoardState={selfBoardState}
            selfBoardStateDispatch={selfBoardStateDispatch}
          />
        );
        j++;
      }
    }
    // console.log(pegArray);

    return pegArray;
  };

  return (
    <div className="gameboard">
      {generateBoard()}

      {/* <div onClick={clearGameBoard}>HEllo</div> */}
    </div>
  );
};

export default GameBoard;

const selfBoardStateReducer = (state: string[], action: BoardStateAction): string[] => {
  switch (action.type) {
    case BoardStateActionTypes.NewGame:
      return InitialGameBoardState;

    case BoardStateActionTypes.CleanAndSelect:
      const newState1 = action.payload as string[];
      return newState1;

    case BoardStateActionTypes.SelectAPeg:
      let newState2 = [...state];
      newState2 = clearGameBoardArray(newState2);
      const payload: GameBoardChangesType = { ...action.payload } as GameBoardChangesType;

      // applying changes to newState2
      newState2 = applyStateChangesToFrom(newState2, payload);

      return newState2;

    default:
      return InitialGameBoardState;
  }
};

const applyStateChangesToFrom = (
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

// []
// 1  2  3  4  5  6  7
// 8  9  10 11 12 13 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// 34
// 35
// 36
// 37
// 38
// 39
// 40
// 41
// 42
// 43
// 44
// 45
// 46 47 48 49

/* <Peg
            key={i}
            pegId={pegType === PegTypes.InvisiblePeg ? 100 + i : j++}
            pegType={pegType}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            boardState={boardState}
            setBoardState={setBoardState}
            // newGame={newGame}
          /> */
