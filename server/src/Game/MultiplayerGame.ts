import { Server, Socket } from "socket.io";
import { EventNames as EN, CustomEventNames, EventNames } from "./../types/EventNames";
import { GameStateEnum } from "../types/GameState";
import chalk from "chalk";
enum ChanceOfPlayer {
  NONE,
  p1,
  p2,
}
class MultiplayerGame {
  private _io: Server;
  private _socketPlayer1: Socket;
  private _socketPlayer2: Socket | null = null;
  private _chanceOf: ChanceOfPlayer;
  public gameState: GameStateEnum;

  constructor(io: Server, socketPlayer1: Socket) {
    this._io = io;
    this._socketPlayer1 = socketPlayer1;
    this._chanceOf = ChanceOfPlayer.NONE;
    this.gameState = GameStateEnum.WaitingForPlayer2;
  }

  attachEventListenersAfterHandshakeIsSuccessful = () => {
    this._socketPlayer1.on(EventNames.disconnect, () => {
      console.log(chalk.green("[Game Handshake] Player1 Disconnected"));

      this._socketPlayer2?.emit(CustomEventNames.opponentDisconnected);
    });
    this._socketPlayer2!.on(EventNames.disconnect, () => {
      console.log(chalk.green("[Game Handshake] Player2 Disconnected"));

      this._socketPlayer1.emit(CustomEventNames.opponentDisconnected);
    });

    this._socketPlayer1.on(CustomEventNames.moveMade, (move) => {
      console.log();
    });
  };

  private _toggleChance = () => {
    if (this._chanceOf === ChanceOfPlayer.p1) {
      this._chanceOf = ChanceOfPlayer.p2;
    }
    if (this._chanceOf === ChanceOfPlayer.p2) {
      this._chanceOf = ChanceOfPlayer.p1;
    }
  };
  sendHandshakeSuccessMsgs = (gameId: number) => {
    const gameInfoFromServer = {
      gameId: gameId,
      player1Id: this._socketPlayer1.id,
      player2Id: this._socketPlayer2!.id,
    };

    this._socketPlayer1.emit(CustomEventNames.foundAMatch, gameInfoFromServer);
    this._socketPlayer2!.emit(CustomEventNames.foundAMatch, gameInfoFromServer);
    this.attachEventListenersAfterHandshakeIsSuccessful();
  };

  public getSocketIDs = () => {
    return [this._socketPlayer1.id, this._socketPlayer2?.id];
  };

  public sendOnWaitMessage = () => {
    this._socketPlayer1.emit(CustomEventNames.putOnWait);
  };

  connectPlayer2(socketPlayer2: Socket) {
    this._socketPlayer2 = socketPlayer2;
  }

  logInfo = () => {};
}

export default MultiplayerGame;
