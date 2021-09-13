import React, { useContext } from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import NavBar from "components/GameClient/NavBar";
import { HomePagePropsType } from "./HomePagePropsType";
import UserNameInput from "./UserNameInput";

// import Button from "components/Button";
import GameInfoCxt from "GameInfoCxt";
import "./../Modal/Modal.scss";
import { GameInfoActionsEnum } from "reducers/gameInfoReducer";

const HomePage: React.FC<HomePagePropsType> = () => {
  const { gameInfo, gameInfoDispatch } = useContext(GameInfoCxt);

  const makeMultiPlayer = () => {
    gameInfoDispatch({
      type: GameInfoActionsEnum.makeMultiPlayer,
      payload: null,
    });
  };
  const makeSinglePlayer = () => {
    gameInfoDispatch({ type: GameInfoActionsEnum.makeSinglePlayer, payload: null });
  };

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

export default HomePage;
