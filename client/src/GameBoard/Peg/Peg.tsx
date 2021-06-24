import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType, PegTypes } from "./PegPropTypes";
import { pegToBeRemovedMap } from "../GameBoardConstraintData";
const Peg: React.FC<PegPropType> = ({
  pegId,
  pegType,
  selectedPeg,
  setSelectedPeg,
  boardState,
  setBoardState,
}) => {
  const handleClick = () => {
    switch (pegType) {
      case PegTypes.FilledSlot:
        // console.log(pegToBeRemovedMap[pegId]);

        setBoardState(() => {
          const newBoardState = [...boardState];
          if (selectedPeg !== null) {
            newBoardState[selectedPeg!] = PegTypes.FilledSlot;
            pegToBeRemovedMap[selectedPeg!].forEach((k) => {
              if (newBoardState[k] === PegTypes.DroppableEmptySlot) {
                newBoardState[k] = PegTypes.EmptySlot;
              }
            });
          }
          pegToBeRemovedMap[pegId].forEach((k) => {
            if (
              boardState[k] === PegTypes.EmptySlot ||
              boardState[k] === PegTypes.DroppableEmptySlot
            ) {
              newBoardState[k] = PegTypes.DroppableEmptySlot;
              newBoardState[pegId] = PegTypes.SelectedPeg;
            }
          });
          return newBoardState;
        });
        setSelectedPeg(pegId);
        break;

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
