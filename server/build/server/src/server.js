"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
dotenv_1.default.config({ path: "src/config.env" });
var socket_io_1 = __importDefault(require("socket.io"));
var app_1 = __importDefault(require("./app"));
var httpServer = http_1.default.createServer(app_1.default);
var PORT = process.env.PORT || 4000;
httpServer.listen(PORT, function () {
    console.log("Server is started on port " + PORT);
    console.log("heylo");
});
var io = new socket_io_1.default.Server(httpServer, { path: "/api/websocket" });
io.on("connection", function (socket) {
    console.log("New Connection - ", socket.id);
    socket.on("disconnect", function () {
        console.log("pehli fursat me nikal ", socket.id);
    });
});
