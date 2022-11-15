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

router.post("/add", async (req, res) => {
  try {
    //   const tempUser = await User.findOne({
    //     where:{
    //         name: global.name
    //     },
    //   });
    //   const {itemTitle,itemCategories,itemCondition,itemTuning,itemDealing,itemPrice,itemSubtitle} =req.body;
    //   await Item.create({
    //     files:req.files,
    //     itemTitle:itemTitle,
    //     itemCategories :itemCategories,
    //     itemCondition :itemCondition,
    //     itemTuning : itemTuning,
    //     itemDealing : itemDealing,
    //     itemPrice :itemPrice,
    //     itemSubtitle :itemSubtitle
    //   })
    //   console.log("hi"+req.body);
    // console.log("에드" + req.files);
    res.end();
  } catch (err) {
    // console.log(err);
  }
});
//

// router.patch("/assoicate", async (req, res) => {
//   const { body } = req;
//   console.log("어소시에이트");

//   console.log(body);
//   console.log(body.id);

//   console.log("어소시에이트");

//   if (body.id) {
//     const tempUser = await User.findOne({
//       where: { seller_id: body.id },
//     });

//     const tempItem = await Item.findOne({ where: { id: body.id } });
//     tempUser.addItem(tempItem);
//     res.send({ name: "patch", body, tempUser });
//   } else {
//     const tempUser = await Item.findOne({ where: { id: body.id } });
//     const tempItem = await Item.findOne({ where: { id: body.seller_id } });
//     tempUser.addItem(tempItem);
//     tempItem.addItem(tempUser);
//     res.send({ name: "patch", body, tempUser });
//   }
// });

router.post(
  "/uploadFiles",
  uploadWithOriginalFilename.array("img"),
  async function (req, res) {
    // console.log("멀터");
    // console.log("멀터바디", req.body);
    // const {itemTitle,itemCategories,itemCondition,itemTuning,itemDealing,itemPrice,itemSubtitle} =req.body;
    // console.log(req.files);
    // console.log(req.files[0].filename);
    const imgArr = [];

    req.files.forEach((item) => {
      imgArr.push(item.filename);
    });
    // console.log(global.userName);

    // console.log(imgArr.join("-*,"));
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
    // console.log(tempUser);
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
    // await Item.findOne({ where: { id: req.body.id } });
    tempUser.addItem(tempItem);

    // const tempItem = await Item.findOne({ where: { id: req.body.id } });
    // console.log("hi");
    // console.log(tempItem);
    // console.log("hi");

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

  // tempItem.forEach((item) => {
  //   console.log(item.dataValues.imgArr.split("-*,")[0].split(".")[1]);
  //   const filename = `./uploadedItems/${
  //     item.dataValues.imgArr.split("-*,")[0]
  //   }`;
  //   fs.readFile(filename, (err, data) => {
  //     res.writeHead(200, {
  //       "Context-Type": `image/${
  //         item.dataValues.imgArr.split("-*,")[0]
  //       }.split(".")[1];
  //       charset=UTF-8`,
  //     });

  //     res.write(data);
  //     res.end;
  //   });

  // console.log(tempItem.imgArr.split("-*,")[0]);
  res.send(tempItem);
});

router.post("/used", async (req, res) => {
  const mode = req.body.mode;
  console.log("유즈드");
  console.log(mode);
  console.log("유즈드");
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
  console.log(mode);
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
  console.log("셀렉트카인드");
  // console.log(kind);
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

  console.log(local);
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
  console.log(trade);
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
  console.log("셀렉트올");
  console.log(kind, local, trade);
  console.log("셀렉트올");
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
  console.log(tempItem);
  res.send(tempItem);
});

router.post("/selectkindlocal", async (req, res) => {
  const kind = req.body.kind;
  const mode = req.body.mode;
  const local = req.body.local;
  console.log(kind);
  console.log(local);
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
  console.log(kind);
  console.log(trade);

  const tempItem = await Item.findAll({
    where: {
      itemDealing: trade,
      itemBlack: mode,
      itemCategories: kind,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  console.log(tempItem);
  res.send(tempItem);
});

router.post("/selectlocaltrade", async (req, res) => {
  const local = req.body.local;
  const trade = req.body.trade;
  const mode = req.body.mode;
  console.log(local);
  console.log(trade);

  const tempItem = await Item.findAll({
    where: {
      itemLocal: local,
      itemDealing: trade,
      itemBlack: mode,
    },
    order: [["id", "DESC"]],
    include: { model: User },
  });
  console.log(tempItem);
  res.send(tempItem);
});

router.get("/detail", async (req, res) => {
  const itemIndex = req.query.itemIndex;
  console.log("detail");
  console.log(itemIndex);
  const tempItem = await Item.findOne({
    where: {
      id: itemIndex,
    },
  });
  res.send({ tempItem });
  // const tempItem = await Item.findOne;
});

router.delete("/delete", async (req, res) => {
  console.log(req.query.id);
  itemIndex = req.query.itemIndex;
  console.log(itemIndex);
  const tempItem = await Item.findOne({
    where: {
      id: itemIndex,
    },
  });
  console.log(global.userName);
  console.log(tempItem.seller_id);
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
  console.log(name);
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
  console.log(req.body.list);
  // for (let i = 0; i < req.body.list.length; i++) {
  //   const filterItemtitle = req.body.itemTitle;
  //   tempItem = await Item.findAll({
  //     where: {
  //       itemTitle: filterItemtitle,
  //     },
  //     order: [["id", "DESC"]],
  //     include: { model: User },
  //   });
  // }

  res.send(req.body.list);
});

module.exports = router;
