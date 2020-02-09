import { Router } from "express";
import { Room } from "../models/Room";
import { isNotLoggedIn } from "./middleware";
const router = Router();
require("dotenv").config();

router.get("/:id", isNotLoggedIn, async (req, res, next) => {
  const room = await Room.findOne({ where: { id: req.params.id } });
  if (!room) {
    return res.send(
      "<script>alert('존재하지 않는 방입니다.'); window.location.href='/main';</script>"
    );
  }
  return res.render("chat", {
    myId: req.session.passport.user,
    domain: process.env.DOMAIN
  });
});

module.exports = router;
