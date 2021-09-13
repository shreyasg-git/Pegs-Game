import React from "react";
import GameBoard from "./GameBoard";
import "./GameClient.scss";
// import MenuBar from "./GameBoard/MenuBar";
import NavBar from "./NavBar";
import selfSocketClient from "websockets/SocketClient";

import GameInfoCxt from "GameInfoCxt";

type GameClientPropsType = {
  // gameInfo: GameInfoType;
};

const GameClient: React.FC<GameClientPropsType> = () => {
  const { gameInfo, gameInfoDispatch } = React.useContext(GameInfoCxt);

  // const [gameInfo, setGameInfo] = useState({ user1: "shreyasbg", isMultiplayer: true });

  React.useEffect(() => {
    if (gameInfo.isMultiplayer) {
      selfSocketClient.startMultiplayerGame();
    }

    return () => {
      if (gameInfo.isMultiplayer) selfSocketClient.disconnect();
    };
  });

  return (
    <div className="gameclient">
      <NavBar />
      <GameBoard type="SELF" key={1} />
      {gameInfo.isMultiplayer ? <GameBoard type="GUEST" key={2} /> : null}
    </div>
  );
};

export default GameClient;
