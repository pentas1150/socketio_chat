import { Router } from "express";
import { Room } from "../models/Room";
import { isNotLoggedIn } from "./middleware";
const router = Router();

router.get("/", isNotLoggedIn, (req, res, next) => {
  return res.render("room_form");
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

router.delete("/:roomId/:snsId", async (req, res, next) => {});

module.exports = router;
