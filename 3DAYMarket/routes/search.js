const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { Chat, Item } = require("../models/index.js");
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("셀러1");
    const tempItemInfo = req.body;
    const tempUserName = jwt.verify(
      req.cookies.carrot,
      process.env.JWT_KEY
    ).name;
    console.log(tempItemInfo); //해당아이템정보
    console.log(tempUserName); //구매자이름
    console.log("셀러2");
    const tempChat = await Chat.create({
      userId: tempUserName,
      text: `제목:${tempItemInfo.itemTitle} 게시글을 통해 입장했어요`,
      partnerId: tempItemInfo.seller_id,
      time: "",
    });
    res.send(tempItemInfo);
  } catch (err) {
    console.log(err);
  }
});

router.post("/sendinfo", async (req, res) => {
  try {
    console.log(req.body.tempTure);
    console.log(req.body.me);
    console.log(req.body.partner);
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
