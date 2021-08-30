import React from "react";
import "./MenuBar.scss";
import Button from "components/Button";
interface MenuBarPropsType {
  newGameFunction?: Function;
}

const MenuBar: React.FC<MenuBarPropsType> = ({ newGameFunction }) => {
  return (
    <div className="menu-bar">
      <Button
        clickHandler={() => {
          newGameFunction!();
        }}
        title={"New Game"}
        style={{ "font-size": "1.2rem" }}
      />
      <Button
        clickHandler={() => {
          console.log("WORKING ON IT...");
        }}
        title={"Exit"}
        style={{ "font-size": "1.2rem" }}
      />
    </div>
  );
};

export default MenuBar;
