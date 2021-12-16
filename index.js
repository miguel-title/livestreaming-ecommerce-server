// server/index.js

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.options("*", cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello2 from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
