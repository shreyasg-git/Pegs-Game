import React from "react";
import "./MenuBar.scss";
import "./../../../Button/Button.scss";
import Button from "components/Button";
import { GameInfoType } from "types/GameInfoType";
import { Link } from "react-router-dom";
interface MenuBarPropsType {
  newGameFunction?: Function;
  gameInfo: GameInfoType;
}

const MenuBar: React.FC<MenuBarPropsType> = ({ newGameFunction, gameInfo }) => {
  return (
    <div className="menu-bar">
      {!gameInfo.isMultiplayer ? (
        <Button
          clickHandler={() => {
            newGameFunction!();
          }}
          title={"New Game"}
          style={{ fontSize: "1.2rem" }}
        />
      ) : null}
      <Link className="btn" to="/">
        Exit
      </Link>
    </div>
  );
};

export default MenuBar;
