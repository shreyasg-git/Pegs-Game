export type GameInfoType = {
  username1: string | null;
  username2?: string | null;
  isMultiplayer: boolean;
  gameStatus: GameStatuses;
};

export enum GameStatuses {
  NotInitiated,
  WaitingForPlayer2,
  OnGoing,
  Over,
}
