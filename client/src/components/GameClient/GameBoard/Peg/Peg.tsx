import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType } from "./PegPropType";

import { GameBoardChangesType } from "types/GameStateChanges";
import { PegTypes } from "types/PegTypes";
import { BoardStateActionTypes } from "types/BoardStateActionType";

import { clearGameBoardArray, clearGameBoardArrayButExclude } from "utils/clearArray";
import { pegMap } from "gameConstraints/pegMap";
import { intToPegTypeLookUp } from "types/PegTypes";
import vm1 from "utils/ValidMoves";

const Peg: React.FC<PegPropType> = ({
  pegId,
  pegType,
  selectedPeg,
  setSelectedPeg,
  selfBoardState,
  selfBoardStateDispatch,
}) => {
  const handleClick = () => {
    switch (pegType) {
      case PegTypes.FilledSlot:
        let newBoard: GameBoardChangesType = {
          EmptySlot: [],
          FilledSlot: [],
          DroppableEmptySlot: [],
          DeletePeg: [],
          SelectedPeg: [],
          InvisiblePeg: [],
        };
        pegMap[pegId][0].forEach((k, index) => {
          if (
            (selfBoardState[k] === PegTypes.EmptySlot ||
              selfBoardState[k] === PegTypes.DroppableEmptySlot) &&
            (selfBoardState[pegMap[pegId][1][index]] === PegTypes.FilledSlot ||
              selfBoardState[pegMap[pegId][1][index]] === PegTypes.SelectedPeg ||
              selfBoardState[pegMap[pegId][1][index]] === PegTypes.DeletePeg)
          ) {
            newBoard.SelectedPeg.push(pegId);
            newBoard.DroppableEmptySlot.push(k);
            newBoard.DeletePeg.push(pegMap[pegId][1][index]);
          }
        });
        selfBoardStateDispatch({
          type: BoardStateActionTypes.SelectAPeg,
          payload: newBoard,
        });
        setSelectedPeg(pegId);

        break; // ======================================================================================================

      case PegTypes.DroppableEmptySlot:
        let newBoardState2 = [...selfBoardState];

        newBoardState2[selectedPeg!] = PegTypes.EmptySlot;
        const jk = pegMap[selectedPeg!][0].indexOf(pegId);
        newBoardState2[pegMap[selectedPeg!][1][jk]] = PegTypes.EmptySlot;
        newBoardState2[pegId] = PegTypes.FilledSlot;

        // TODO: need to write Reducer, and Action for this
        // we need to clean board afterwards but we need to exclude the pegs which were just updated
        newBoardState2 = clearGameBoardArrayButExclude(newBoardState2, [
          selectedPeg!,
          pegMap[selectedPeg!][1][jk],
          pegId,
        ]);

        selfBoardStateDispatch({
          type: BoardStateActionTypes.CleanAndSelect,
          payload: newBoardState2,
        });
        setSelectedPeg(null);
        vm1.handleDropSlotCreation([4, 9, 16]);
        break; // ======================================================================================================

      case PegTypes.DeletePeg:
        let newBoardState3 = [...selfBoardState];
        // clearing previous changes
        newBoardState3 = clearGameBoardArray(newBoardState3);

        // making changes for current selection
        pegMap[pegId][0].forEach((k, index) => {
          if (
            (selfBoardState[k] === PegTypes.EmptySlot ||
              selfBoardState[k] === PegTypes.DroppableEmptySlot) &&
            (selfBoardState[pegMap[pegId][1][index]] === PegTypes.FilledSlot ||
              selfBoardState[pegMap[pegId][1][index]] === PegTypes.SelectedPeg ||
              selfBoardState[pegMap[pegId][1][index]] === PegTypes.DeletePeg)
          ) {
            newBoardState3[pegId] = PegTypes.SelectedPeg;
            newBoardState3[k] = PegTypes.DroppableEmptySlot;
            newBoardState3[pegMap[pegId][1][index]] = PegTypes.DeletePeg;
          }
        });
        selfBoardStateDispatch({
          type: BoardStateActionTypes.CleanAndSelect,
          payload: newBoardState3,
        });
        setSelectedPeg(pegId);

        break; // ======================================================================================================

      default:
        break;
    }
  };

  React.useEffect(() => {
    console.log("Peg rerender", pegId, "->", intToPegTypeLookUp[pegType]);
    // console.log("------------------", vm1.validMoves);
  }, [pegType, pegId]);

  return <div className={intToPegTypeLookUp[pegType] as string} onClick={handleClick}></div>;
};

export default Peg;
