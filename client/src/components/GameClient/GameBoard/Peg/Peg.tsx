import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType } from "./PegPropType";
import { GameBoardChangesType } from "types/GameStateChanges";
import { PegTypes, intToPegTypeLookUp } from "types/PegTypes";
import { BoardStateActionTypes } from "types/BoardStateActionType";
// import vm1 from "utils/ValidMoves";
import { getNeighbors, getNeighborsOfNeighbors } from "utils/getVicinity";

const Peg: React.FC<PegPropType> = ({
  // pegId,
  pegType,
  pegCoords,
  selectedPeg,
  setSelectedPeg,
  selfBoardState,
  selfBoardStateDispatch,
  type,
}) => {
  const handleClick = () => {
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

      let newBoard: GameBoardChangesType = {
        EmptySlot: [],
        FilledSlot: [],
        DroppableEmptySlot: [],
        DeletePeg: [],
        SelectedPeg: [],
        InvisiblePeg: [],
      };

      newBoard.EmptySlot.push(selectedPeg);
      let jk = -1;
      neighborsOfNeighbors.forEach((naybore, index) => {
        if (naybore[0] === selectedPeg[0] && naybore[1] === selectedPeg[1]) {
          jk = index;
        }
      });

      newBoard.EmptySlot.push(neighbors[jk]);
      newBoard.FilledSlot.push(pegCoords);

      selfBoardStateDispatch({
        type: BoardStateActionTypes.MoveComplete,
        payload: newBoard,
      });
      setSelectedPeg([-1, -1]);
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
