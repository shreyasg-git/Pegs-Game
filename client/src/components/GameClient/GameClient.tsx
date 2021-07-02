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
import { clearGameBoardArray } from "./GameBoard/GameBoardUtils";
import { PegTypes, GameBoardChangesType } from "./GameBoard/Peg/PegTypes";

const GameClient: React.FC = () => {
  const [gameInfo, setGameInfo] = useState({ user1: "shreyasbg", isMultiplayer: false });
  const [selfBoardState, selfBoardStateDispatch] = useReducer(selfBoardStateReducer, [
    ...InitialGameBoardState,
  ]);

  const [guestBoardState, guestBoardStateDispatch] = useReducer(guestBoardStateReducer, [
    ...InitialGameBoardState,
  ]);

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

    case selfBoardStateActionTypes.CleanAndSelect:
      const newState1 = action.payload as string[];
      return newState1;

    case selfBoardStateActionTypes.SelectAPeg:
      let newState2 = [...state];
      newState2 = clearGameBoardArray(newState2);
      const payload: GameBoardChangesType = { ...action.payload } as GameBoardChangesType;

      // applying changes to newState2
      newState2 = applyStateChangesToFrom(newState2, payload);

      return newState2;

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

const applyStateChangesToFrom = (
  stateArrCopy: string[],
  changes: GameBoardChangesType
): string[] => {
  stateArrCopy[changes.SelectedPeg![0]] = PegTypes.SelectedPeg;
  changes.DeletePeg!.forEach((pegId) => {
    stateArrCopy[pegId] = PegTypes.DeletePeg;
  });
  changes.DroppableEmptySlot!.forEach((pegId) => {
    stateArrCopy[pegId] = PegTypes.DroppableEmptySlot;
  });

  return [...stateArrCopy];
};
