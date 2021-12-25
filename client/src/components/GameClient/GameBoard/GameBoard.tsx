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

import GameInfoCxt from "GameInfoCxt";
import { GameInfoActionsEnum } from "reducers/gameInfoReducer";
import { GameStatuses, GameTypeEnum } from "types/GameInfoType";

const GameBoard: React.FC<GameBoardPropType> = ({ type }) => {
  const { gameInfo, gameInfoDispatch } = React.useContext(GameInfoCxt);
  const [selectedPeg, setSelectedPeg] = React.useState<number[]>([-1, -1]);
  const [selfBoardState, selfBoardStateDispatch] = useReducer(
    selfBoardStateReducer,
    // just for deep copy !!! 2D arrays are different than 1D arrays
    JSON.parse(JSON.stringify(InitGameBoardState2))
  );
  const [isFirstMovePlayed, setIsFirstMovePlayed] = React.useState<boolean>(false);
  const [pegsRemaining, setPegsRemaining] = React.useState<number>(32);

  const closeModal = () => {
    gameInfoDispatch({
      type: GameInfoActionsEnum.setGameStatus,
      payload: { newGameStatus: GameStatuses.Single_Analyzing },
    });
    // setGameStatus("ANALYZING");
    setSelectedPeg([-1, -1]);
    vm.newGame();
  };

  const newGame = () => {
    gameInfoDispatch({
      type: GameInfoActionsEnum.setGameStatus,
      payload: { newGameStatus: GameStatuses.Single_Intialized },
    });
    // setGameStatus("ON");
    vm.newGame();
    selfBoardStateDispatch({
      type: BoardStateActionTypes.NewGame,
      payload: null,
    });
  };

  React.useEffect(() => {
    console.log("# Gameboard Rerender/render", selectedPeg, type);
    // console.log(selfBoardState);

    // if gameIsSinglePlayer
    if (gameInfo.gameType === GameTypeEnum.SinglePlayer) {
      const validMoveCount = vm.printValidMovesWithoutRepeatitionsAndReturnCount(0);
      console.log(validMoveCount, "MOVES REMAINING");

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
        gameInfoDispatch({
          type: GameInfoActionsEnum.setGameStatus,
          payload: { newGameStatus: GameStatuses.Single_Over },
        });
        // setGameStatus("OVER");
        console.log("===================GAME OVER===================");
      }
    }
  }, [selectedPeg, gameInfo.gameStatus, gameInfoDispatch, selfBoardState, type, gameInfo.gameType]);

  const generateBoardUsingMap = (enableClicks: boolean) => {
    console.log(type, ": GENERATING BOARD");

    return selfBoardState.map((line, rowNo) => {
      return line.map((_, colNo) => {
        // '_' == each peg
        return (
          <Peg
            key={7 * rowNo + colNo}
            pegType={selfBoardState[rowNo][colNo]}
            pegCoords={[rowNo, colNo]}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            selfBoardState={selfBoardState}
            selfBoardStateDispatch={selfBoardStateDispatch}
            type={type}
            enableClicks={enableClicks}
            isFirstMovePlayed={isFirstMovePlayed}
            setIsFirstMovePlayed={setIsFirstMovePlayed}
          />
        );
      });
    });
  };

  // SinglePlayer -

  return (
    <>
      {/* {gameInfo.username1 ? null : <Redirect to="/homepage" />} */}
      <div className="gameboard">{generateBoardUsingMap(true)}</div>
      <div>
        {gameInfo.gameStatus === GameStatuses.Single_Over ? (
          <Modal closeFunction={closeModal} newGame={newGame} pegsRemaining={pegsRemaining} />
        ) : null}
      </div>
      {/* <Modal closeFunction={closeModal} newGame={newGame} pegsRemaining={pegsRemaining} /> */}
      {type === "SELF" ? <MenuBar newGameFunction={newGame} gameInfo={gameInfo} /> : null}
    </>
  );
};

export default GameBoard;
