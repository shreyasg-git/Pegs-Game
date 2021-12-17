import MultiplayerGame from "./MultiplayerGame";
import { Server, Socket } from "socket.io";
import { GameStateEnum } from "../types/GameState";
import chalk from "chalk";

class GameStore {
  private _onGoingGamesList: Array<MultiplayerGame> = [];
  private _gamesWaitList: MultiplayerGame[] = [];

  resolveAGameOnWait() {
    const game = this._gamesWaitList[0];
    this._gamesWaitList.shift(); // removes first element

    return game;
  }
  public removeAPlayerUsingSocketId(playerSocket: Socket) {
    this._gamesWaitList = this._gamesWaitList.filter((gameInstance) => {
      console.log("remove running for ", gameInstance.getSocketIDs()[0], playerSocket.id);
      return gameInstance.getSocketIDs()[0] !== playerSocket.id;
    });
  }

  requestNewGame(io: Server, playerSocket: Socket) {
    // check if there is a game available in gameswaitlist
    if (
      this._gamesWaitList[0] &&
      this._gamesWaitList[0].gameState === GameStateEnum.WaitingForPlayer2
    ) {
      console.log(
        `[Game HandShake] Found A Game for ${chalk.black.bgYellow(
          playerSocket.id
        )} from waitlist...`
      );
      const game = this.resolveAGameOnWait();
      game.connectPlayer2(playerSocket);
      this._onGoingGamesList.push(game);

      game.sendHandshakeSuccessMsgs(this._onGoingGamesList.length - 1);
      console.log(
        chalk.green(`[Game Handshake] Completed...`),
        chalk.black.bgGreen(`${game.getSocketIDs()}`)
      );
    } else {
      console.log(
        chalk.yellow(
          `[Game HandShake] No Current Game available...${playerSocket.id} is put on wait`
        )
      );
      const multiplayerGame = new MultiplayerGame(io, playerSocket);
      this._gamesWaitList.push(multiplayerGame);
      multiplayerGame.sendOnWaitMessage();
    }
  }

  logGamesInfo() {
    this._gamesWaitList.forEach((g) => {
      console.log(g.getSocketIDs());
    });
  }
}

const gameStore = new GameStore();

export default gameStore;
