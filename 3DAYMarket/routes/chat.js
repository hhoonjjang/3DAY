const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { Chat, Item } = require("../models/index.js");
router.post("/", async (req, res, next) => {
  try {
    const tempItemInfo = req.body;
    const tempUserName = jwt.verify(
      req.cookies.carrot,
      process.env.JWT_KEY
    ).name;
    const tempChat = await Chat.create({
      userId: tempUserName,
      text: `제목:${tempItemInfo.itemTitle} 게시글을 통해 입장했어요`,
      partnerId: tempItemInfo.seller_id,
      time: "",
    });
    res.send(tempItemInfo);
  } catch (err) {
    console.error(err);
  }
});

router.post("/sendinfo", async (req, res) => {
  try {
    res.send({
      name: req.body.me,
      patner: req.body.partner,
      tempTure: req.body.tempTure,
    });
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
