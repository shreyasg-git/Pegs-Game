import Peg from "./Peg";
import React, { useReducer } from "react";
import "./GameBoard.scss";

import { GameBoardChangesType } from "types/GameStateChanges";
import { GameBoardPropType } from "./GameBoardPropTypes";
import { clearGameBoardArray } from "utils/clearArray";
import { BoardStateActionTypes, BoardStateAction } from "types/BoardStateActionType";
import { applyStateChangesToFrom } from "utils/applyStateChanges";
import { InitGameBoardState2 } from "gameConstraints/InitGameBoardState";

import vm1 from "utils/ValidMoves";
const GameBoard: React.FC<GameBoardPropType> = () => {
  const [selectedPeg, setSelectedPeg] = React.useState<number[] | null>(null);
  const [selfBoardState, selfBoardStateDispatch] = useReducer(selfBoardStateReducer, [
    ...InitGameBoardState2,
  ]);

  React.useEffect(() => {
    console.log("Gameboard Rerender/render", selectedPeg);
    console.log("@@@@@@@@@", vm1.validMoves);
  }, [selectedPeg, selfBoardState]);

  const generateBoard = () => {
    let pegArray: JSX.Element[] = [];
    InitGameBoardState2.forEach((line, rowNo) => {
      line.forEach((pegTyp, colNo) => {
        pegArray.push(
          <Peg
            key={7 * rowNo + colNo}
            pegId={7 * rowNo + colNo}
            pegType={InitGameBoardState2[rowNo][colNo]}
            pegCoords={[rowNo, colNo]}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            selfBoardState={selfBoardState}
            selfBoardStateDispatch={selfBoardStateDispatch}
          />
        );
      });
    });
    return pegArray;
  };

  return <div className="gameboard">{generateBoard()}</div>;
};

export default GameBoard;

const selfBoardStateReducer = (state: number[][], action: BoardStateAction): number[][] => {
  switch (action.type) {
    case BoardStateActionTypes.CleanAndSelect:
      let newState1 = [...state];
      newState1 = clearGameBoardArray(newState1);
      const payload1: GameBoardChangesType = { ...action.payload } as GameBoardChangesType;
      newState1 = applyStateChangesToFrom(newState1, payload1);

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
