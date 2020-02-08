import { User } from "../models/User";
const kakao = require("./kakaoStrategy");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.nickname);
  });

  passport.deserializeUser(async (_nickname, done) => {
    try {
      const user = await User.findOne({ where: { nickname: _nickname } });
      if (user) done(null, user);
    } catch (err) {
      done(err);
    }
  });

  kakao(passport);
};
