import Peg from "./Peg";
import React, { useReducer } from "react";
import "./GameBoard.scss";

import Modal from "components/Modal";

import { selfBoardStateReducer } from "reducers/selfBoardStateReducer";
import { GameBoardPropType } from "./GameBoardPropTypes";
import { InitGameBoardState2 } from "gameConstraints/InitGameBoardState";

import vm from "utils/ValidMoves";
import { BoardStateActionTypes } from "types/BoardStateActionType";
import MenuBar from "./MenuBar";
import { PegTypes } from "types/PegTypes";

const GameBoard: React.FC<GameBoardPropType> = ({ type, gameInfo }) => {
  const [selectedPeg, setSelectedPeg] = React.useState<number[]>([-1, -1]);
  const [selfBoardState, selfBoardStateDispatch] = useReducer(
    selfBoardStateReducer,
    // just for deep copy !!! 2D arrays are different than 1D arrays
    JSON.parse(JSON.stringify(InitGameBoardState2))
  );
  const [gameStatus, setGameStatus] = React.useState<string>("ON");
  const [pegsRemaining, setPegsRemaining] = React.useState<number>(32);

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
    console.log("# Gameboard Rerender/render", selectedPeg, type);
    const validMoveCount = vm.printValidMovesWithoutRepeatitionsAndReturnCount(0);
    // console.log("VALID MOVES", vm.validMoves);
    if (validMoveCount === 0) {
      let pegsRemain: number = 0;
      selfBoardState.forEach((rows) => {
        rows.forEach((p) => {
          if (p === PegTypes.FilledSlot) {
            pegsRemain = pegsRemain + 1;
          }
        });
      });
      setPegsRemaining(pegsRemain);
      setGameStatus("OVER");
      console.log(
        "======================================GAME OVER======================================"
      );
    }
  }, [selectedPeg, gameStatus, selfBoardState, type]);

  // const generateBoard = () => {
  //   console.log(type, ": GENERATING BOARD");

  //   let pegArray: JSX.Element[] = [];
  //   selfBoardState.forEach((line, rowNo) => {
  //     line.forEach((_, colNo) => {
  //       pegArray.push(
  //         <Peg
  //           key={7 * rowNo + colNo}
  //           pegType={selfBoardState[rowNo][colNo]}
  //           pegCoords={[rowNo, colNo]}
  //           selectedPeg={selectedPeg}
  //           setSelectedPeg={setSelectedPeg}
  //           selfBoardState={selfBoardState}
  //           selfBoardStateDispatch={selfBoardStateDispatch}
  //         />
  //       );
  //     });
  //   });
  //   return pegArray;
  // };

  const generateBoardUsingMap = () => {
    console.log(type, ": GENERATING BOARD");
    // let pegArray: JSX.Element[] = [];

    return selfBoardState.map((line, rowNo) => {
      // '_' == each peg
      return line.map((_, colNo) => {
        return (
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
  };
  return (
    <>
      <div className="gameboard">{generateBoardUsingMap()}</div>
      <div>
        {gameStatus === "OVER" ? (
          <Modal closeFunction={closeModal} newGame={newGame} pegsRemaining={pegsRemaining} />
        ) : null}
      </div>
      {/* <Modal closeFunction={closeModal} newGame={newGame} pegsRemaining={pegsRemaining} /> */}
      {type === "SELF" ? <MenuBar newGameFunction={newGame} gameInfo={gameInfo} /> : null}
    </>
  );
};

export default GameBoard;
