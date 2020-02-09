import { Router } from "express";
import { isLoggedIn } from "./middleware";
const router = Router();

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("login-copy");
});

module.exports = router;
