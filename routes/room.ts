import { Router } from "express";
import { Room } from "../models/Room";
import { isNotLoggedIn } from "./middleware";
const router = Router();

router.get("/", isNotLoggedIn, (req, res, next) => {
  return res.render("room_form");
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Room.destroy({ where: { id: req.params.id } });
    return res.send("ok");
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
});

module.exports = router;
