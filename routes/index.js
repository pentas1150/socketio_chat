const express = require("express");
const router = express.Router();
const { isNotLoggedIn } = require("./middleware");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("login");
});

router.post("/login", (req, res, next) => {
    console.log(`${req.body.nickname} is request`);
    req.session.nickname = req.body.nickname;

    res.redirect("/main");
});

router.get("/main", isNotLoggedIn, (req, res, next) => {
    console.log(`${req.session.nickname} is entered`);
    res.render("main");
});

module.exports = router;
