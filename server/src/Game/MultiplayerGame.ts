import { Server, Socket } from "socket.io";
import { EventNames as EN, CustomEventNames } from "./../types/EventNames";
import { GameState } from "../types/GameState";
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
  public gameState: GameState;

  constructor(io: Server, socketPlayer1: Socket) {
    this._io = io;
    this._socketPlayer1 = socketPlayer1;
    this._chanceOf = ChanceOfPlayer.NONE;
    this.gameState = GameState.WaitingForPlayer2;
  }

  private _toggleChance = () => {
    if (this._chanceOf === ChanceOfPlayer.p1) {
      this._chanceOf = ChanceOfPlayer.p2;
    }
    if (this._chanceOf === ChanceOfPlayer.p2) {
      this._chanceOf = ChanceOfPlayer.p1;
    }
  };

  public getSocketIDs = () => {
    return [this._socketPlayer1.id, this._socketPlayer2!.id];
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
