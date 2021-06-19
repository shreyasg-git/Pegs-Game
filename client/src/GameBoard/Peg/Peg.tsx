import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType, PegTypes } from "./PegPropTypes";

const Peg: React.FC<PegPropType> = ({
  pegId,
  pegType,
  setSelectedPeg,
  boardState,
  setBoardState,
}) => {
  const handleClick = () => {
    if (pegType === PegTypes.FilledSlot) {
      setSelectedPeg(pegId);
      setBoardState(() => {
        boardState[pegId] = PegTypes.SelectedPeg;
        return boardState;
      });
    }
  };

  React.useEffect(() => {
    console.log("Peg rerender", pegId, pegType);
  }, [pegType, pegId]);

  return <div className={pegType} onClick={handleClick}></div>;
};

export default Peg;
