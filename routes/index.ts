import * as express from "express";
import { Router } from "express";
import * as colorHash from "color-hash";
import { isNotLoggedIn } from "./middleware";
const router = Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  req.session.nickname = req.body.nickname;
  req.session.color = new colorHash().hex(req.sessionID!);

  res.redirect("/main");
});

router.get("/main", isNotLoggedIn, (req, res, next) => {
  return res.render("main", { rooms: req.app.get("roomList") });
});

router.post("/main", (req, res, next) => {
  const idx = req.app.get("roomNum");
  req.app.set("roomNum", idx + 1);

  const newRoom = {
    id: idx,
    title: req.body.title,
    author: req.session.nickname,
    createdAt: Date.now()
  };
  req.app.get("roomList").push(newRoom);

  return res.redirect(`/chat/${idx}`);
});

router.get("/room", (req, res, next) => {
  return res.render("room_form");
});

router.get("/chat/:id", (req, res, next) => {
  return res.render("chat", { myId: req.session.nickname });
});

module.exports = router;
