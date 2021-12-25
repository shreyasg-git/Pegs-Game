import { useContext } from "react";
import "./NavBar.scss";

// import Logo from "./caret-down-solid.svg";
import { NavBarPropType } from "./NavBarTypes";
import { Link } from "react-router-dom";
import GameInfoCxt from "GameInfoCxt";

const NavBar: React.FC<NavBarPropType> = () => {
  const { gameInfo } = useContext(GameInfoCxt);

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        Peg Solitaire
      </Link>
      <div className="username">
        {gameInfo.username1}
        <img className="caret" src={"./caret-down-solid.svg"} alt="." />
      </div>
    </div>
  );
};

export default NavBar;
