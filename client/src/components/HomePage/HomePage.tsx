import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import NavBar from "components/GameClient/NavBar";
// import Button from "components/Button";

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar username="shreyasbg" />
      <div className="homepage">
        <Link className="btn-link" to="/">
          Home
        </Link>
        <Link className="btn-link" to="/singleplayer">
          SinglePlayer
        </Link>
        <Link className="btn-link" to="/multiplayer">
          MultiPlayer
        </Link>
      </div>
    </>
  );
};

export default HomePage;
