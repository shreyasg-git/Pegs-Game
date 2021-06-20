import Peg from "./Peg";
import React from "react";
// import PegPropType from "./Peg/PegPropTypes";
import "./GameBoard.scss";
import { PegTypes } from "./Peg/PegPropTypes";
// import { JsxFragment } from "typescript";

const GameBoard = () => {
  const [selectedPeg, setSelectedPeg] = React.useState<number | null>(null);
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
    PegTypes.EmptySlot,
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
    console.log("Gameboard Rerender/render", selectedPeg);
  }, [selectedPeg, boardState]);

  // const newGame = () => {
  //   console.log("NEW GAME");

  //   let newBoardState = [...boardState];
  //   newBoardState[4] = PegTypes.EmptySlot;
  //   setBoardState(newBoardState);
  // };

  // TODO: Does not seem to rerender
  // const clearOtherSelection = (pegIdToClear: number) => {
  //   console.log("clearing ", pegIdToClear);

  //   let updatedBoardState = [...boardState];
  //   updatedBoardState[pegIdToClear] = PegTypes.FilledSlot;
  //   console.log(updatedBoardState === boardState);

  //   setBoardState(updatedBoardState);
  //   console.log(boardState, updatedBoardState);

  //   console.log(boardState[pegIdToClear], updatedBoardState[pegIdToClear]);
  // };

  const LineOfThree = (i: number) => {
    let components: JSX.Element[] = [];
    for (let j = 0; j < 2; j++) {
      components.push(
        <Peg
          key={100 + j + i}
          pegId={-1}
          pegType={PegTypes.InvisiblePeg}
          selectedPeg={selectedPeg}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
          // newGame={newGame}
        />
      );
    }
    // components.push();
    for (let j = 0; j < 3; j++) {
      components.push(
        <Peg
          key={i + j}
          pegId={i + j}
          pegType={boardState[i + j]}
          selectedPeg={selectedPeg}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
          // newGame={newGame}
        />
      );
    }
    for (let j = 0; j < 2; j++) {
      components.push(
        <Peg
          key={200 + j + i}
          pegId={-1}
          pegType={PegTypes.InvisiblePeg}
          selectedPeg={selectedPeg}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
          // newGame={newGame}
        />
      );
    }
    return <>{components}</>;
  };

  const LineOfSeven = (i: number) => {
    let components: JSX.Element[] = [];

    for (let j = 0; j < 7; j++) {
      components.push(
        <Peg
          key={i + j}
          pegId={i + j}
          pegType={boardState[i + j]}
          selectedPeg={selectedPeg}
          setSelectedPeg={setSelectedPeg}
          boardState={boardState}
          setBoardState={setBoardState}
          // newGame={newGame}
        />
      );
    }

    return <>{components}</>;
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

  return (
    <div className="gameboard">
      {generateWholeBoard()}
      {/* <div onClick={newGame}>New Game</div> */}
    </div>
  );
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
