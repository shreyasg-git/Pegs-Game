// import { InitialGameBoardState } from "gameConstraints/InitGameBoardState";
import { MoveIndices } from "types/Move";
import { PegTypes } from "types/PegTypes";
import { InitGameBoardState2 } from "gameConstraints/InitGameBoardState";
// import { pegMap } from "gameConstraints/pegMap";
import { getNeighbors, getNeighborsOfNeighbors } from "./getVicinity";
import { pegMap } from "gameConstraints/pegMap";
// TODO: this is still using 1d array...change it 2d fast
// import { InitialGameBoardState } from "gameConstraints/InitGameBoardState";

class ValidMoves {
  validMoves: number[][][];
  currentGameState: PegTypes[][];

  constructor(currentGameState: PegTypes[][]) {
    this.currentGameState = currentGameState;
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
    console.log(this.validMoves[0][MoveIndices.ToBeDeleted]);
  }

  calculateNewValidMoves(moveMade: number[][]) {
    // The move needs to reflected in local state so that it is updated. (this is only needed in the case where
    // this.currentGameBoardState is being handled seperately, later white intergrating this with the game,
    // this.currentGameBoardState should point to the original state array so it wont need this updating)
    this.currentGameState[moveMade[0][0]][moveMade[0][1]] = PegTypes.EmptySlot;
    this.currentGameState[moveMade[1][0]][moveMade[1][1]] = PegTypes.EmptySlot;
    this.currentGameState[moveMade[2][0]][moveMade[2][1]] = PegTypes.FilledSlot;

    this.handleDropSlotCreation(moveMade);
    // this.handleFilledSlotCreation(moveMade);
  }

  // to be accessed from calculateNewValidMoves only !!!
  handleDropSlotCreation(move: number[][]) {
    // 2 cases - 1. dropslot created at peg which moved 2. dropslot created at peg which got deleted
    // case 1
    const newMovesCreated: number[][][] = [];
    const neighbors0 = getNeighbors(move[0]);
    const neighborsOfNeighbors0 = getNeighborsOfNeighbors(move[0]);

    neighbors0.forEach((e, index) => {
      if (
        this.currentGameState[e[0]][e[1]] === PegTypes.FilledSlot &&
        this.currentGameState[neighborsOfNeighbors0[index][0]][neighborsOfNeighbors0[index][0]] ===
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
        this.currentGameState[neighborsOfNeighbors1[index][0]][neighborsOfNeighbors1[index][0]] ===
          PegTypes.FilledSlot
      ) {
        newMovesCreated.push([neighborsOfNeighbors1[index], e, move[1]]);
      }
    });

    newMovesCreated.forEach((e) => {
      this.validMoves.push(e);
    });
  }

  handleFilledSlotCreation(move: number[][]) {
    const newMovesCreated: number[][][] = [];
    // 1. Possible pegToBeMoved 2. Possible pegToBeDeleted
    const neighbors0 = getNeighbors(move[2]);
    const neighborsOfNeighbors0 = getNeighborsOfNeighbors(move[2]);
    // case: 1 -
    // FIXME: doesnt seem to be workin
    neighbors0.forEach((toBeDel, i) => {
      if (
        this.currentGameState[toBeDel[0]][toBeDel[1]] === PegTypes.FilledSlot &&
        this.currentGameState[neighborsOfNeighbors0[i][0]][neighborsOfNeighbors0[i][1]] ===
          PegTypes.EmptySlot
      ) {
        newMovesCreated.push([neighborsOfNeighbors0[i], toBeDel, move[2]]);
      }
    });

    neighbors0.forEach((toBeMoved, i) => {
      const j: number = getOppositeCords(i);
      if (
        this.currentGameState[toBeMoved[0]][toBeMoved[1]] === PegTypes.FilledSlot &&
        this.currentGameState[neighbors0[j][0]][neighbors0[j][1]] === PegTypes.EmptySlot
      ) {
        newMovesCreated.push([toBeMoved, move[2], neighbors0[j]]);
      }
    });
  }

  checkIfValidMovesAvailable(currentState: string[]) {}
}

const vm1 = new ValidMoves(InitGameBoardState2);
// vm1.handleDropSlotCreation([4, 9, 16]);
console.log(vm1.validMoves);

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
