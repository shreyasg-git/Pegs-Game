import io, { Socket } from "socket.io-client";
import { CustomEventNames, EventNames } from "types/EventNames";
import { GameInfoType } from "types/GameInfoType";

class SocketClient {
  private _socket!: Socket;

  public async startMultiplayerGame(gameInfo: GameInfoType) {
    await this.connectToServer(gameInfo);
    // this.initiateAGame(gameInfo);
  }

  public disconnect() {
    this._socket.disconnect();
  }
  public initiateAGame = (gameInfo: GameInfoType) => {
    this._socket.emit(CustomEventNames.newGameInit, { ...gameInfo });
  };

  private async connectToServer(gameInfo: GameInfoType) {
    this._socket = await io("/", {
      transports: ["websocket"],
      path: "/api/websocket",
    });
    this._socket.on(EventNames.connect, () => {
      this.initiateAGame(gameInfo);
      console.log("connected To Server, your id is", this._socket.id);
    });

    this._socket.on(EventNames.disconnect, () => {});
    this._socket.on(CustomEventNames.putOnWait, () => {
      console.log("No waiting players currently...plz wait", this._socket.id);
    });
  }
}

const selfSocketClient = new SocketClient();

export default selfSocketClient;
