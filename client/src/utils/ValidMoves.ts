// import { InitialGameBoardState } from "gameConstraints/InitGameBoardState";
import { MoveIndices } from "types/Move";
import { PegTypes } from "types/PegTypes";
import { pegMap } from "gameConstraints/pegMap";
// import { InitialGameBoardState } from "gameConstraints/InitGameBoardState";
const InitialGameBoardState = [
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
];
class ValidMoves {
  validMoves: number[][];
  currentGameState: PegTypes[];

  constructor(currentGameState: PegTypes[]) {
    this.currentGameState = currentGameState;
    this.validMoves = [
      [4, 9, 16],
      [14, 15, 16],
      [18, 17, 16],
      [28, 23, 16],
    ];
    console.log(this.validMoves[0][MoveIndices.ToBeDeleted]);
  }

  calculateNewValidMoves(moveMade: number[]) {
    // The move needs to reflected in local state so that it is updated. (this is only needed in the case where
    // this.currentGameBoardState is being handled seperately, later white intergrating this with the game,
    // this.currentGameBoardState should point to the original state array so it wont need this updating)
    this.currentGameState[moveMade[0]] = PegTypes.EmptySlot;
    this.currentGameState[moveMade[1]] = PegTypes.EmptySlot;
    this.currentGameState[moveMade[2]] = PegTypes.FilledSlot;

    this.handleDropSlotCreation(moveMade);
  }

  // to be accessed from calculateNewValidMoves only !!!
  handleDropSlotCreation(move: number[]) {
    // 2 cases - 1. dropslot at peg which moved 2. dropslot at peg which got deleted
    // case 1
    // check if there are pegs to be deleted
    const newMovesCreated: number[][] = [];
    pegMap[move[0]][0].forEach((e, index) => {
      if (
        this.currentGameState[e] === PegTypes.FilledSlot &&
        this.currentGameState[pegMap[move[0]][1][index]] === PegTypes.FilledSlot
      ) {
        newMovesCreated.push([e, pegMap[move[0]][1][index], move[0]]);
      }
    });
    // check if there are pegs to be moved corresponding to them
    // console.log(this.currentGameState[pegMap[move[1]][2][1]]);
    pegMap[move[1]][0].forEach((e, index) => {
      if (
        this.currentGameState[e] === PegTypes.FilledSlot &&
        this.currentGameState[pegMap[move[1]][1][index]] === PegTypes.FilledSlot
      ) {
        newMovesCreated.push([e, pegMap[move[1]][1][index], move[1]]);
      }
    });

    newMovesCreated.forEach((e) => {
      this.validMoves.push(e);
    });
  }

  handleFilledSlotCreation(move: number[]) {
    const filledPeg = move[2];
    // 1. Possible pegToBeMoved 2. Possible pegToBeDeleted
    // case: 1
  }

  checkIfValidMovesAvailable(currentState: string[]) {}
}

const vm1 = new ValidMoves(InitialGameBoardState);
// vm1.handleDropSlotCreation([4, 9, 16]);
console.log(vm1.validMoves);

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
