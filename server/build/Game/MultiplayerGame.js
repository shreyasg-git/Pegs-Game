"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventNames_1 = require("./../types/EventNames");
var GameState;
(function (GameState) {
    GameState[GameState["WaitingForPlayer2"] = 0] = "WaitingForPlayer2";
    GameState[GameState["Full"] = 1] = "Full";
})(GameState || (GameState = {}));
var MultiplayerGame = (function () {
    function MultiplayerGame(io, socketPlayer1) {
        var _this = this;
        this._socketPlayer2 = null;
        this._io = io;
        this._socketPlayer1 = socketPlayer1;
        this.gameState = GameState.WaitingForPlayer2;
        this._socketPlayer1.on(EventNames_1.EventNames.disconnect, function () { });
        this._socketPlayer1.on(EventNames_1.CustomEventNames.newGameInit, function () {
            console.log(_this._socketPlayer1.id, "is intiated a game");
        });
    }
    MultiplayerGame.prototype.connectPlayer2 = function (socketPlayer2) {
        this._socketPlayer2 = socketPlayer2;
    };
    return MultiplayerGame;
}());
exports.default = MultiplayerGame;
