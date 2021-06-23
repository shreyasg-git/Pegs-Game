import Peg from "./Peg";
import React from "react";
import "./GameBoard.scss";
import { PegTypes } from "./Peg/PegPropTypes";
// import { InvisiblePegIndices } from "./GameBoardConstraintData";

const GameBoard = () => {
  const [selectedPeg, setSelectedPeg] = React.useState<number | null>(null);
  const [boardState, setBoardState] = React.useState<string[]>([
    PegTypes.InvisiblePeg,
    PegTypes.InvisiblePeg,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.InvisiblePeg,
    PegTypes.InvisiblePeg,

    PegTypes.InvisiblePeg,
    PegTypes.InvisiblePeg,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.InvisiblePeg,
    PegTypes.InvisiblePeg,

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

    PegTypes.InvisiblePeg,
    PegTypes.InvisiblePeg,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.InvisiblePeg,
    PegTypes.InvisiblePeg,

    PegTypes.InvisiblePeg,
    PegTypes.InvisiblePeg,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.FilledSlot,
    PegTypes.InvisiblePeg,
    PegTypes.InvisiblePeg,
  ]);

  React.useEffect(() => {
    console.log("Gameboard Rerender/render", selectedPeg);
  }, [selectedPeg, boardState]);

  let j = 0;
  return (
    <div className="gameboard">
      {boardState.map((pegType, i) => {
        const peg = (
          <Peg
            key={i}
            pegId={pegType === PegTypes.InvisiblePeg ? 100 + i : j++}
            pegType={pegType}
            selectedPeg={selectedPeg}
            setSelectedPeg={setSelectedPeg}
            boardState={boardState}
            setBoardState={setBoardState}
            // newGame={newGame}
          />
        );

        // j++;
        return peg;
      })}
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
