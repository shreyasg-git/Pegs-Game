"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
dotenv_1.default.config({ path: "src/config.env" });
var socket_io_1 = __importDefault(require("socket.io"));
var app_1 = __importDefault(require("./app"));
var GameStore_1 = __importDefault(require("./Game/GameStore"));
var EventNames_1 = require("./types/EventNames");
var httpServer = http_1.default.createServer(app_1.default);
var PORT = process.env.PORT || 4000;
httpServer.listen(PORT, function () {
    console.log("Server is started on port " + PORT);
    console.log("heylasdao");
});
var io = new socket_io_1.default.Server(httpServer, { path: "/api/websocket" });
io.on("connection", function (socket) {
    console.log("New Connection - ", socket.id);
    socket.on(EventNames_1.CustomEventNames.newGameInit, function (data) {
        if (data.gameType === "Multiplayer" && data.gameStatus === "Multi_WaitingForPlayer2") {
            console.log("[Game HandShake]", socket.id, "Has requested for A Multiplayer Game");
            GameStore_1.default.requestNewGame(io, socket);
        }
    });
    socket.on("disconnect", function () {
        console.log(chalk_1.default.black.bgRed("Player Disconnected ", socket.id));
    });
});
