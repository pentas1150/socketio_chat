const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/main");
  } else {
    next();
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
};

export { isLoggedIn, isNotLoggedIn };
