import Button from "components/Button";
import "./../Modal/Modal.scss";
import React from "react";
import GameBoard from "./GameBoard";
import "./GameClient.scss";
import { Redirect } from "react-router";
// import MenuBar from "./GameBoard/MenuBar";
import NavBar from "./NavBar";
import selfSocketClient from "websockets/SocketClient";

import GameInfoCxt from "GameInfoCxt";
import { GameStatuses, GameTypeEnum } from "types/GameInfoType";
import { GameInfoActionsEnum } from "reducers/gameInfoReducer";
import Modal from "components/Modal";
type GameClientPropsType = {
  // gameInfo: GameInfoType;
};

const GameClient: React.FC<GameClientPropsType> = () => {
  const { gameInfo, gameInfoDispatch } = React.useContext(GameInfoCxt);

  React.useEffect(() => {
    (async function anyNameFunction() {
      if (
        gameInfo.gameType === GameTypeEnum.Multiplayer &&
        gameInfo.gameStatus === GameStatuses.Multi_WaitingForPlayer2
      ) {
        console.log("GAMEINFO", gameInfo);
        // NOTE: SocketClient EntryPoint
        await selfSocketClient.startMultiplayerGame(
          gameInfo,
          oppDisconnectHandler,
          gameInfoDispatch
        );
      }
    })();

    return () => {
      console.log("[CLEANER CLALLED]");
      // NOTE: due to time constraints, I am leaving this as it is, it seems that whenever component re-renders due
      //  to gameInfo state update, this cleanup is called, which disconnects the socket, and does the whole handshake all over again.
      // if (gameInfo.gameType === GameTypeEnum.Multiplayer) selfSocketClient.disconnect();
    };
  });

  const oppDisconnectHandler = () => {
    console.log("[Opponent Disconnected Handler] Called");

    gameInfoDispatch({
      type: GameInfoActionsEnum.setGameStatus,
      payload: { newGameStatus: GameStatuses.NotInitiated },
    });
  };

  const cancelMatchMaking = () => {
    console.log("[MATCH MAKING CANCELLED]");

    selfSocketClient.disconnect();
    gameInfoDispatch({
      type: GameInfoActionsEnum.setGameStatus,
      payload: { newGameStatus: GameStatuses.NotInitiated },
    });
  };
  if (gameInfo.gameStatus === GameStatuses.NotInitiated) {
    return <Redirect to="/homepage" />;
  }
  // waiting for player 2
  // if (gameInfo.gameStatus === GameStatuses.Multi_WaitingForPlayer2) {
  //   return (
  //     <div className="gameclient">
  //       <NavBar />
  //       <GameBoard type="SELF" key={1} />
  //       {gameInfo.gameType === GameTypeEnum.Multiplayer ? <GameBoard type="GUEST" key={2} /> : null}
  //       <MultiPlayerModal cancelFunction={cancelMatchMaking} />
  //     </div>
  //   );
  // }

  return (
    <div className="gameclient">
      <NavBar />
      <GameBoard type="SELF" key={1} />
      {gameInfo.gameType === GameTypeEnum.Multiplayer ? <GameBoard type="GUEST" key={2} /> : null}
      {gameInfo.gameStatus === (GameStatuses.Multi_WaitingForPlayer2 as GameStatuses) ? (
        <MultiPlayerModal cancelFunction={cancelMatchMaking} />
      ) : null}
      {/* <Modal closeFunction={() => {}} newGame={() => {}} pegsRemaining={0} /> */}
    </div>
  );
};

type MultiPlayerModalPropsType = {
  cancelFunction: Function;
  // newGame: Function;
};

const MultiPlayerModal: React.FC<MultiPlayerModalPropsType> = ({ cancelFunction }) => {
  return (
    <div className="modal">
      <div className="modal-body">
        <div className="game-over-msg" style={{ fontSize: "2rem", paddingTop: "1.5rem" }}>
          Hold your horses !!!
        </div>
        <div className="ran-out-of-moves" style={{ padding: "auto" }}>
          Waiting for an another player to join...
          <br />
          Please Wait.
        </div>
        <Button clickHandler={cancelFunction} title={"Cancel"} style={{ marginTop: "1.5rem" }} />
      </div>
    </div>
  );
};

export default GameClient;
