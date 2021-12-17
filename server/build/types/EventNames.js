"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEventNames = exports.EventNames = void 0;
var EventNames;
(function (EventNames) {
    EventNames["disconnect"] = "disconnect";
    EventNames["connection"] = "connection";
})(EventNames = exports.EventNames || (exports.EventNames = {}));
var CustomEventNames;
(function (CustomEventNames) {
    CustomEventNames["newGameInit"] = "NEW_GAME_INIT";
    CustomEventNames["putOnWait"] = "PUT_ON_WAIT";
    CustomEventNames["foundAMatch"] = "FOUND_A_MATCH";
    CustomEventNames["opponentDisconnected"] = "OPPONENT_DISCONNECTED";
    CustomEventNames["moveMade"] = "MOVE_MADE";
})(CustomEventNames = exports.CustomEventNames || (exports.CustomEventNames = {}));
