import React, { useReducer, useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import "./App.scss";

import GameClient from "../GameClient";
import HomePage from "components/HomePage";
import { GameStatuses, GameTypeEnum } from "types/GameInfoType";

import GameInfoCxt from "GameInfoCxt";
import { gameInfoReducer } from "reducers/gameInfoReducer";
// import GameInfoCxt from "GameInfoCxt";

const App: React.FC = () => {
  const history = useHistory();
  console.log(history);

  const [gameInfo, gameInfoDispatch] = useReducer(gameInfoReducer, {
    username1: "",
    username2: "",
    gameType: GameTypeEnum.NotStarted,
    gameStatus: GameStatuses.NotInitiated,
  });

  useEffect(() => {
    console.log("App Re-render");

    console.log(gameInfo);
  }, [gameInfo]);

  return (
    <GameInfoCxt.Provider value={{ gameInfo, gameInfoDispatch }}>
      <Switch>
        <Route path="/singleplayer">
          {gameInfo.username1 ? <GameClient /> : <Redirect to="/homepage" />}
        </Route>
        <Route path="/multiplayer">
          {gameInfo.username1 ? <GameClient /> : <Redirect to="/homepage" />}
        </Route>
        <Route path="/homepage">
          <HomePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </GameInfoCxt.Provider>
  );
};

export default App;
