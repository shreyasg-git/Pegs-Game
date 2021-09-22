import MultiplayerGame from "./MultiplayerGame";
import { Server, Socket } from "socket.io";
import { GameState } from "../types/GameState";
class GameStore {
  private _onGoingGamesList: Array<MultiplayerGame> = [];
  private _gamesWaitList: MultiplayerGame[] = [];

  addGameToWaitlist(game: MultiplayerGame) {
    // only if the previous game is resolved
    this._gamesWaitList.push(game);
  }

  resolveAGameOnWait() {
    const game = this._gamesWaitList[0];
    this._gamesWaitList.shift();

    return game;
  }

  requestNewGame(io: Server, playerSocket: Socket) {
    // check if there is a game available in gameswautlist
    if (
      this._gamesWaitList[0] &&
      this._gamesWaitList[0].gameState === GameState.WaitingForPlayer2
    ) {
      console.log(`[Game HandShake] Found A Game for ${playerSocket.id} from waitlist...`);
      const game = this.resolveAGameOnWait();
      game.connectPlayer2(playerSocket);
      this._onGoingGamesList.push(game);
      console.log(`[Game Handshake] Completed...${game.getSocketIDs()}`);
    } else {
      console.log(`[Game HandShake] No Current Game On wait...${playerSocket.id} is put on wait`);
      const multiplayerGame = new MultiplayerGame(io, playerSocket);
      this._gamesWaitList.push(multiplayerGame);
      multiplayerGame.sendOnWaitMessage();
    }
  }

  logGamesInfo() {}
}

const gameStore = new GameStore();

export default gameStore;
