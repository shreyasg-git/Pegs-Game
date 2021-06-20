import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType, PegTypes } from "./PegPropTypes";

const Peg: React.FC<PegPropType> = ({
  pegId,
  pegType,
  selectedPeg,
  setSelectedPeg,
  boardState,
  setBoardState,
  // clearOtherSelection,
  // newGame,
}) => {
  const handleClick = () => {
    if (pegType === PegTypes.FilledSlot) {
      if (selectedPeg || selectedPeg === 0) {
        setBoardState(() => {
          const updatedBoardState = [...boardState];
          updatedBoardState[5] = PegTypes.EmptySlot;

          return updatedBoardState;
        });
      }
      setSelectedPeg(pegId);
      setBoardState(() => {
        const newBoardState = [...boardState];
        newBoardState[pegId] = PegTypes.SelectedPeg;
        return newBoardState;
      });
    }
  };

  React.useEffect(() => {
    console.log("Peg rerender", pegId, pegType);
  }, [pegType, pegId]);

  return <div className={pegType} onClick={handleClick}></div>;
};

export default Peg;
