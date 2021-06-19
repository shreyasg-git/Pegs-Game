import React from "react"; // { useEffect, useState }
import "./Peg.scss";
import { PegPropType, PegTypes } from "./PegPropTypes";

const Peg: React.FC<PegPropType> = ({ pegId, setPegCount, pegType }) => {
  React.useEffect(() => {
    if (pegType !== PegTypes.InvisiblePeg) {
      //   setPegCount(pegId + 1);
    }
    console.log(pegId);
  });

  return <div className={pegType}></div>;
};

export default Peg;
