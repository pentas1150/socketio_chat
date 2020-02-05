import * as SocketIO from "socket.io";
import * as sharedSession from "express-socket.io-session";
import { Message } from "./domain/interface";

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: "/socket.io" });

  app.set("io", io);

  const chat = io.of("/chat");

  chat.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  chat.on("connection", socket => {
    const req = socket.request;
    const {
      headers: { referer }
    } = req;
    const roomId: number = Number(
      referer.split("/")[referer.split("/").length - 1]
    );
    const nickname: string = req.session.nickname;

    socket.join(roomId);

    //console.log(response.data);
    io.of("/chat")
      .to(roomId)
      .emit("newMember", nickname);

    const enterMessage: Message = {
      id: nickname,
      color: req.session.color,
      msg: "님이 입장하셨습니다."
    };
    //console.log(`${nickname} is connected on ${roomId}`);
    //console.log(enterMessage);
    io.of("/chat")
      .to(roomId)
      .emit("recvChat", JSON.stringify(enterMessage));

    socket.on("disconnect", async () => {
      //console.log(`${nickname} is disconnected`);
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      //console.log(userCount);

      const exitMessage: Message = {
        id: nickname,
        color: req.session.color,
        msg: "님이 나가셨습니다."
      };
      socket.to(roomId).emit("recvChat", JSON.stringify(exitMessage));
      socket.to(roomId).emit("exitMember", nickname);

      socket.leave(roomId);
    });

    socket.on("sendChat", (data: string) => {
      //console.log(`${nickname} : ${data}`);
      const chatMessage: Message = {
        id: nickname,
        color: req.session.color,
        msg: data
      };

      io.of("/chat")
        .to(roomId)
        .emit("recvChat", JSON.stringify(chatMessage));
    });
  });
};
