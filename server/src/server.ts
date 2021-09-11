import dotenv from "dotenv";
import http from "http";
dotenv.config({ path: "src/config.env" });
import socketio, { Socket } from "socket.io";

import app from "./app";
import MultiplayerGame from "./Game/MultiplayerGame";
import { CustomEventNames } from "./types/EventNames";

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
  console.log("heylasdao");
});

const io = new socketio.Server(httpServer, { path: "/api/websocket" });

io.on("connection", (socket: Socket) => {
  console.log("New Connection - ", socket.id);

  socket.on(CustomEventNames.newGameInit, () => {
    // console.log(`${CustomEventNames.newGameInit} request in !!!!`);
    console.log(socket.id, "has intiated a game");

    const game = new MultiplayerGame(io, socket);
  });

  socket.on("disconnect", () => {
    // console.log("\x1b[33m%s\x1b[0m", socket.id);
    console.log("pehli fursat me nikal ", socket.id);
  });
});
