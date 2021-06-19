import Peg from "./Peg";
import React from "react";
// import PegPropType from "./Peg/PegPropTypes";
import "./GameBoard.scss";
import { PegTypes } from "./Peg/PegPropTypes";
// import { JsxFragment } from "typescript";

const GameBoard = () => {
  const [pegCount, setPegCount] = React.useState(0);
  const LineOfThree = () => {
    return (
      <>
        <Peg pegId={pegCount} pegType={PegTypes.FilledSlot} setPegCount={setPegCount} />
        <Peg pegId={pegCount} pegType={PegTypes.FilledSlot} setPegCount={setPegCount} />
        <Peg pegId={pegCount} pegType={PegTypes.FilledSlot} setPegCount={setPegCount} />
      </>
    );
  };

  const TwoInvisible = () => {
    return (
      <>
        <Peg pegId={-1} pegType={PegTypes.InvisiblePeg} setPegCount={setPegCount} />
        <Peg pegId={-1} pegType={PegTypes.InvisiblePeg} setPegCount={setPegCount} />
      </>
    );
  };
  return (
    <div className="gameboard">
      {TwoInvisible()}
      {LineOfThree()}
      {TwoInvisible()}
    </div>
  );
};

export default GameBoard;
