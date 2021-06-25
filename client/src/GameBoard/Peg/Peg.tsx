import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType, PegTypes } from "./PegPropTypes";
import { pegToBeRemovedMap } from "../GameBoardConstraintData";
import { clearGameBoardArray } from "../GameBoardUtils";
const Peg: React.FC<PegPropType> = ({
  pegId,
  pegType,
  selectedPeg,
  setSelectedPeg,
  boardState,
  setBoardState,
  // clearGameBoard,
}) => {
  const handleClick = () => {
    switch (pegType) {
      case PegTypes.FilledSlot:
        setBoardState(() => {
          let newBoardState = [...boardState];
          // clearing previous changes
          newBoardState = clearGameBoardArray(newBoardState);

          // making changes for current selection
          pegToBeRemovedMap[pegId][0].forEach((k, index) => {
            if (
              (boardState[k] === PegTypes.EmptySlot ||
                boardState[k] === PegTypes.DroppableEmptySlot) &&
              (boardState[pegToBeRemovedMap[pegId][1][index]] === PegTypes.FilledSlot ||
                boardState[pegToBeRemovedMap[pegId][1][index]] === PegTypes.SelectedPeg ||
                boardState[pegToBeRemovedMap[pegId][1][index]] === PegTypes.DeletePeg)
            ) {
              if (boardState[pegToBeRemovedMap[pegId][1][index]] === PegTypes.SelectedPeg) {
                console.log("this this");
              }
              newBoardState[pegId] = PegTypes.SelectedPeg;
              newBoardState[k] = PegTypes.DroppableEmptySlot;
              newBoardState[pegToBeRemovedMap[pegId][1][index]] = PegTypes.DeletePeg;
            }
          });

          return newBoardState;
        });
        setSelectedPeg(pegId);
        break; // ======================================================================================================

      case PegTypes.DroppableEmptySlot:
        setBoardState(() => {
          const newBoardState = [...boardState];
          newBoardState[selectedPeg!] = PegTypes.EmptySlot;
          const jk = pegToBeRemovedMap[selectedPeg!][0].indexOf(pegId);
          newBoardState[pegToBeRemovedMap[selectedPeg!][1][jk]] = PegTypes.EmptySlot;
          newBoardState[pegId] = PegTypes.FilledSlot;
          return newBoardState;
        });
        setSelectedPeg(null);
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
