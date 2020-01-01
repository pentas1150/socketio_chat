const SocketIO = require("socket.io");
const axios = require("axios");

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: "/socket.io" });
  let usrCount = 0;

  app.set("io", io);

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  io.on("connection", async socket => {
    const req = socket.request;
    const nickname = req.session.nickname;

    try {
      const response = await axios.post("http://localhost:8000/main", {
        nickname: nickname,
        socketid: socket.id
      });
      console.log(response.data);
      io.emit("newMember", nickname);
    } catch (err) {
      console.error(err);
      socket.leave();
    }

    console.log(`${nickname} is connected`);
    io.emit("recvChat", `${nickname}:님이 입장하셨습니다.`);

    socket.on("disconnect", async () => {
      console.log(`${nickname} is disconnected`);

      try {
        const response = await axios.delete(
          `http://localhost:8000/main/${nickname}`
        );
        console.log(response.data);
      } catch (err) {
        console.error(err);
        socket.leave();
      }
      //const removeIdx = app.get("memberList").indexOf(nickname);
      //app.get("memberList").splice(removeIdx, 1);

      socket.broadcast.emit("recvChat", `${nickname}:님이 나가셨습니다.`);
      socket.broadcast.emit("exitMember", nickname);
    });

    socket.on("sendChat", data => {
      console.log(`${nickname} : ${data}`);

      io.emit("recvChat", `${nickname} : ${data}`);
    });
  });
};
