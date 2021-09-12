import io, { Socket } from "socket.io-client";
import { CustomEventNames } from "types/EventNames";

class SocketClient {
  private _socket!: Socket;

  constructor() {}

  public startMultiplayerGame() {
    this.connectToServer();
  }

  public disconnect() {
    this._socket.disconnect();
  }

  private connectToServer() {
    this._socket = io("/", {
      transports: ["websocket"],
      path: "/api/websocket",
    });

    this._socket.emit(CustomEventNames.newGameInit, { username: "shreyasbg" });
  }
}

const selfSocketClient = new SocketClient();

export default selfSocketClient;
