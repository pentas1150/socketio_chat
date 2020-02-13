import { Router } from "express";
import { Room } from "../models/Room";
import { isNotLoggedIn } from "./middleware";
import { insertUser, deleteUser, parseUsers } from "../src/updateUsers";
const router = Router();
require("dotenv").config();

router.get("/", isNotLoggedIn, (req, res, next) => {
  return res.render("room_form");
});

router.post("/", async (req, res, next) => {
  const result = await Room.create({
    title: req.body.title,
    owner: req.session.passport.user
  });

  return res.redirect(`/chat/${result.getDataValue("id")}`);
});

router.get("/:roomId", isNotLoggedIn, async (req, res, next) => {
  const io = req.app.get("io");
  const room: Room = await Room.findOne({ where: { id: req.params.roomId } });
  const users: string = room.userList;

  if (!room) {
    return res.send(
      "<script>alert('존재하지 않는 방입니다.'); window.location.href='/main';</script>"
    );
  }

  const curUser: string = await insertUser(
    room.id,
    room.userList,
    req.user.snsId
  );

  const newUsers = await parseUsers(curUser);
  if (users !== null) {
    io.of("/chat")
      .to(req.params.id)
      .emit("newMember", JSON.stringify({ list: newUsers }));
  }

  req.session.passport.snsId = req.user.snsId;

  return res.render("chat", {
    myId: req.session.passport.user,
    domain: process.env.DOMAIN,
    userList: newUsers
  });
});

router.delete("/:roomId", async (req, res, next) => {
  try {
    await Room.destroy({ where: { id: req.params.roomId } });
    return res.send("ok");
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
});

router.post("/:roomId", async (req, res, next) => {
  const io = req.app.get("io");
  const snsId: string = req.body.snsId;
  const room: Room = await Room.findOne({ where: { id: req.params.roomId } });
  let users: string = room.userList;

  if (!room) {
    return res.send("ok");
  }

  const userList: string = await deleteUser(
    Number(req.params.roomId),
    users,
    snsId
  );

  const newUsers = await parseUsers(userList);
  io.of("/chat")
    .to(req.params.id)
    .emit("newMember", JSON.stringify({ list: newUsers }));

  return res.send("ok");
});

module.exports = router;
