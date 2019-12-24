const SocketIO = require("socket.io");

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server, { path: "/socket.io" });

    app.set("io", io);

    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.on("connection", socket => {
        const req = socket.request;
        const nickname = req.session.nickname;

        app.get("memberList").push(nickname);
        io.emit("newMember", app.get("memberList"));

        console.log(`${nickname} is connected`);
        io.emit("recvChat", `${nickname}님이 입장하셨습니다.`);

        socket.on("disconnect", () => {
            console.log(`${nickname} is disconnected`);
            const removeIdx = app.get("memberList").indexOf(nickname);
            app.get("memberList").splice(removeIdx, 1);

            io.emit("newMember", app.get("memberList"));
            io.emit("recvChat", `${nickname}님이 나가셨습니다.`);
        });

        socket.on("sendChat", data => {
            console.log(`${nickname} : ${data}`);

            io.emit("recvChat", `${nickname} : ${data}`);
        });
    });
};
