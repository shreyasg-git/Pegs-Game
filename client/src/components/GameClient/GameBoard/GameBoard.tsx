import Peg from "./Peg";
import React, { useReducer } from "react";
import "./GameBoard.scss";

import { selfBoardStateReducer } from "reducers/selfBoardStateReducer";
import { GameBoardPropType } from "./GameBoardPropTypes";
import { InitGameBoardState2 } from "gameConstraints/InitGameBoardState";

import vm1 from "utils/ValidMoves";
const GameBoard: React.FC<GameBoardPropType> = () => {
  const [selectedPeg, setSelectedPeg] = React.useState<number[]>([-1, -1]);
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
