import Peg from "./Peg";
import React from "react";
// import PegPropType from "./Peg/PegPropTypes";
import "./GameBoard.scss";
import { PegTypes } from "./Peg/PegPropTypes";
// import { JsxFragment } from "typescript";

const GameBoard = () => {
  const [selectedPeg, setSelectedPeg] = React.useState<number>(-1);
  const [boardState, setBoardState] = React.useState<string[]>([
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
  ]);

  React.useEffect(() => {
    console.log("Gameboard Rerender/render");
  }, [selectedPeg, boardState]);
  const LineOfThree = (i: number) => {
    return (
      <>
        {TwoInvisible()}
        <Peg
          pegId={i}
          pegType={boardState[i]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={i + 1}
          pegType={boardState[i + 1]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={i + 2}
          pegType={boardState[i + 2]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        {TwoInvisible()}
      </>
    );
  };

  const LineOfSeven = (i: number) => {
    return (
      <>
        <Peg
          pegId={i}
          pegType={boardState[i]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={i + 1}
          pegType={boardState[i + 1]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={i + 2}
          pegType={boardState[i + 2]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={i + 3}
          pegType={boardState[i + 3]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={i + 4}
          pegType={boardState[i + 4]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={i + 5}
          pegType={boardState[i + 5]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={i + 6}
          pegType={boardState[i + 6]}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
      </>
    );
  };

  const generateWholeBoard = () => {
    return (
      <>
        {LineOfThree(0)}
        {LineOfThree(3)}
        {LineOfSeven(6)}
        {LineOfSeven(13)}
        {LineOfSeven(20)}
        {LineOfThree(27)}
        {LineOfThree(30)}
      </>
    );
  };

  const TwoInvisible = () => {
    return (
      <>
        <Peg
          pegId={-1}
          pegType={PegTypes.InvisiblePeg}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
        <Peg
          pegId={-1}
          pegType={PegTypes.InvisiblePeg}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
        />
      </>
    );
  };
  return <div className="gameboard">{generateWholeBoard()}</div>;
};

export default GameBoard;

// []
// 1 2 3 4 5 6 7
// 8 9 10 11 12 13 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// 34
// 35
// 36
// 37
// 38
// 39
// 40
// 41
// 42
// 43
// 44
// 45
// 46 47 48 49
