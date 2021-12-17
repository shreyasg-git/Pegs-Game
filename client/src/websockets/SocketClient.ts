import io, { Socket } from "socket.io-client";
import { CustomEventNames, EventNames } from "types/EventNames";
import { GameInfoType, GameStatuses } from "types/GameInfoType";
import { GameInfoActionsEnum, GameInfoActionType } from "reducers/gameInfoReducer";
import { MoveIndices } from "types/Move";
import { GameBoardChangesType } from "types/GameStateChanges";

// TODO: this too
enum MultiGameHandShakesStatuses {}

class SocketClient {
  private _socket!: Socket;
  public gameStatus: GameStatuses = GameStatuses.NotInitiated;
  private _opponentId: String = "";
  private _gameInfoDispatch: Function = () => {
    console.log("Empty Game Dispatch called");
  };

  private _disconnectHandler: Function = () => {
    console.log("Null Disconnect handler called"); // should never be called
  };

  public async startMultiplayerGame(
    gameInfo: GameInfoType,
    disconnectHandler: Function,
    gameInfoDispatch: React.Dispatch<GameInfoActionType>
  ) {
    await this.connectToServer(gameInfo);
    this._disconnectHandler = disconnectHandler;
    this._gameInfoDispatch = gameInfoDispatch;
    // this.initiateAGame(gameInfo);
  }

  public disconnect() {
    this._socket.disconnect();
  }
  public initiateAGame = (gameInfo: GameInfoType) => {
    const selfId = this._socket.id;
    this._socket.emit(CustomEventNames.newGameInit, { ...gameInfo, selfId });
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

    this._socket.on(EventNames.disconnect, () => {
      console.log("You are disconnected from server.");
    });
    this._socket.on(CustomEventNames.putOnWait, () => {
      console.log("No waiting players currently...plz wait", this._socket.id);
      this.gameStatus = GameStatuses.Multi_WaitingForPlayer2;
    });

    this._socket.on(CustomEventNames.foundAMatch, (msg) => {
      console.log("Found A Match !!!");
      // TODO: was working on this 16:11 7/10/21
      if (this._socket.id === msg.player1Id) {
        this._opponentId = msg.player2Id;
      } else {
        this._opponentId = msg.player1Id;
      }
      console.log("Your Opponent's Id is", this._opponentId, msg);

      this.gameStatus = GameStatuses.Multi_MatchFound;
      this._gameInfoDispatch({
        type: GameInfoActionsEnum.setGameStatus,
        payload: { newGameStatus: GameStatuses.Multi_MatchFound },
      });
    });

    this._socket.on(CustomEventNames.opponentDisconnected, () => {
      //TODO: Making this right now
      console.log("Opponent has disconnected. Redirecting to HomePage...");
      this._disconnectHandler();
    });
  }

  registerMoveToServer = (move: GameBoardChangesType) => {
    this._socket.emit(CustomEventNames.moveMade, move);
  };
}

const selfSocketClient = new SocketClient();

export default selfSocketClient;
