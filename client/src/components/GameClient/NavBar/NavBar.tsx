import "./NavBar.scss";
// import Logo from "./caret-down-solid.svg";
import { NavBarPropType } from "./NavBarTypes";
import { Link } from "react-router-dom";

const NavBar: React.FC<NavBarPropType> = ({ username }) => {
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        Peg Solitaire
      </Link>
      <div className="username">
        {username}
        <img className="caret" src={"./caret-down-solid.svg"} alt="." />
      </div>
    </div>
  );
};

export default NavBar;
