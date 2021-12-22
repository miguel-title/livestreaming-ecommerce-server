// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var path = require("path");

// import middleware
const HttpException = require("./utils/HttpException.utils");
//import error middleware
const errorMiddleware = require("./middleware/errorMiddleware");

// import Custom Router
const vendorRouter = require("./routes/api/vendor");

const app = express();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err, "error"));

//Use Routes
app.use("/vendor", vendorRouter);
app.use(express.static(path.join(__dirname, "uploads/avatars")));

app.all("*", (req, res, next) => {
  const error = new HttpException(404, "Endpoint Not Found.");
  next(error);
});

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/***********************************Export*******************************************/
module.exports = app;
