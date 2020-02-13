import { Router } from "express";
import { isNotLoggedIn } from "./middleware";
import { Room } from "../models/Room";
const router = Router();

router.get("/", isNotLoggedIn, async (req, res, next) => {
  const roomList = await Room.findAll();
  return res.render("main", { rooms: roomList });
});

module.exports = router;
