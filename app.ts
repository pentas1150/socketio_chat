import * as createError from "http-errors";
import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as session from "express-session";
require("dotenv").config();
const webSocket = require("./websocket");

const app = express();

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE,
  cookie: {
    httpOnly: true,
    secure: false
  }
});

let roomNum = 0;
let roomList = [];

app.set("roomList", roomList);
app.set("roomNum", roomNum);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE));
app.use(sessionMiddleware);

app.use("/", require("./routes/index"));

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
