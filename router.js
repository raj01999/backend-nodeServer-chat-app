const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res
    .send(
      `<h1 style="text-align: center; font-size: 5rem; margin-top: 5rem;"><a href="https://raj01999.github.io/-nodeServer-chat-app/">Click Me</a></h1>`
    )
    .status(200);
});

router.get("/favicon.ico", (req, res) => {
  res
    .send(
      `<h1 style="text-align: center; font-size: 5rem; margin-top: 5rem;"><a href="https://raj01999.github.io/-nodeServer-chat-app/">Click Me</a></h1>`
    )
    .status(200);
});

module.exports = router;
