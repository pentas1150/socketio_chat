import * as express from "express";
import { Router } from "express";
import * as colorHash from "color-hash";
import { Room } from "../models/Room";
import { isNotLoggedIn } from "./middleware";
const router = Router();

router.get("/", (req, res, next) => {
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
