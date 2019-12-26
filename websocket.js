const SocketIO = require("socket.io");
const sharedSession = require("express-socket.io-session");

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server, { path: "/socket.io" });
    let usrCount = 0;

    app.set("io", io);

    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.on("connection", socket => {
        socket.request.session.nickname = `user${usrCount++}`;
        const nickname = socket.request.session.nickname;

        app.get("memberList").push(nickname);
        io.emit("newMember", nickname);

        console.log(`${nickname} is connected`);
        io.emit("recvChat", `${nickname}님이 입장하셨습니다.`);

        socket.on("disconnect", () => {
            console.log(`${nickname} is disconnected`);
            const removeIdx = app.get("memberList").indexOf(nickname);
            app.get("memberList").splice(removeIdx, 1);

            socket.broadcast.emit("recvChat", `${nickname}님이 나가셨습니다.`);
            socket.broadcast.emit("exitMember", nickname);
        });

        socket.on("sendChat", data => {
            console.log(`${nickname} : ${data}`);

            io.emit("recvChat", `${nickname} : ${data}`);
        });
    });
};
