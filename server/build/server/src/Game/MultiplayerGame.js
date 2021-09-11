"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventNames_1 = require("types/EventNames");
var MultiplayerGame = (function () {
    function MultiplayerGame(io, socketPlayer1) {
        this._socketPlayer2 = null;
        this._io = io;
        this._socketPlayer1 = socketPlayer1;
        socketPlayer1.on(EventNames_1.EventNames.disconnect, function () { });
    }
    MultiplayerGame.prototype.connectPlayer2 = function (socketPlayer2) {
        this._socketPlayer2 = socketPlayer2;
    };
    return MultiplayerGame;
}());
exports.default = MultiplayerGame;
