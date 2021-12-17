import chalk from "chalk";
import dotenv from "dotenv";
import http from "http";
dotenv.config({ path: "src/config.env" });
import socketio, { Socket } from "socket.io";

import app from "./app";
import gameStore from "./Game/GameStore";
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

  socket.on(CustomEventNames.newGameInit, (data) => {
    console.log(chalk.gray(JSON.parse(JSON.stringify(data))));
    // gameType: "Multiplayer", gameStatus: "Multi_WaitingForPlayer2"
    if (data.gameType === "Multiplayer" && data.gameStatus === "Multi_WaitingForPlayer2") {
      console.log("[Game HandShake]", socket.id, "Has requested for A Multiplayer Game");
      gameStore.requestNewGame(io, socket);
    }
  });

  socket.on("disconnect", () => {
    // console.log("\x1b[33m%s\x1b[0m", socket.id);
    console.log(chalk.black.bgRed("Player Disconnected ", socket.id));
  });
});
