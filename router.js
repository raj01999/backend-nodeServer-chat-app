const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<h1>Server is Running... Sarafraj Mallick</h1>`).status(200);
});

router.get("/favicon.ico", (req, res) => {
  res.send(`<h1>Server is Running... Sarafraj Mallick</h1>`).status(200);
});

module.exports = router;
