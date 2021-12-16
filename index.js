// server/index.js

const express = require("express");

const PORT = process.env.PORT || 4000;

const app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.get("/api", (req, res) => {
  res.json({ message: "Hello22 from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
