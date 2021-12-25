import React, { useContext, useEffect } from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import NavBar from "components/GameClient/NavBar";
import { HomePagePropsType } from "./HomePagePropsType";
import UserNameInput from "./UserNameInput";

// import Button from "components/Button";
import GameInfoCxt from "GameInfoCxt";
import "./../Modal/Modal.scss";
import { GameInfoActionsEnum } from "reducers/gameInfoReducer";
import { GameStatuses } from "types/GameInfoType";
import vm from "utils/ValidMoves";

const HomePage: React.FC<HomePagePropsType> = () => {
  const { gameInfo, gameInfoDispatch } = useContext(GameInfoCxt);

  const makeMultiPlayer = () => {
    gameInfoDispatch({
      type: GameInfoActionsEnum.makeMultiPlayer,
      payload: null,
    });
    gameInfoDispatch({
      type: GameInfoActionsEnum.setGameStatus,
      payload: { newGameStatus: GameStatuses.Multi_WaitingForPlayer2 },
    });
  };
  const makeSinglePlayer = () => {
    gameInfoDispatch({ type: GameInfoActionsEnum.makeSinglePlayer, payload: null });
  };
  useEffect(() => {
    console.log("HOME PAGE Re-Render");
    vm.newGame();
  });

  return (
    <>
      {gameInfo.username1 ? null : <UserNameInput />}
      <NavBar />
      <div className="homepage">
        <Link className="btn-link" to="/singleplayer" onClick={makeSinglePlayer}>
          SinglePlayer
        </Link>
        <Link className="btn-link" to="/multiplayer" onClick={makeMultiPlayer}>
          MultiPlayer
        </Link>
      </div>
    </>
  );
};

// const checkIfSinglePlayerGameWasGoingOn = (gameInfo: GameInfoType) => {
//   let k = false;
//   if (gameInfo.gameType === GameTypeEnum.SinglePlayer) {
//     // console.log(gameInfo.isMultiplayer, "K IS TRUE");
//     k = true;
//   }
//   if (k && gameInfo.username1 && (gameInfo.gameStatus = GameStatuses.Single_Intialized)) {
//     return true;
//   }
// };

export default HomePage;
