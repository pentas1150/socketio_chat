import * as createError from "http-errors";
import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as session from "express-session";
import * as passport from "passport";
import * as colorHash from "color-hash";
import * as cors from "cors";
import sequelize from "./sequelize";
import webSocket from "./websocket";

require("dotenv").config();

const app = express();
sequelize.sync();
require("./passport")(passport);

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE,
  cookie: {
    httpOnly: true,
    secure: false
  }
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (!req.session.color) {
    req.session.color = new colorHash().hex(req.sessionID);
  }
  next();
});
app.use(cors());

app.use("/", require("./routes/index"));
app.use("/main", require("./routes/main"));
app.use("/login", require("./routes/login"));
app.use("/room", require("./routes/room"));
app.use("/chat", require("./routes/chat"));
app.use("/upload", require("./routes/upload"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(app.get("port"), () => {
  console.log(`server is running on ${app.get("port")}`);
});

webSocket(server, app, sessionMiddleware);

module.exports = app;
