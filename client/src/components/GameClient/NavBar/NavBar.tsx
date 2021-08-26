import "./NavBar.scss";
import { NavBarPropType } from "./NavBarTypes";

const NavBar: React.FC<NavBarPropType> = () => {
  return (
    <div className="navbar">
      <div className="newgamebtn">New Game</div>
      <div className="newgamebtn">New Game</div>
      <div className="newgamebtn">New Game</div>
    </div>
  );
};

export default NavBar;
