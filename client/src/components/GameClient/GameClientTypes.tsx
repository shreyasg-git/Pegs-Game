export enum selfBoardStateActionTypes {
  NewGame = "NEW_GAME",
  ExitGame = "EXIT_GAME",
  Undo = "UNDO",
  Redo = "REDO",
  Restart = "RESTART",
}

export enum guestBoardStateActionTypes {
  ExitGame = "EXIT_GAME",
  NewMove = "NEW_MOVE",
}
export type selfBoardStateAction = {
  type: selfBoardStateActionTypes;
  payload: Move;
};

export type guestBoardStateAction = {
  type: guestBoardStateActionTypes;
  payload: Move;
};

export type Move = {
  MovedFrom: number;
  DeletedFrom: number;
  MovedTo: number;
};
