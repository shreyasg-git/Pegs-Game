import Peg from "./Peg";
import React from "react";
import "./GameBoard.scss";
import { PegTypes } from "./Peg/PegTypes";
import { InvisiblePegIndices } from "./GameBoardConstraintData";
import { GameBoardPropType } from "./GameBoardPropTypes";
const GameBoard: React.FC<GameBoardPropType> = () => {
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
    PegTypes.EmptySlot, // Main
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

  const generateBoard = () => {
    let j = 0;
    let pegArray = [];
    for (let i = 0; i < 49; i++) {
      if (InvisiblePegIndices.includes(i)) {
        pegArray.push(
          <Peg
            key={i}
            pegId={100 + i}
            pegType={PegTypes.InvisiblePeg}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            boardState={boardState}
            setBoardState={setBoardState}
            // clearGameBoard={clearGameBoard}
          />
        );
      } else {
        pegArray.push(
          <Peg
            key={i}
            pegId={j}
            pegType={boardState[j]}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            boardState={boardState}
            setBoardState={setBoardState}
            // clearGameBoard={clearGameBoard}
          />
        );
        j++;
      }
    }
    // console.log(pegArray);

    return pegArray;
  };

  return (
    <div className="gameboard">
      {generateBoard()}

      {/* <div onClick={clearGameBoard}>HEllo</div> */}
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

/* <Peg
            key={i}
            pegId={pegType === PegTypes.InvisiblePeg ? 100 + i : j++}
            pegType={pegType}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            boardState={boardState}
            setBoardState={setBoardState}
            // newGame={newGame}
          /> */
