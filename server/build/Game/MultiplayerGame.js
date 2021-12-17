"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventNames_1 = require("./../types/EventNames");
var GameState_1 = require("../types/GameState");
var chalk_1 = __importDefault(require("chalk"));
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
        this.attachEventListenersAfterHandshakeIsSuccessful = function () {
            _this._socketPlayer1.on(EventNames_1.EventNames.disconnect, function () {
                var _a;
                console.log(chalk_1.default.green("[Game Handshake] Player1 Disconnected"));
                (_a = _this._socketPlayer2) === null || _a === void 0 ? void 0 : _a.emit(EventNames_1.CustomEventNames.opponentDisconnected);
            });
            _this._socketPlayer2.on(EventNames_1.EventNames.disconnect, function () {
                console.log(chalk_1.default.green("[Game Handshake] Player2 Disconnected"));
                _this._socketPlayer1.emit(EventNames_1.CustomEventNames.opponentDisconnected);
            });
            _this._socketPlayer1.on(EventNames_1.CustomEventNames.moveMade, function (move) {
                console.log();
            });
        };
        this._toggleChance = function () {
            if (_this._chanceOf === ChanceOfPlayer.p1) {
                _this._chanceOf = ChanceOfPlayer.p2;
            }
            if (_this._chanceOf === ChanceOfPlayer.p2) {
                _this._chanceOf = ChanceOfPlayer.p1;
            }
        };
        this.sendHandshakeSuccessMsgs = function (gameId) {
            var gameInfoFromServer = {
                gameId: gameId,
                player1Id: _this._socketPlayer1.id,
                player2Id: _this._socketPlayer2.id,
            };
            _this._socketPlayer1.emit(EventNames_1.CustomEventNames.foundAMatch, gameInfoFromServer);
            _this._socketPlayer2.emit(EventNames_1.CustomEventNames.foundAMatch, gameInfoFromServer);
            _this.attachEventListenersAfterHandshakeIsSuccessful();
        };
        this.getSocketIDs = function () {
            var _a;
            return [_this._socketPlayer1.id, (_a = _this._socketPlayer2) === null || _a === void 0 ? void 0 : _a.id];
        };
        this.sendOnWaitMessage = function () {
            _this._socketPlayer1.emit(EventNames_1.CustomEventNames.putOnWait);
        };
        this.logInfo = function () { };
        this._io = io;
        this._socketPlayer1 = socketPlayer1;
        this._chanceOf = ChanceOfPlayer.NONE;
        this.gameState = GameState_1.GameStateEnum.WaitingForPlayer2;
    }
    MultiplayerGame.prototype.connectPlayer2 = function (socketPlayer2) {
        this._socketPlayer2 = socketPlayer2;
    };
    return MultiplayerGame;
}());
exports.default = MultiplayerGame;
