import React from "react";
import GameBoard from "./GameBoard";
import "./GameClient.scss";
// import MenuBar from "./GameBoard/MenuBar";
import NavBar from "./NavBar";
import selfSocketClient from "websockets/SocketClient";

import GameInfoCxt from "GameInfoCxt";
import { GameStatuses, GameTypeEnum } from "types/GameInfoType";
import { GameInfoActionsEnum } from "reducers/gameInfoReducer";

type GameClientPropsType = {
  // gameInfo: GameInfoType;
};

const GameClient: React.FC<GameClientPropsType> = () => {
  const { gameInfo, gameInfoDispatch } = React.useContext(GameInfoCxt);

  React.useEffect(() => {
    (async function anyNameFunction() {
      if (gameInfo.gameType === GameTypeEnum.Multiplayer) {
        await selfSocketClient.startMultiplayerGame(gameInfo);
      }
    })();

    return () => {
      if (gameInfo.gameType === GameTypeEnum.Multiplayer) selfSocketClient.disconnect();
    };
  }, [gameInfo, gameInfoDispatch]);

  return (
    <div className="gameclient">
      <NavBar />
      <GameBoard type="SELF" key={1} />
      {gameInfo.gameType === GameTypeEnum.Multiplayer ? <GameBoard type="GUEST" key={2} /> : null}
      {/* <Modal closeFunction={() => {}} newGame={() => {}} pegsRemaining={0} /> */}
    </div>
  );
};

export default GameClient;
