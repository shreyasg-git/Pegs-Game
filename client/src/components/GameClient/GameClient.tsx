import React, { useEffect, useReducer, useState } from "react";
import GameBoard from "./GameBoard";
import NavBar from "./NavBar";
import {
  selfBoardStateAction,
  selfBoardStateActionTypes,
  guestBoardStateAction,
  guestBoardStateActionTypes,
} from "./GameClientTypes";
import { InitialGameBoardState } from "./GameClientInitStates";

const GameClient: React.FC = () => {
  const [gameInfo, setGameInfo] = useState({ user1: "shreyasbg", isMultiplayer: false });
  const [selfBoardState, selfBoardStateDispatch] = useReducer(selfBoardStateReducer, [
    ...InitialGameBoardState,
  ]);

  const [guestBoardState, guestBoardStateDispatch] = useReducer(guestBoardStateReducer, [
    ...InitialGameBoardState,
  ]);

  useEffect(() => {
    console.log(selfBoardState);
  });
  return (
    <div className="gameclient">
      <NavBar username={gameInfo.user1} />
      <GameBoard
        selfBoardState={selfBoardState}
        selfBoardStateDispatch={selfBoardStateDispatch}
        type="self"
      />
      {gameInfo.isMultiplayer ? (
        <GameBoard
          guestBoardState={guestBoardState}
          guestBoardStateDispatch={guestBoardStateDispatch}
          type="guest"
        />
      ) : null}
    </div>
  );
};

export default GameClient;

const selfBoardStateReducer = (state: string[], action: selfBoardStateAction): string[] => {
  switch (action.type) {
    case selfBoardStateActionTypes.NewGame:
      return InitialGameBoardState;

    default:
      return InitialGameBoardState;
  }
};

const guestBoardStateReducer = (state: string[], action: guestBoardStateAction): string[] => {
  switch (action.type) {
    case guestBoardStateActionTypes.NewMove:
      console.log(action.payload);

      return state;

    default:
      return InitialGameBoardState;
  }
};
