const express = require("express");
const router = express.Router();
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");

const passport = require("passport");

const VController = require("../../controller/vendor");

router.post("/login", awaitHandlerFactory(VController.login));

router.post("/register", awaitHandlerFactory(VController.register));

module.exports = router;
