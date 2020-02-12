import { Router } from "express";
import { User } from "../models/User";
import { Room } from "../models/Room";
import { isNotLoggedIn } from "./middleware";
const router = Router();
require("dotenv").config();

const parseUsers = async (users: string): Promise<Array<string>> => {
  let resUsers: Array<string> = [];
  const curUsers: Array<string> = users.split(",");
  curUsers.pop();

  for (let i = 0; i < curUsers.length; ++i) {
    const user = await User.findOne({ where: { snsId: curUsers[i] } });
    resUsers.push(user.nickname);
  }

  return resUsers;
};

router.get("/:id", isNotLoggedIn, async (req, res, next) => {
  const io = req.app.get("io");
  let users: string;
  let _users: string;
  let curUsers: Array<string>;
  const room = await Room.findOne({ where: { id: req.params.id } });

  if (!room) {
    return res.send(
      "<script>alert('존재하지 않는 방입니다.'); window.location.href='/main';</script>"
    );
  }

  users = room.userList;
  _users = room.userList;
  if (users === null) {
    users = `${req.user.snsId},`;
  } else {
    users += `${req.user.snsId},`;
  }

  await Room.update({ userList: users }, { where: { id: room.id } });

  curUsers = await parseUsers(users);

  if (_users !== null) {
    io.of("/chat")
      .to(req.params.id)
      .emit("newMemeber", JSON.stringify({ list: curUsers }));
  }

  return res.render("chat", {
    myId: req.session.passport.user,
    domain: process.env.DOMAIN,
    userList: curUsers
  });
});

module.exports = router;
