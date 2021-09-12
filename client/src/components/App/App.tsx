import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import GameClient from "../GameClient";
import HomePage from "components/HomePage";
// export const GameBoardUpdateContext = React.createContext({ gbState: [], setGBState:Dispatch<SetStateAction<never[]>>  });
import { GameInfoType } from "types/gameInfoType";

const App: React.FC = () => {
  const [gameInfo, setGameInfo] = React.useState<GameInfoType>({
    username1: "",
    username2: "",
    isMultiplayer: false,
  });

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/singleplayer">
            <GameClient gameInfo={gameInfo} />
          </Route>
          <Route path="/multiplayer">
            <GameClient gameInfo={gameInfo} />
          </Route>
          <Route path="/homepage">
            <HomePage gameInfo={gameInfo} setGameInfo={setGameInfo} />
          </Route>
          <Route path="/">
            <HomePage gameInfo={gameInfo} setGameInfo={setGameInfo} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
