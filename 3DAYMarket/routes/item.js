const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const multer = require("multer");
const fs = require("fs");
const { User, Item } = require("../models/index.js");

let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploadedItems");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
let upload = multer({ dest: "uploadedItems/" });
let uploadWithOriginalFilename = multer({ storage: storage });

router.use("/", (req, res, next) => {
  if (req.headers.cookie) {
    global.userName = "";
    console.log("hihihi");
    console.log(req.headers.cookie);
    console.log("hihihi");

    try {
      const tempUserInfo = jwt.verify(req.cookies.carrot, process.env.JWT_KEY);
      global.userName = tempUserInfo.name;

      // console.log("hi" + global.userName);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

router.post(
  "/uploadFiles",
  uploadWithOriginalFilename.array("img"),
  async function (req, res) {
    const imgArr = [];
    req.files.forEach((item) => {
      imgArr.push(item.filename);
    });
    const {
      itemTitle,
      itemCategories,
      itemCondition,
      itemTuning,
      itemDealing,
      itemPrice,
      itemSubtitle,
      itemLocal,
      itemBlack,
    } = req.body;
    const tempUser = await User.findOne({
      where: {
        name: global.userName,
      },
    });
    const tempItem = await Item.create({
      imgArr: imgArr.join("-*,"),
      itemTitle: itemTitle,
      itemCategories: itemCategories,
      itemCondition: itemCondition,
      itemTuning: itemTuning,
      itemDealing: itemDealing,
      itemPrice: itemPrice,
      itemSubtitle: itemSubtitle,
      itemLocal: itemLocal,
      itemBlack: itemBlack,
    });
    tempUser.addItem(tempItem);
    res.send({ file: null, files: req.files });
  }
);

router.get("/", async (req, res) => {
  mode = req.query.mode;
  console.log(mode);
  const tempItem = await Item.findAll({
    where: {
      itemBlack: mode,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send(tempItem);
});

router.post("/used", async (req, res) => {
  const mode = req.body.mode;
  const tempItem = await Item.findAll({
    where: {
      itemBlack: mode,
      itemCondition: "중고상품",
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send(tempItem);
});

router.post("/new", async (req, res) => {
  const mode = req.body.mode;
  const tempItem = await Item.findAll({
    where: {
      itemBlack: mode,
      itemCondition: "새상품",
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send(tempItem);
});

router.get("/selectkind", async (req, res) => {
  const kind = req.query.kind;
  const mode = req.query.mode;
  const tempItem = await Item.findAll({
    where: {
      itemCategories: kind,
      itemBlack: mode,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send({ tempItem });
});

router.get("/selectlocal", async (req, res) => {
  const local = req.query.local;
  const mode = req.query.mode;
  const tempItem = await Item.findAll({
    where: {
      itemLocal: local,
      itemBlack: mode,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send({ tempItem });
});

router.get("/selecttrade", async (req, res) => {
  const trade = req.query.trade;
  const mode = req.query.mode;
  const tempItem = await Item.findAll({
    where: {
      itemDealing: trade,
      itemBlack: mode,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send({ tempItem });
});

router.post("/selectall", async (req, res) => {
  const kind = req.body.kind;
  const local = req.body.local;
  const trade = req.body.trade;
  const mode = req.body.mode;
  const tempItem = await Item.findAll({
    where: {
      itemDealing: trade,
      itemLocal: local,
      itemBlack: mode,
      itemCategories: kind,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send(tempItem);
});

router.post("/selectkindlocal", async (req, res) => {
  const kind = req.body.kind;
  const mode = req.body.mode;
  const local = req.body.local;
  const tempItem = await Item.findAll({
    where: {
      itemLocal: local,
      itemBlack: mode,
      itemCategories: kind,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send(tempItem);
});

router.post("/selectkindtrade", async (req, res) => {
  const kind = req.body.kind;
  const mode = req.body.mode;
  const trade = req.body.trade;
  const tempItem = await Item.findAll({
    where: {
      itemDealing: trade,
      itemBlack: mode,
      itemCategories: kind,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send(tempItem);
});

router.post("/selectlocaltrade", async (req, res) => {
  const local = req.body.local;
  const trade = req.body.trade;
  const mode = req.body.mode;
  const tempItem = await Item.findAll({
    where: {
      itemLocal: local,
      itemDealing: trade,
      itemBlack: mode,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send(tempItem);
});

router.get("/detail", async (req, res) => {
  const itemIndex = req.query.itemIndex;
  const tempItem = await Item.findOne({
    where: {
      id: itemIndex,
    },
  });
  res.send({ tempItem });
});

router.delete("/delete", async (req, res) => {
  itemIndex = req.query.itemIndex;
  const tempItem = await Item.findOne({
    where: {
      id: itemIndex,
    },
  });
  if (global.userName === tempItem.seller_id) {
    await Item.destroy({
      where: {
        id: itemIndex,
      },
    });
  } else {
    res.send("작성자가아닙니다.");
  }
  res.send("정상적으로 삭제했습니다.");
});

router.post("/mypageitem", async (req, res) => {
  const name = jwt.verify(req.cookies.carrot, process.env.JWT_KEY).name;
  const mode = req.body.mode;
  const tempItem = await Item.findAll({
    where: {
      itemBlack: mode,
      seller_id: name,
    },

    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send({ tempItem });
});

router.post("/searchItem", async (req, res) => {
  const searchItemTitle = req.body.itemTitle;
  const mode = req.body.mode;
  const tempItem = await Item.findAll({
    where: {
      itemBlack: mode,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  res.send({ tempItem });
});

router.post("/filterItem", async (req, res) => {
  res.send(req.body.list);
});

module.exports = router;
