import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType, PegTypes, GameBoardChangesType } from "./PegTypes";
import { pegToBeRemovedMap } from "../GameBoardConstraintData";
import { clearGameBoardArray, clearGameBoardArrayButExclude } from "../GameBoardUtils";
import { selfBoardStateActionTypes } from "./../../GameClientTypes";

const Peg: React.FC<PegPropType> = ({
  pegId,
  pegType,
  selectedPeg,
  setSelectedPeg,
  selfBoardState,
  selfBoardStateDispatch,
  // clearGameBoard,
}) => {
  const handleClick = () => {
    switch (pegType) {
      case PegTypes.FilledSlot:
        // let newBoardState = [...selfBoardState!];
        let newBoard: GameBoardChangesType = {
          EmptySlot: [],
          FilledSlot: [],
          DroppableEmptySlot: [],
          DeletePeg: [],
          SelectedPeg: [],
          InvisiblePeg: [],
        };
        // clearing previous changes
        // newBoardState = clearGameBoardArray(newBoardState);

        // making changes for current selection
        pegToBeRemovedMap[pegId][0].forEach((k, index) => {
          if (
            (selfBoardState![k] === PegTypes.EmptySlot ||
              selfBoardState![k] === PegTypes.DroppableEmptySlot) &&
            (selfBoardState![pegToBeRemovedMap[pegId][1][index]] === PegTypes.FilledSlot ||
              selfBoardState![pegToBeRemovedMap[pegId][1][index]] === PegTypes.SelectedPeg ||
              selfBoardState![pegToBeRemovedMap[pegId][1][index]] === PegTypes.DeletePeg)
          ) {
            newBoard.SelectedPeg.push(pegId);
            newBoard.DroppableEmptySlot.push(k);
            newBoard.DeletePeg.push(pegToBeRemovedMap[pegId][1][index]);
          }
        });
        selfBoardStateDispatch!({
          type: selfBoardStateActionTypes.SelectAPeg,
          payload: newBoard,
        });
        setSelectedPeg(pegId);

        break; // ======================================================================================================

      case PegTypes.DroppableEmptySlot:
        let newBoardState2 = [...selfBoardState!];

        newBoardState2[selectedPeg!] = PegTypes.EmptySlot;
        const jk = pegToBeRemovedMap[selectedPeg!][0].indexOf(pegId);
        newBoardState2[pegToBeRemovedMap[selectedPeg!][1][jk]] = PegTypes.EmptySlot;
        newBoardState2[pegId] = PegTypes.FilledSlot;

        // we need to clean board afterwards but we need to exclude the pegs which were just updated
        newBoardState2 = clearGameBoardArrayButExclude(newBoardState2, [
          selectedPeg!,
          pegToBeRemovedMap[selectedPeg!][1][jk],
          pegId,
        ]);

        selfBoardStateDispatch!({
          type: selfBoardStateActionTypes.CleanAndSelect,
          payload: newBoardState2,
        });
        setSelectedPeg(null);
        break; // ======================================================================================================

      case PegTypes.DeletePeg:
        let newBoardState3 = [...selfBoardState!];
        // clearing previous changes
        newBoardState3 = clearGameBoardArray(newBoardState3);

        // making changes for current selection
        pegToBeRemovedMap[pegId][0].forEach((k, index) => {
          if (
            (selfBoardState![k] === PegTypes.EmptySlot ||
              selfBoardState![k] === PegTypes.DroppableEmptySlot) &&
            (selfBoardState![pegToBeRemovedMap[pegId][1][index]] === PegTypes.FilledSlot ||
              selfBoardState![pegToBeRemovedMap[pegId][1][index]] === PegTypes.SelectedPeg ||
              selfBoardState![pegToBeRemovedMap[pegId][1][index]] === PegTypes.DeletePeg)
          ) {
            if (selfBoardState![pegToBeRemovedMap[pegId][1][index]] === PegTypes.SelectedPeg) {
              console.log("this this");
            }
            newBoardState3[pegId] = PegTypes.SelectedPeg;
            newBoardState3[k] = PegTypes.DroppableEmptySlot;
            newBoardState3[pegToBeRemovedMap[pegId][1][index]] = PegTypes.DeletePeg;
          }
        });
        selfBoardStateDispatch!({
          type: selfBoardStateActionTypes.CleanAndSelect,
          payload: newBoardState3,
        });
        setSelectedPeg(pegId);

        break; // ======================================================================================================

      default:
        break;
    }
  };

  React.useEffect(() => {
    console.log("Peg rerender", pegId, "->", pegType);
  }, [pegType, pegId]);

  return <div className={pegType} onClick={handleClick}></div>;
};

export default Peg;

// cleaning the board (previous approach was to literally undo everything but now we are directly traversing and
// changing gameboard to FilledSlots OR EmptySlots depending on their type)

// // clearing previous changes
// if (selectedPeg !== null) {
//   newBoardState[selectedPeg!] = PegTypes.FilledSlot;
//   pegToBeRemovedMap[selectedPeg!][0].forEach((k) => {
//     if (newBoardState[k] === PegTypes.DroppableEmptySlot) {
//       newBoardState[k] = PegTypes.EmptySlot;
//     }
//   });
//   pegToBeRemovedMap[selectedPeg!][1].forEach((k) => {
//     if (newBoardState[k] === PegTypes.DeletePeg) {
//       newBoardState[k] = PegTypes.FilledSlot;
//     }
//   });
// }
