const express = require("express");
const router = express.Router();
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");
const User = require("../../controller/vendor");

const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
var path = require("path");

var multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars/");
  },

  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

const VController = require("../../controller/vendor");

router.post("/login", awaitHandlerFactory(VController.login));
router.post("/register", awaitHandlerFactory(VController.register));
router.post("/updateAccount", awaitHandlerFactory(VController.updateAccount));
router.post("/accountInfo", awaitHandlerFactory(VController.getAccountInfo));
router.post(
  "/upload",
  upload.single("file", 1),
  awaitHandlerFactory(VController.uploadFile)
);

module.exports = router;
