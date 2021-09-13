import { GameInfoType, GameStatuses } from "types/GameInfoType";

export type GameInfoActionType = {
  type: GameInfoActionsEnum;
  payload: any;
};

export enum GameInfoActionsEnum {
  makeSinglePlayer,
  makeMultiPlayer,
  setUsername,
  setGameStatus,
  // abortGame
}
export const gameInfoReducer = (state: GameInfoType, action: GameInfoActionType): GameInfoType => {
  switch (action.type) {
    case GameInfoActionsEnum.makeMultiPlayer: {
      const newState = { ...state };
      newState.isMultiplayer = true;
      return newState;
    }
    case GameInfoActionsEnum.makeSinglePlayer: {
      const newState = { ...state };
      newState.isMultiplayer = false;
      newState.gameStatus = GameStatuses.Single_Intialized;
      return newState;
    }

    case GameInfoActionsEnum.setUsername: {
      const newState = { ...state };
      newState.username1 = action.payload!.username1;
      return newState;
    }
    case GameInfoActionsEnum.setGameStatus: {
      const newState = { ...state };
      newState.gameStatus = action.payload.newGameStatus;
      return newState;
    }

    default:
      return state;
  }
};
