export type GameInfoType = {
  username1: string | null;
  username2?: string | null;
  isMultiplayer: boolean;
  gameStatus: GameStatuses;
};

export enum GameStatuses {
  NotInitiated,
  Single_Intialized,
  Single_Playing,
  Single_Over,
  Single_Analyzing,
  Multi_WaitingForPlayer2,
  Multi_Initiated,
  Multi_SelfChance,
  Multi_OpponentChance,
  Multi_SelfOver,
  Multi_OpponentOver,
}
