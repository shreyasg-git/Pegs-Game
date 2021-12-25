"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MultiplayerGame_1 = __importDefault(require("./MultiplayerGame"));
var GameState_1 = require("../types/GameState");
var chalk_1 = __importDefault(require("chalk"));
var GameStore = (function () {
    function GameStore() {
        this._onGoingGamesList = [];
        this._gamesWaitList = [];
    }
    GameStore.prototype.resolveAGameOnWait = function () {
        var game = this._gamesWaitList[0];
        this._gamesWaitList.shift();
        return game;
    };
    GameStore.prototype.removeAPlayerUsingSocketId = function (playerSocket) {
        this._gamesWaitList = this._gamesWaitList.filter(function (gameInstance) {
            return gameInstance.getSocketIDs()[0] !== playerSocket.id;
        });
    };
    GameStore.prototype.requestNewGame = function (io, playerSocket) {
        if (this._gamesWaitList[0] &&
            this._gamesWaitList[0].gameState === GameState_1.GameStateEnum.WaitingForPlayer2) {
            console.log("[Game HandShake] Found A Game for " + chalk_1.default.black.bgYellow(playerSocket.id) + " from waitlist...");
            var game = this.resolveAGameOnWait();
            game.connectPlayer2(playerSocket);
            this._onGoingGamesList.push(game);
            game.sendHandshakeSuccessMsgs(this._onGoingGamesList.length - 1);
            console.log(chalk_1.default.green("[Game Handshake] Completed..."), chalk_1.default.black.bgGreen("" + game.getSocketIDs()));
        }
        else {
            console.log(chalk_1.default.yellow("[Game HandShake] No Current Game available..." + playerSocket.id + " is put on wait"));
            var multiplayerGame = new MultiplayerGame_1.default(io, playerSocket);
            this._gamesWaitList.push(multiplayerGame);
            multiplayerGame.sendOnWaitMessage();
        }
    };
    GameStore.prototype.logGamesInfo = function () {
        this._gamesWaitList.forEach(function (g) {
            console.log(g.getSocketIDs());
        });
    };
    return GameStore;
}());
var gameStore = new GameStore();
exports.default = gameStore;
