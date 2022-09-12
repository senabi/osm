import { Server } from "socket.io";
import dotenv from "dotenv";
import { SocketAddress } from "net";
dotenv.config();

const io = new Server(process.env.PORT ? parseInt(process.env.PORT) : 3001, {
  cors: {
    origin: "*",
  },
});

io.on("connection", socket => {
  console.log("➕ user connected", socket.id);
  let num: NodeJS.Timer;
  socket.on("disconnect", () => {
    console.log("➖ user disconnected");
    clearInterval(num);
  });

  socket.on("random", () => {
    num = setInterval(() => {
      const number = Math.random();
      console.log(number);
      io.emit("random", number);
    }, 1000);
  });
});
