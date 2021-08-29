import React, { useState } from "react";
import GameBoard from "./GameBoard";
import "./GameClient.scss";
// import MenuBar from "./GameBoard/MenuBar";
import NavBar from "./NavBar";

const GameClient: React.FC = () => {
  const [gameInfo, setGameInfo] = useState({ user1: "shreyasbg", isMultiplayer: true });

  return (
    <div className="gameclient">
      <NavBar username={gameInfo.user1} />
      <GameBoard type="SELF" />
      {gameInfo.isMultiplayer ? <GameBoard type="GUEST" /> : null}
    </div>
  );
};

export default GameClient;
