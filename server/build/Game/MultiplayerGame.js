"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventNames_1 = require("./../types/EventNames");
var GameState_1 = require("../types/GameState");
var ChanceOfPlayer;
(function (ChanceOfPlayer) {
    ChanceOfPlayer[ChanceOfPlayer["NONE"] = 0] = "NONE";
    ChanceOfPlayer[ChanceOfPlayer["p1"] = 1] = "p1";
    ChanceOfPlayer[ChanceOfPlayer["p2"] = 2] = "p2";
})(ChanceOfPlayer || (ChanceOfPlayer = {}));
var MultiplayerGame = (function () {
    function MultiplayerGame(io, socketPlayer1) {
        var _this = this;
        this._socketPlayer2 = null;
        this._toggleChance = function () {
            if (_this._chanceOf === ChanceOfPlayer.p1) {
                _this._chanceOf = ChanceOfPlayer.p2;
            }
            if (_this._chanceOf === ChanceOfPlayer.p2) {
                _this._chanceOf = ChanceOfPlayer.p1;
            }
        };
        this.getSocketIDs = function () {
            return [_this._socketPlayer1.id, _this._socketPlayer2.id];
        };
        this.sendOnWaitMessage = function () {
            _this._socketPlayer1.emit(EventNames_1.CustomEventNames.putOnWait);
        };
        this.logInfo = function () { };
        this._io = io;
        this._socketPlayer1 = socketPlayer1;
        this._chanceOf = ChanceOfPlayer.NONE;
        this.gameState = GameState_1.GameState.WaitingForPlayer2;
    }
    MultiplayerGame.prototype.connectPlayer2 = function (socketPlayer2) {
        this._socketPlayer2 = socketPlayer2;
    };
    return MultiplayerGame;
}());
exports.default = MultiplayerGame;
