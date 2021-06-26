import React from "react";

import "./App.scss";
import GameBoard from "../GameBoard";
import NavBar from "../NavBar";

// export const GameBoardUpdateContext = React.createContext({ gbState: [], setGBState:Dispatch<SetStateAction<never[]>>  });

const App: React.FC = () => {
  const [, setGBState] = React.useState([]);

  return (
    <div className="app">
      <NavBar setGBState={setGBState} />
      <GameBoard setGBState={setGBState} />
    </div>
  );
};

export default App;
