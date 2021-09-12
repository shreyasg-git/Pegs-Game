import React, { Dispatch, SetStateAction } from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import NavBar from "components/GameClient/NavBar";
import { HomePagePropsType } from "./HomePagePropsType";
import Modal from "components/Modal";
import { GameInfoType } from "types/gameInfoType";
// import Button from "components/Button";

import "./../Modal/Modal.scss";

const HomePage: React.FC<HomePagePropsType> = ({ gameInfo, setGameInfo }) => {
  const makeMultiPlayer = () => {
    const newGameInfo = { ...gameInfo };
    newGameInfo.isMultiplayer = true;
    setGameInfo(newGameInfo);
  };
  const makeSinglePlayer = () => {
    const newGameInfo = { ...gameInfo };
    newGameInfo.isMultiplayer = false;
    setGameInfo(newGameInfo);
  };
  return (
    <>
      {gameInfo.username1 ? null : <UserNameInput gameInfo={gameInfo} setGameInfo={setGameInfo} />}
      <NavBar username={gameInfo.username1} />
      <div className="homepage">
        <Link className="btn-link" to="/">
          Home
        </Link>
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

type UserNameInputPropsType = {
  gameInfo: GameInfoType;
  setGameInfo: Dispatch<SetStateAction<GameInfoType>>;
};

const UserNameInput: React.FC<UserNameInputPropsType> = ({ gameInfo, setGameInfo }) => {
  const [localUserName, setLocalUserName] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newGameInfo = { ...gameInfo };
    newGameInfo.username1 = localUserName;
    setGameInfo(newGameInfo);
  };
  return (
    <div className="usernameinput modal">
      <div className="input modal-body-2">
        Enter a Username :
        <form onSubmit={handleSubmit}>
          <input
            className="modal-input-element"
            type="text"
            onChange={(e) => {
              setLocalUserName(e.target.value);
            }}
          />
          <input type="submit" value="Submit" className="modal-submit-btn" />
        </form>
      </div>
    </div>
  );
};

export default HomePage;
