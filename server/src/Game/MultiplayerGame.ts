import { Server, Socket } from "socket.io";
import { EventNames as EN } from "types/EventNames";

class MultiplayerGame {
  private _io: Server;
  private _socketPlayer1: Socket;
  private _socketPlayer2: Socket | null = null;

  constructor(io: Server, socketPlayer1: Socket) {
    this._io = io;
    this._socketPlayer1 = socketPlayer1;
    // this._socketPlayer2 = socketPlayer2;

    socketPlayer1.on(EN.disconnect, () => {});
  }

  connectPlayer2(socketPlayer2: Socket) {
    this._socketPlayer2 = socketPlayer2;
  }
}

export default MultiplayerGame;
