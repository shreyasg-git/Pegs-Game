import Peg from "./Peg";
import React, { useReducer } from "react";
import "./GameBoard.scss";

import Modal from "components/Modal";

import { selfBoardStateReducer } from "reducers/selfBoardStateReducer";
import { GameBoardPropType } from "./GameBoardPropTypes";
import { InitGameBoardState2 } from "gameConstraints/InitGameBoardState";

import vm from "utils/ValidMoves";
import { BoardStateActionTypes } from "types/BoardStateActionType";
const GameBoard: React.FC<GameBoardPropType> = () => {
  const [selectedPeg, setSelectedPeg] = React.useState<number[]>([-1, -1]);
  const [selfBoardState, selfBoardStateDispatch] = useReducer(selfBoardStateReducer, [
    ...InitGameBoardState2,
  ]);
  const [gameStatus, setGameStatus] = React.useState<string>("ON");

  const closeModal = () => {
    setGameStatus("ANALYZING");
    setSelectedPeg([-1, -1]);
    vm.newGame();
  };

  const newGame = () => {
    setGameStatus("ON");
    vm.newGame();
    selfBoardStateDispatch({
      type: BoardStateActionTypes.NewGame,
      payload: null,
    });
  };

  React.useEffect(() => {
    console.log("# Gameboard Rerender/render", selectedPeg);
    const validMoveCount = vm.printValidMovesWithoutRepeatitionsAndReturnCount(0);
    // console.log("VALID MOVES", vm.validMoves);
    if (validMoveCount === 0) {
      setGameStatus("OVER");
      console.log(
        "======================================GAME OVER======================================"
      );
    }
  }, [selectedPeg, gameStatus]);

  const generateBoard = () => {
    let pegArray: JSX.Element[] = [];
    selfBoardState.forEach((line, rowNo) => {
      line.forEach((_, colNo) => {
        pegArray.push(
          <Peg
            key={7 * rowNo + colNo}
            pegType={selfBoardState[rowNo][colNo]}
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
  return (
    <div>
      <div className="gameboard">{generateBoard()}</div>
      <div>
        {gameStatus === "OVER" ? <Modal closeFunction={closeModal} newGame={newGame} /> : null}
      </div>
      {/* <Modal closeFunction={closeModal} newGame={newGame} /> */}
    </div>
  );
};

export default GameBoard;
