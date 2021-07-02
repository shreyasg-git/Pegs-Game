import { GameBoardChangesType } from "./GameBoard/Peg/PegTypes";

export enum selfBoardStateActionTypes {
  CleanAndSelect = "CLEAN_AND_SELECT",
  NewGame = "NEW_GAME",
  ExitGame = "EXIT_GAME",
  Undo = "UNDO",
  Redo = "REDO",
  Restart = "RESTART",
  SelectAPeg = "SELECT_A_PEG",
}

export enum guestBoardStateActionTypes {
  ExitGame = "EXIT_GAME",
  NewMove = "NEW_MOVE",
}
export type selfBoardStateAction = {
  type: selfBoardStateActionTypes;
  payload: string[] | Object | GameBoardChangesType;
};

export type guestBoardStateAction = {
  type: guestBoardStateActionTypes;
  payload: string[] | Object;
};

export type Move = {
  MovedFrom: number;
  DeletedFrom: number;
  MovedTo: number;
};

// export tpye SelectedMove = {
//   Sele
// }
