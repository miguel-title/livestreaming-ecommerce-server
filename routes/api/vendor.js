const express = require("express");
const router = express.Router();
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactory.middleware");

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

const blogstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/blogs/");
  },

  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

var uploadblog = multer({ storage: blogstorage });

const VController = require("../../controller/vendor");

router.post("/login", awaitHandlerFactory(VController.login));
router.post("/register", awaitHandlerFactory(VController.register));
router.post("/adminregister", awaitHandlerFactory(VController.adminregister));
router.post("/updateAccount", awaitHandlerFactory(VController.updateAccount));
router.post("/accountInfo", awaitHandlerFactory(VController.getAccountInfo));
//About Blog
router.post("/getBlogs", awaitHandlerFactory(VController.getBlogs));
router.post("/getBlog", awaitHandlerFactory(VController.getBlog));
router.post("/insertBlog", awaitHandlerFactory(VController.insertBlog));
router.post("/updateBlog", awaitHandlerFactory(VController.updateBlog));
router.post("/deleteBlog", awaitHandlerFactory(VController.deleteBlog));

router.post(
  "/upload",
  upload.single("file", 1),
  awaitHandlerFactory(VController.uploadFile)
);

router.post(
  "/uploadBlog",
  uploadblog.single("file", 1),
  awaitHandlerFactory(VController.uploadFile)
);

module.exports = router;
