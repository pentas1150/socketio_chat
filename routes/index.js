const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("main", { memberLists: req.app.get("memberList") });
});

module.exports = router;
