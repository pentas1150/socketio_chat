import * as express from "express";
import { Router } from "express";
import * as colorHash from "color-hash";
import { isLoggedIn, isNotLoggedIn } from "./middleware";
const router = Router();

router.get("/", (req, res, next) => {
  res.render("login-copy");
});

module.exports = router;
