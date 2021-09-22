"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MultiplayerGame_1 = __importDefault(require("./MultiplayerGame"));
var GameState_1 = require("../types/GameState");
var GameStore = (function () {
    function GameStore() {
        this._onGoingGamesList = [];
        this._gamesWaitList = [];
    }
    GameStore.prototype.addGameToWaitlist = function (game) {
        this._gamesWaitList.push(game);
    };
    GameStore.prototype.resolveAGameOnWait = function () {
        var game = this._gamesWaitList[0];
        this._gamesWaitList.shift();
        return game;
    };
    GameStore.prototype.requestNewGame = function (io, playerSocket) {
        if (this._gamesWaitList[0] &&
            this._gamesWaitList[0].gameState === GameState_1.GameState.WaitingForPlayer2) {
            console.log("[Game HandShake] Found A Game for " + playerSocket.id + " from waitlist...");
            var game = this.resolveAGameOnWait();
            game.connectPlayer2(playerSocket);
            this._onGoingGamesList.push(game);
            console.log("[Game Handshake] Completed..." + game.getSocketIDs());
        }
        else {
            console.log("[Game HandShake] No Current Game On wait..." + playerSocket.id + " is put on wait");
            var multiplayerGame = new MultiplayerGame_1.default(io, playerSocket);
            this._gamesWaitList.push(multiplayerGame);
            multiplayerGame.sendOnWaitMessage();
        }
    };
    GameStore.prototype.logGamesInfo = function () { };
    return GameStore;
}());
var gameStore = new GameStore();
exports.default = gameStore;
