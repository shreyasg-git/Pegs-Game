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
      setBoardState(() => {
        const newBoardState = [...boardState];
        newBoardState[pegId] = PegTypes.SelectedPeg;
        newBoardState[selectedPeg!] = PegTypes.FilledSlot;
        return newBoardState;
      });
      setSelectedPeg(pegId);
    }
  };

  React.useEffect(() => {
    console.log("Peg rerender", pegId, pegType);
  }, [pegType, pegId]);

  return <div className={pegType} onClick={handleClick}></div>;
};

export default Peg;
