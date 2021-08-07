import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType } from "./PegPropType";
import { GameBoardChangesType } from "types/GameStateChanges";
import { PegTypes, intToPegTypeLookUp } from "types/PegTypes";
import { BoardStateActionTypes } from "types/BoardStateActionType";
import vm1 from "utils/ValidMoves";
import { getNeighbors, getNeighborsOfNeighbors } from "utils/getVicinity";

const Peg: React.FC<PegPropType> = ({
  pegId,
  pegType,
  pegCoords,
  selectedPeg,
  setSelectedPeg,
  selfBoardState,
  selfBoardStateDispatch,
}) => {
  const handleClick = () => {
    if (pegType === PegTypes.FilledSlot) {
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
        }
      });

      selfBoardStateDispatch({
        type: BoardStateActionTypes.SelectAPeg,
        payload: newBoard,
      });
      setSelectedPeg(pegCoords);
      // =====================================================================================================================
    } else if (pegType === PegTypes.DroppableEmptySlot) {
      // let newBoardState2 = [...selfBoardState];

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

      newBoard.EmptySlot.push(selectedPeg!);
      let jk = -1;
      neighborsOfNeighbors.forEach((naybore, index) => {
        if (naybore[0] === selectedPeg![0] && naybore[1] === selectedPeg![1]) {
          jk = index;
        }
      });

      newBoard.EmptySlot.push(neighbors[jk]);
      newBoard.FilledSlot.push(pegCoords);

      selfBoardStateDispatch({
        type: BoardStateActionTypes.CleanAndSelect,
        payload: newBoard,
      });
      setSelectedPeg(null);
      vm1.handleDropSlotCreation([4, 9, 16]);
    } else if (pegType === PegTypes.DeletePeg) {
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
        }
      });

      selfBoardStateDispatch({
        type: BoardStateActionTypes.SelectAPeg,
        payload: newBoard,
      });
      setSelectedPeg(pegCoords);
    }
  };
  React.useEffect(() => {
    console.log("Peg rerender", pegId, "->", intToPegTypeLookUp[pegType]);
    // console.log("------------------", vm1.validMoves);
  }, [pegType, pegId]);

  return <div className={intToPegTypeLookUp[pegType] as string} onClick={handleClick}></div>;
};

export default Peg;
