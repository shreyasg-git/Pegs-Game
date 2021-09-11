"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express_1.default();
var httpServer = http_1.createServer(app);
var io = new socket_io_1.Server(httpServer);
app.use("/todos", function (req, res, next) {
    res.status(200).json({ msg: "Hello" });
});
app.use(function (err, req, res, next) {
    console.log("Hello From The Middlewares");
    res.status(500).json({ err: err.message });
});
app.get("/", function (req, res, next) {
    res.status(200).json({ msg: "Hello" });
});
app
    .listen(3001, function () {
    console.log("server started on port ", 3001);
})
    .on("error", function (e) {
    console.log(e);
});
