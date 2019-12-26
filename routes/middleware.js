exports.isNotLoggedIn = (req, res, next) => {
    if (typeof req.session.nickname === "undefined") {
        res.redirect("/");
    } else {
        next();
    }
};
