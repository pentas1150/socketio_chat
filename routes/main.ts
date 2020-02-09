import { Router } from "express";
import { isNotLoggedIn } from "./middleware";
import { Room } from "../models/Room";
const router = Router();

router.get("/", isNotLoggedIn, async (req, res, next) => {
  const roomList = await Room.findAll();
  return res.render("main", { rooms: roomList });
});

router.post("/", async (req, res, next) => {
  const result = await Room.create({
    title: req.body.title,
    owner: req.session.passport.user
  });

  return res.redirect(`/chat/${result.getDataValue("id")}`);
});

module.exports = router;
