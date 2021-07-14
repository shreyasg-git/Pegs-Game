import { InitialGameBoardState } from "gameConstraints/InitGameBoardState";

class ValidMoves {
  currentGameState: string[];

  constructor(gameBoardState: string[]) {
    this.currentGameState = gameBoardState;
  }

  checkIfValidMovesAvailable(currentState: string[]) {}
}

export default ValidMoves;
