import MultiplayerGame from "./MultiplayerGame";

class GameStore {
  multiplayerGameStore: Array<MultiplayerGame> = [];
  constructor() {
    this.multiplayerGameStore = [];
  }
}

const gameStore = new GameStore();

export default gameStore;
