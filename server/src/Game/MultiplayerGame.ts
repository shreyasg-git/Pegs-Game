import { Server, Socket } from "socket.io";
import { EventNames as EN, CustomEventNames } from "./../types/EventNames";

enum GameState {
  WaitingForPlayer2,
  Full,
}
class MultiplayerGame {
  private _io: Server;
  private _socketPlayer1: Socket;
  private _socketPlayer2: Socket | null = null;
  gameState: GameState;

  constructor(io: Server, socketPlayer1: Socket) {
    this._io = io;
    this._socketPlayer1 = socketPlayer1;

    this.gameState = GameState.WaitingForPlayer2;

    this._socketPlayer1.on(EN.disconnect, () => {});
    this._socketPlayer1.on(CustomEventNames.newGameInit, () => {
      console.log(this._socketPlayer1.id, "is intiated a game");
    });
  }

  connectPlayer2(socketPlayer2: Socket) {
    this._socketPlayer2 = socketPlayer2;
  }
}

export default MultiplayerGame;
