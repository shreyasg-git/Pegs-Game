import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import GameClient from "../GameClient";
import HomePage from "components/HomePage";
// export const GameBoardUpdateContext = React.createContext({ gbState: [], setGBState:Dispatch<SetStateAction<never[]>>  });
import { GameInfoType, GameStatuses } from "types/gameInfoType";

import GameInfoCxt from "GameInfoCxt";
import { gameInfoReducer } from "reducers/gameInfoReducer";
// import GameInfoCxt from "GameInfoCxt";

const App: React.FC = () => {
  const [gameInfo, gameInfoDispatch] = useReducer(gameInfoReducer, {
    username1: "",
    username2: "",
    isMultiplayer: false,
    gameStatus: GameStatuses.NotInitiated,
  });

  return (
    <GameInfoCxt.Provider value={{ gameInfo, gameInfoDispatch }}>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/singleplayer">
              <GameClient />
            </Route>
            <Route path="/multiplayer">
              <GameClient />
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
    </GameInfoCxt.Provider>
  );
};

export default App;
