// import { InitialGameBoardState } from "gameConstraints/InitGameBoardState";
import { MoveIndices } from "types/Move";
import { PegTypes } from "types/PegTypes";
import { InitGameBoardState2 } from "gameConstraints/InitGameBoardState";
// import { pegMap } from "gameConstraints/pegMap";
import { getNeighbors, getNeighborsIgnoreEdges, getNeighborsOfNeighbors } from "./getVicinity";
// import { pegMap } from "kgameConstraints/pegMap";

class ValidMoves {
  count: number;
  validMoves: number[][][];
  currentGameState: PegTypes[][];
  movesHistory: number[][][];
  constructor(currentGameState: PegTypes[][]) {
    this.count = 0;
    this.currentGameState = currentGameState;
    this.movesHistory = [];
    this.validMoves = [
      [
        [1, 3],
        [2, 3],
        [3, 3],
      ],
      [
        [3, 5],
        [3, 4],
        [3, 3],
      ],
      [
        [5, 3],
        [4, 3],
        [3, 3],
      ],
      [
        [3, 1],
        [3, 2],
        [3, 3],
      ],
    ];
    // console.log(this.validMoves[0][MoveIndices.ToBeDeleted]);
  }

  calculateNewValidMoves(moveMade: number[][]) {
    this.count++;
    console.log(this.count);

    // The move needs to reflected in local state so that it is updated. (this is only needed in the case where
    // this.currentGameBoardState is being handled seperately, later white intergrating this with the game,
    // this.currentGameBoardState should point to the original state array so it wont need this updating)
    this.currentGameState[moveMade[0][0]][moveMade[0][1]] = PegTypes.EmptySlot;
    this.currentGameState[moveMade[1][0]][moveMade[1][1]] = PegTypes.EmptySlot;
    this.currentGameState[moveMade[2][0]][moveMade[2][1]] = PegTypes.FilledSlot;

    this.movesHistory.push(moveMade);
    console.log("MOVE HISTORY", this.movesHistory);

    this.handleFilledSlotDestruction(moveMade);
    this.handleDropSlotDestruction(moveMade);

    const m1 = this.handleDropSlotCreation(moveMade);
    // console.log("DROP SLOT CREATION", moveMade, m1);

    m1.forEach((m) => {
      this.validMoves.push(m);
    });

    const m2 = this.handleFilledSlotCreation(moveMade);
    // console.log("FILLED SLOT CREATION", m2.length, moveMade, m2);

    m2.forEach((m) => {
      this.validMoves.push(m);
    });

    // console.log(this.validMoves);
  }

  // to be accessed from calculateNewValidMoves only !!!
  handleDropSlotCreation(move: number[][]): number[][][] {
    // 2 cases - 1. dropslot created at peg which moved 2. dropslot created at peg which got deleted
    // case 1
    const newMovesCreated: number[][][] = [];
    const neighbors0 = getNeighbors(move[0]);
    const neighborsOfNeighbors0 = getNeighborsOfNeighbors(move[0]);

    neighbors0.forEach((e, index) => {
      if (
        this.currentGameState[e[0]][e[1]] === PegTypes.FilledSlot &&
        this.currentGameState[neighborsOfNeighbors0[index][0]][neighborsOfNeighbors0[index][1]] ===
          PegTypes.FilledSlot
      ) {
        newMovesCreated.push([neighborsOfNeighbors0[index], e, move[0]]);
      }
    });

    // case 2
    const neighbors1 = getNeighbors(move[1]);
    const neighborsOfNeighbors1 = getNeighborsOfNeighbors(move[1]);

    neighbors1.forEach((e, index) => {
      if (
        this.currentGameState[e[0]][e[1]] === PegTypes.FilledSlot &&
        this.currentGameState[neighborsOfNeighbors1[index][0]][neighborsOfNeighbors1[index][1]] ===
          PegTypes.FilledSlot
      ) {
        newMovesCreated.push([neighborsOfNeighbors1[index], e, move[1]]);
      }
    });

    return newMovesCreated;
  }

