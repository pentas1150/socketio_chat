import * as express from "express";
import { Router } from "express";
import * as colorHash from "color-hash";
import { Room } from "../models/Room";
import { isNotLoggedIn } from "./middleware";
const router = Router();

router.get("/:id", async (req, res, next) => {
  const room = await Room.findOne({ where: { id: req.params.id } });
  if (!room) {
    return res.send(
      "<script>alert('존재하지 않는 방입니다.'); window.location.href='/main';</script>"
    );
  }
  return res.render("chat", { myId: req.session.passport.user });
});

module.exports = router;
