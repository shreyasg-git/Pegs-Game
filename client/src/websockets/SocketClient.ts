import io, { Socket } from "socket.io-client";
import { CustomEventNames, EventNames } from "types/EventNames";
import { GameInfoType, GameStatuses } from "types/GameInfoType";

// TODO: this too
enum MultiGameHandShakesStatuses {}

class SocketClient {
  private _socket!: Socket;
  public gameStatus: GameStatuses = GameStatuses.NotInitiated;
  private _opponentId: String = "";

  public async startMultiplayerGame(gameInfo: GameInfoType) {
    await this.connectToServer(gameInfo);
    // this.initiateAGame(gameInfo);
  }

  public disconnect() {
    this._socket.disconnect();
  }
  public initiateAGame = (gameInfo: GameInfoType) => {
    this._socket.emit(CustomEventNames.newGameInit, { ...gameInfo });
    this.gameStatus = GameStatuses.Multi_Initiated;
  };

  private async connectToServer(gameInfo: GameInfoType) {
    this._socket = await io("/", {
      transports: ["websocket"],
      path: "/api/websocket",
    });
    this._socket.on(EventNames.connect, () => {
      this.initiateAGame(gameInfo);
      console.log("connected To Server, your id is", this._socket.id);
      this.gameStatus = GameStatuses.Multi_WaitingForPlayer2;
    });

    this._socket.on(EventNames.disconnect, () => {});
    this._socket.on(CustomEventNames.putOnWait, () => {
      console.log("No waiting players currently...plz wait", this._socket.id);
      this.gameStatus = GameStatuses.Multi_WaitingForPlayer2;
    });

    this._socket.on(CustomEventNames.foundAMatch, (msg) => {
      console.log("Found A Match !!!");
      if (this._socket.id === msg.player1Id) {
        this._opponentId = msg.player2Id;
      } else {
        this._opponentId = msg.player1Id;
      }
      console.log("Your Opponent's Id is", this._opponentId);

      this.gameStatus = GameStatuses.Multi_MatchFound;
    });

    this._socket.on(CustomEventNames.opponentDisconnected, () => {
      //TODO: Making this right now
      console.log("Opponent has disconnected. Redirecting to HomePage...");
    });
  }
}

const selfSocketClient = new SocketClient();

export default selfSocketClient;
