import React, { useContext } from "react";
import "./MenuBar.scss";
import "./../../../Button/Button.scss";
import Button from "components/Button";
import { GameInfoType, GameStatuses, GameTypeEnum } from "types/GameInfoType";
import { Link } from "react-router-dom";
import GameInfoCxt from "GameInfoCxt";
import { GameInfoActionsEnum } from "reducers/gameInfoReducer";
interface MenuBarPropsType {
  newGameFunction?: Function;
  gameInfo: GameInfoType;
}

const MenuBar: React.FC<MenuBarPropsType> = ({ newGameFunction }) => {
  const { gameInfo, gameInfoDispatch } = useContext(GameInfoCxt);
  return (
    <div className="menu-bar">
      {gameInfo.gameType === GameTypeEnum.SinglePlayer ? (
        <Button
          clickHandler={() => {
            newGameFunction!();
          }}
          title={"New Game"}
          style={{ fontSize: "1.2rem" }}
        />
      ) : null}
      <Link
        className="btn"
        to="/"
        onClick={() => {
          if (gameInfo.gameType === GameTypeEnum.SinglePlayer) newGameFunction!();
          gameInfoDispatch({
            type: GameInfoActionsEnum.setGameStatus,
            payload: { newGameStatus: GameStatuses.NotInitiated },
          });
          // gameInfoDispatch({type: })
        }}
      >
        Exit
      </Link>
    </div>
  );
};

export default MenuBar;
