import { GameBoardChangesType } from "./GameStateChanges";
export enum BoardStateActionTypes {
  CleanAndSelect = "CLEAN_AND_SELECT",
  NewGame = "NEW_GAME",
  ExitGame = "EXIT_GAME",
  Undo = "UNDO",
  Redo = "REDO",
  Restart = "RESTART",
  SelectAPeg = "SELECT_A_PEG",
}
export type BoardStateAction = {
  type: BoardStateActionTypes;
  payload: number[] | Object | GameBoardChangesType;
};
