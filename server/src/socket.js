import { Server } from "socket.io";
import { _env } from "./constant.js";

const invokeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: _env.ORIGIN.split(","),
      credentials: true,
    },
    reconnection: true, // Reconnection is enabled
    reconnectionAttempts: 5, // Retry 5 times before giving up
    reconnectionDelay: 1000, // Wait 1 second between reconnection attempts
    timeout: 20000, // Wait up to 20 seconds for a connection before timing out
  });

  const userSockets = new Map(); //userid->socket.id

  io.on("connection", (socket) => {
    console.log(socket.id);
  });
};

export default invokeSocket;
