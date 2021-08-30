import React from "react";
import GameBoard from "./GameBoard";
import "./GameClient.scss";
// import MenuBar from "./GameBoard/MenuBar";
import NavBar from "./NavBar";

interface GameClientPropsType {
  gameInfo: GameInfoType;
}

export type GameInfoType = {
  username1: string;
  username2?: string | null;
  isMultiplayer: boolean;
};

const GameClient: React.FC<GameClientPropsType> = ({ gameInfo }) => {
  // const [gameInfo, setGameInfo] = useState({ user1: "shreyasbg", isMultiplayer: true });

  return (
    <div className="gameclient">
      <NavBar username={gameInfo.username1} />
      <GameBoard type="SELF" gameInfo={gameInfo} key={1} />
      {gameInfo.isMultiplayer ? <GameBoard type="GUEST" gameInfo={gameInfo} key={2} /> : null}
    </div>
  );
};

export default GameClient;
