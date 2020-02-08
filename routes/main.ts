import * as express from "express";
import { Router } from "express";
import * as colorHash from "color-hash";
import { isNotLoggedIn } from "./middleware";
import { Room } from "../models/Room";
const router = Router();

router.get("/", async (req, res, next) => {
  const roomList = await Room.findAll();
  return res.render("main", { rooms: roomList });
});

router.post("/", async (req, res, next) => {
  const result = await Room.create({
    title: req.body.title,
    owner: req.session.passport.user
  });

  return res.redirect(`/chat/${result.dataValues.id}`);
});

module.exports = router;
