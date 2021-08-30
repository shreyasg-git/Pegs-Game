import "./NavBar.scss";
// import Logo from "./caret-down-solid.svg";
import { NavBarPropType } from "./NavBarTypes";

const NavBar: React.FC<NavBarPropType> = ({ username }) => {
  return (
    <div className="navbar">
      <div className="logo">Peg Solitaire</div>
      <div className="username">
        {username}
        <img className="caret" src={"./caret-down-solid.svg"} alt="." />
      </div>
    </div>
  );
};

export default NavBar;
