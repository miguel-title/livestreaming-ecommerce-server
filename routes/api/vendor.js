const express = require("express");
const router = express.Router();
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");
const User = require("../../controller/vendor");

const passport = require("passport");

const VController = require("../../controller/vendor");

router.post("/login", awaitHandlerFactory(VController.login));

router.post("/register", awaitHandlerFactory(VController.register));

router.post("/updateAccount", awaitHandlerFactory(VController.updateAccount));

router.post("/accountInfo", awaitHandlerFactory(VController.getAccountInfo));

module.exports = router;
