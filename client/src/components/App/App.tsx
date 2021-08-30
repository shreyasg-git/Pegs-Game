import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import GameClient from "../GameClient";
import HomePage from "components/HomePage";
// export const GameBoardUpdateContext = React.createContext({ gbState: [], setGBState:Dispatch<SetStateAction<never[]>>  });

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/singleplayer">
            <GameClient gameInfo={{ username1: "shreyasbg", isMultiplayer: false }} />
          </Route>
          <Route path="/multiplayer">
            <GameClient gameInfo={{ username1: "shreyasbg", isMultiplayer: true }} />
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
