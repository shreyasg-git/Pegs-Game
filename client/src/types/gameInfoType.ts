export type GameInfoType = {
  username1: string | null;
  username2?: string | null;
  gameType: GameTypeEnum;
  // isMultiplayer: boolean | "NOT_INITIATED";
  gameStatus: GameStatuses;
};

export enum GameTypeEnum {
  NotStarted = "NotStarted",
  SinglePlayer = "SinglePlayer",
  Multiplayer = "Multiplayer",
}

export enum GameStatuses {
  NotInitiated = "NotInitiated",
  Single_Intialized = "Single_Intialized",
  Single_Playing = "Single_Playing",
  Single_Over = "Single_Over",
  Single_Analyzing = "Single_Analyzing",
  Multi_WaitingForPlayer2 = "Multi_WaitingForPlayer2",
  Multi_Initiated = "Multi_Initiated",
  Multi_SelfChance = "Multi_SelfChance",
  Multi_OpponentChance = "Multi_OpponentChance",
  Multi_SelfOver = "Multi_SelfOver",
  Multi_OpponentOver = "Multi_OpponentOver",
}
