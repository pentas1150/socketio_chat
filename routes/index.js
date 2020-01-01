const express = require("express");
const router = express.Router();
const User = require("../models").User;
const { isNotLoggedIn } = require("./middleware");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  req.session.nickname = req.body.nickname;
  res.redirect("/main");
});

router.get("/main", isNotLoggedIn, async (req, res, next) => {
  try {
    const memberList = await User.findAll({ attributes: ["nickname"] });
    return res.render("main", { memberLists: memberList });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post("/main", async (req, res, next) => {
  try {
    const result = await User.create({
      nickname: req.body.nickname,
      socketid: req.body.socketid
    });
    return res.send(result);
  } catch (err) {
    console.error(err);
    res.send(err);
    return next(err);
  }
});

router.delete("/main/:nickname", async (req, res, next) => {
  try {
    await User.destroy({ where: { nickname: req.params.nickname } });
    return res.send("ok");
  } catch (err) {
    console.error(err);
    res.send(err);
    return next(err);
  }
});

module.exports = router;