  handleFilledSlotCreation(move: number[][]): number[][][] {
    const newMovesCreated: number[][][] = [];
    // 1. Possible pegToBeMoved 2. Possible pegToBeDeleted

    const neighbors0 = getNeighbors(move[2]);
    const neighborsOfNeighbors0 = getNeighborsOfNeighbors(move[2]);
    // case: 1 -
    neighbors0.forEach((toBeDel, i) => {
      if (
        this.currentGameState[toBeDel[0]][toBeDel[1]] === PegTypes.FilledSlot &&
        this.currentGameState[neighborsOfNeighbors0[i][0]][neighborsOfNeighbors0[i][1]] ===
          PegTypes.EmptySlot
      ) {
        console.log("THIS WAS HIT");

        newMovesCreated.push([move[2], toBeDel, neighborsOfNeighbors0[i]]);
      }
    });

    // CASE II (Possible PegToBeDeleted Candidate)
    // we need all neighbors here (irrespective of neighborsofneighbrs)
    const allNeighbors = getNeighborsIgnoreEdges(move[2]);

    allNeighbors.forEach((toBeMoved, i) => {
      const j: number = getOppositeCords(i);

      if (
        // allNeighbors[j] &&
        this.currentGameState[toBeMoved[0]][toBeMoved[1]] === PegTypes.FilledSlot &&
        this.currentGameState[allNeighbors[j][0]][allNeighbors[j][1]] === PegTypes.EmptySlot
      ) {
        // console.log(allNeighbors);

        newMovesCreated.push([toBeMoved, move[2], allNeighbors[j]]);
      }
    });

    return newMovesCreated;
  }

  handleFilledSlotDestruction(move: number[][]) {
    // just for saving and logging, this will store the moves which get deleted
    const delMoves: number[][][] = [];
    // function for filter below
    const ifPresent = (move0: number[][]) => {
      if (
        isSameCoord(move[0], move0[0]) ||
        isSameCoord(move[0], move0[1]) ||
        isSameCoord(move[1], move0[0]) ||
        isSameCoord(move[1], move0[1])
      ) {
        delMoves.push(move0);
        // console.log("deleting>>>", move);

        return false;
      }
      // console.log("beep beep");

      return true;
    };
    this.validMoves = this.validMoves.filter(ifPresent);
    console.log("FILLED_SLOT DEST", delMoves.length, move, delMoves);
  }

  handleDropSlotDestruction(move: number[][]) {
    const delMoves: number[][][] = [];

    this.validMoves = this.validMoves.filter((m) => {
      if (isSameCoord(move[2], m[2])) {
        delMoves.push(m);
        return false;
      }
      return true;
    });

    console.log("DROP_SLOT DEST", delMoves.length, move, delMoves);
  }

  checkIfValidMovesAvailable(currentState: string[]) {}
}

const vm1 = new ValidMoves(InitGameBoardState2);
// vm1.handleDropSlotCreation([4, 9, 16]);
// console.log(vm1.validMoves);

const getOppositeCords = (k: number): number => {
  if (k === 0) {
    return 2;
  } else if (k === 1) {
    return 3;
  } else if (k === 2) {
    return 0;
  } else {
    return 1;
  }
};

const isSameCoord = (cord1: number[], cord2: number[]) => {
  if (cord1[0] === cord2[0] && cord1[1] === cord2[1]) {
    // console.log("compared...", cord1, cord2, true);
    return true;
  }

  return false;
};

export default vm1;

// Calculate Valid Moves
// Creation Phase -
//      for at 0 -
//          1. possible droppableSlotts
//      for at 1 -
//          1. possible droppableSlotts
//      ToBePlacedAt -
//          1. Possible pegToBeMoved
//          2. Possible pegToBeDeleted

//  Destruction Phase -
//      for at 0 -
//          1. where this no. was in first col
//          2. where this no. was in 2nd col
//      for at 1 -
//          1. where this no. was in first col
//          2. where this no. was in 2nd col
//      for at 2 -
//          1. where this no. was in 3rd col
