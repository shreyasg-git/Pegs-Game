import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType } from "./PegPropType";
import { GameBoardChangesType } from "types/GameStateChanges";
import { PegTypes, intToPegTypeLookUp } from "types/PegTypes";
import { BoardStateActionTypes } from "types/BoardStateActionType";
// import vm1 from "utils/ValidMoves";
import { getNeighbors, getNeighborsOfNeighbors } from "utils/getVicinity";
import GameInfoCxt from "GameInfoCxt";
import { GameInfoActionsEnum } from "reducers/gameInfoReducer";
import { GameStatuses, GameTypeEnum } from "types/GameInfoType";
import selfSocketClient from "websockets/SocketClient";
const Peg: React.FC<PegPropType> = ({
  // pegId,
  pegType,
  pegCoords,
  selectedPeg,
  setSelectedPeg,
  selfBoardState,
  selfBoardStateDispatch,
  type,
  enableClicks,
  isFirstMovePlayed,
  setIsFirstMovePlayed,
}) => {
  const { gameInfo, gameInfoDispatch } = React.useContext(GameInfoCxt);

  const handleClick = () => {
    if (!enableClicks) {
      return;
    }
    if (!isFirstMovePlayed) {
      setIsFirstMovePlayed(true);
      gameInfoDispatch({
        type: GameInfoActionsEnum.setGameStatus,
        payload: { newGameStatus: GameStatuses.Single_Playing },
      });
    }
    if (pegType === PegTypes.FilledSlot || pegType === PegTypes.DeletePeg) {
      let newBoard: GameBoardChangesType = {
        EmptySlot: [],
        FilledSlot: [],
        DroppableEmptySlot: [],
        DeletePeg: [],
        SelectedPeg: [],
        InvisiblePeg: [],
      };
      const neighborsOfNeighbors = getNeighborsOfNeighbors(pegCoords);
      const neighbors = getNeighbors(pegCoords);

      let changesFlag = false;

      neighbors.forEach((cords, index) => {
        if (
          (selfBoardState[neighborsOfNeighbors[index][0]][neighborsOfNeighbors[index][1]] ===
            PegTypes.EmptySlot ||
            selfBoardState[neighborsOfNeighbors[index][0]][neighborsOfNeighbors[index][1]] ===
              PegTypes.DroppableEmptySlot) &&
          (selfBoardState[cords[0]][cords[1]] === PegTypes.FilledSlot ||
            selfBoardState[cords[0]][cords[1]] === PegTypes.SelectedPeg ||
            selfBoardState[cords[0]][cords[1]] === PegTypes.DeletePeg)
        ) {
          newBoard.SelectedPeg.push(pegCoords);
          newBoard.DroppableEmptySlot.push(neighborsOfNeighbors[index]);
          newBoard.DeletePeg.push(cords);
          changesFlag = true;
        }
      });

      if (changesFlag) {
        selfBoardStateDispatch({
          type: BoardStateActionTypes.SelectAPeg,
          payload: newBoard,
        });
        setSelectedPeg(pegCoords);
      }
      // =====================================================================================================================
    } else if (pegType === PegTypes.DroppableEmptySlot) {
      const neighborsOfNeighbors = getNeighborsOfNeighbors(pegCoords);
      const neighbors = getNeighbors(pegCoords);

      let newBoardChanges: GameBoardChangesType = {
        EmptySlot: [],
        FilledSlot: [],
        DroppableEmptySlot: [],
        DeletePeg: [],
        SelectedPeg: [],
        InvisiblePeg: [],
      };

      newBoardChanges.EmptySlot.push(selectedPeg);
      let jk = -1;
      neighborsOfNeighbors.forEach((naybore, index) => {
        if (naybore[0] === selectedPeg[0] && naybore[1] === selectedPeg[1]) {
          jk = index;
        }
      });

      newBoardChanges.EmptySlot.push(neighbors[jk]);
      newBoardChanges.FilledSlot.push(pegCoords);

      selfBoardStateDispatch({
        type: BoardStateActionTypes.MoveComplete,
        payload: newBoardChanges,
      });
      setSelectedPeg([-1, -1]);
      if (gameInfo.gameType === GameTypeEnum.Multiplayer) {
        selfSocketClient.registerMoveToServer(newBoardChanges);
      }
    }
  };
  React.useEffect(() => {
    console.log("# Peg Re-render");
  }, [pegType, pegCoords]);

  return (
    <div
      className={intToPegTypeLookUp[pegType] as string}
      onClick={type === "SELF" ? handleClick : () => {}}
    ></div>
  );
};

export default Peg;
