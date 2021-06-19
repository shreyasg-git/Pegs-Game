import React from "react";

import "./App.scss";
import GameBoard from "../GameBoard";

const App: React.FC = () => {
  return (
    <div className="app">
      <GameBoard />
    </div>
  );
};

export default App;
