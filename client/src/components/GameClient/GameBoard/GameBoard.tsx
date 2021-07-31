import Peg from "./Peg";
import React, { useReducer } from "react";
import "./GameBoard.scss";
import { PegTypes } from "types/PegTypes";
import { GameBoardChangesType } from "types/GameStateChanges";

import { InvisiblePegIndices } from "gameConstraints/InvisiblePegIndices";
import { GameBoardPropType } from "./GameBoardPropTypes";
import { InitialGameBoardState } from "gameConstraints/InitGameBoardState";
import { clearGameBoardArray } from "utils/clearArray";
import { BoardStateActionTypes, BoardStateAction } from "types/BoardStateActionType";
import { applyStateChangesToFrom } from "utils/applyStateChanges";

import vm1 from "utils/ValidMoves";
const GameBoard: React.FC<GameBoardPropType> = () => {
  const [selectedPeg, setSelectedPeg] = React.useState<number | null>(null);
  const [selfBoardState, selfBoardStateDispatch] = useReducer(selfBoardStateReducer, [
    ...InitialGameBoardState,
  ]);

  React.useEffect(() => {
    console.log("Gameboard Rerender/render", selectedPeg);
    console.log("@@@@@@@@@", vm1.validMoves);
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

    return pegArray;
  };

  return <div className="gameboard">{generateBoard()}</div>;
};

export default GameBoard;

const selfBoardStateReducer = (state: number[], action: BoardStateAction): number[] => {
  switch (action.type) {
    case BoardStateActionTypes.SelectAPeg:
      let newState2 = [...state];
      newState2 = clearGameBoardArray(newState2);
      const payload: GameBoardChangesType = { ...action.payload } as GameBoardChangesType;

      // applying changes to newState2
      newState2 = applyStateChangesToFrom(newState2, payload);

      return newState2;

    case BoardStateActionTypes.CleanAndSelect:
      const newState1 = action.payload as number[];
      return newState1;

    default:
      return InitialGameBoardState;
  }
};
