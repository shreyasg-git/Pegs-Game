import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType } from "./PegPropType";
import { GameBoardChangesType } from "../../../../types/GameStateChanges";
import { PegTypes } from "../../../../types/PegTypes";
import { pegMap } from "../../../../gameConstraints/pegMap";
import { clearGameBoardArray, clearGameBoardArrayButExclude } from "../GameBoardUtils";
import { BoardStateActionTypes } from "../../../../types/BoardStateActionType";
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
        pegMap[pegId][0].forEach((k, index) => {
          if (
            (selfBoardState![k] === PegTypes.EmptySlot ||
              selfBoardState![k] === PegTypes.DroppableEmptySlot) &&
            (selfBoardState![pegMap[pegId][1][index]] === PegTypes.FilledSlot ||
              selfBoardState![pegMap[pegId][1][index]] === PegTypes.SelectedPeg ||
              selfBoardState![pegMap[pegId][1][index]] === PegTypes.DeletePeg)
          ) {
            newBoard.SelectedPeg.push(pegId);
            newBoard.DroppableEmptySlot.push(k);
            newBoard.DeletePeg.push(pegMap[pegId][1][index]);
          }
        });
        selfBoardStateDispatch!({
          type: BoardStateActionTypes.SelectAPeg,
          payload: newBoard,
        });
        setSelectedPeg(pegId);

        break; // ======================================================================================================

      case PegTypes.DroppableEmptySlot:
        let newBoardState2 = [...selfBoardState!];

        newBoardState2[selectedPeg!] = PegTypes.EmptySlot;
        const jk = pegMap[selectedPeg!][0].indexOf(pegId);
        newBoardState2[pegMap[selectedPeg!][1][jk]] = PegTypes.EmptySlot;
        newBoardState2[pegId] = PegTypes.FilledSlot;

        // we need to clean board afterwards but we need to exclude the pegs which were just updated
        newBoardState2 = clearGameBoardArrayButExclude(newBoardState2, [
          selectedPeg!,
          pegMap[selectedPeg!][1][jk],
          pegId,
        ]);

        selfBoardStateDispatch!({
          type: BoardStateActionTypes.CleanAndSelect,
          payload: newBoardState2,
        });
        setSelectedPeg(null);
        break; // ======================================================================================================

      case PegTypes.DeletePeg:
        let newBoardState3 = [...selfBoardState!];
        // clearing previous changes
        newBoardState3 = clearGameBoardArray(newBoardState3);

        // making changes for current selection
        pegMap[pegId][0].forEach((k, index) => {
          if (
            (selfBoardState![k] === PegTypes.EmptySlot ||
              selfBoardState![k] === PegTypes.DroppableEmptySlot) &&
            (selfBoardState![pegMap[pegId][1][index]] === PegTypes.FilledSlot ||
              selfBoardState![pegMap[pegId][1][index]] === PegTypes.SelectedPeg ||
              selfBoardState![pegMap[pegId][1][index]] === PegTypes.DeletePeg)
          ) {
            if (selfBoardState![pegMap[pegId][1][index]] === PegTypes.SelectedPeg) {
              console.log("this this");
            }
            newBoardState3[pegId] = PegTypes.SelectedPeg;
            newBoardState3[k] = PegTypes.DroppableEmptySlot;
            newBoardState3[pegMap[pegId][1][index]] = PegTypes.DeletePeg;
          }
        });
        selfBoardStateDispatch!({
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
//   pegMap[selectedPeg!][0].forEach((k) => {
//     if (newBoardState[k] === PegTypes.DroppableEmptySlot) {
//       newBoardState[k] = PegTypes.EmptySlot;
//     }
//   });
//   pegMap[selectedPeg!][1].forEach((k) => {
//     if (newBoardState[k] === PegTypes.DeletePeg) {
//       newBoardState[k] = PegTypes.FilledSlot;
//     }
//   });
// }
