"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventNames_1 = __importDefault(require("@src/utils/EventNames"));
var MultiplayerGame = (function () {
    function MultiplayerGame(io, socketPlayer1) {
        this._socketPlayer2 = null;
        this._io = io;
        this._socketPlayer1 = socketPlayer1;
        socketPlayer1.on(EventNames_1.default.disconnect, function () { });
    }
    MultiplayerGame.prototype.connectPlayer2 = function (socketPlayer2) {
        this._socketPlayer2 = socketPlayer2;
    };
    return MultiplayerGame;
}());
exports.default = MultiplayerGame;
