import io, { Socket } from "socket.io-client";

class SocketClient {
  private socket: Socket;
  constructor() {
    this.socket = io("/", {
      transports: ["websocket"],
      path: "/api/websocket",
    });
  }
}

export default SocketClient;
