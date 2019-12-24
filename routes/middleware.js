exports.isNotLoggedIn = (req, res, next) => {
    if (!req.session.nickname) {
        res.redirect("/");
    } else {
        next();
    }
};
