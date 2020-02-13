import * as express from "express";
import { Router } from "express";
import * as colorHash from "color-hash";
import * as passport from "passport";
import { isNotLoggedIn } from "./middleware";
const router = Router();

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/oauth/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/"
  }),
  (req, res) => {
    res.redirect("/main");
  }
);

module.exports = router;
