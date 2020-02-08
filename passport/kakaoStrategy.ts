import { Strategy } from "passport-kakao";
import { User } from "../models/User";
import { dbUser } from "../domain/interface";

module.exports = passport => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/login/oauth"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" }
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser: User = new User({
              email: profile._json && profile._json.kaccount_email,
              nickname: profile.displayName,
              snsId: profile.id,
              provider: "kakao"
            });
            await newUser.save();
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
