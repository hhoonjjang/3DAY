const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { Chat, Item } = require("../models/index.js");
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    res.send(req.body);
  } catch (err) {
    console.log(err);
  }
});

router.post("/sendinfo", async (req, res) => {
  try {
    console.log(req.body.tempTure);
    console.log(req.body.me);
    console.log(req.body.partner);
    console.log(req.body);
    res.send({
      name: req.body.me,
      patner: req.body.partner,
      tempTure: req.body.tempTure,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
