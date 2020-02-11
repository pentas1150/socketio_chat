import { Router } from "express";
import { isLoggedIn } from "./middleware";
import * as path from "path";
import * as fs from "fs";
import * as multer from "multer";
import { Message } from "../domain/interface";
const router = Router();
require("dotenv").config();

fs.readdir("public/images", error => {
  if (error) {
    console.error("public/images 폴더 생성");
    fs.mkdirSync("public/images");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/images/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post("/img/:roomId", upload.single("img"), (req, res, next) => {
  const io = req.app.get("io");
  const chatMessage: Message = {
    id: req.session.passport.user,
    type: "img",
    color: req.session.color,
    msg: req.file.filename
  };

  io.of("/chat")
    .to(req.params.roomId)
    .emit("recvChat", JSON.stringify(chatMessage));

  return res.send("ok");
});

module.exports = router;
