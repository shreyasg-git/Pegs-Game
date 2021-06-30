import React from "react";

import "./App.scss";

import GameClient from "../GameClient";

// export const GameBoardUpdateContext = React.createContext({ gbState: [], setGBState:Dispatch<SetStateAction<never[]>>  });

const App: React.FC = () => {
  return (
    <div className="app">
      <GameClient />
    </div>
  );
};

export default App;
