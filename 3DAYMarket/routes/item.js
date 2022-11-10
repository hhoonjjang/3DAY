const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const multer = require("multer");

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
  global.userName = "";
  try {
    const tempUserInfo = jwt.verify(req.cookies.carrot, process.env.JWT_KEY);
    global.userName = tempUserInfo.name;
    console.log("hi" + global.userName);
    next();
  } catch (err) {
    console.error(err);
  }
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
    console.log("에드" + req.files);
    res.end();
  } catch (err) {
    console.log(err);
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
    console.log("멀터");
    console.log("멀터바디", req.body);
    // const {itemTitle,itemCategories,itemCondition,itemTuning,itemDealing,itemPrice,itemSubtitle} =req.body;
    console.log(req.files);
    console.log(req.files[0].filename);
    const imgArr = [];

    req.files.forEach((item) => {
      imgArr.push(item.filename);
    });
    console.log(global.userName);

    console.log(imgArr.join("-*,"));
    const {
      itemTitle,
      itemCategories,
      itemCondition,
      itemTuning,
      itemDealing,
      itemPrice,
      itemSubtitle,
    } = req.body;
    const tempUser = await User.findOne({
      where: {
        name: global.userName,
      },
    });
    console.log(tempUser);
    const tempItem = await Item.create({
      imgArr: imgArr.join("-*,"),
      itemTitle: itemTitle,
      itemCategories: itemCategories,
      itemCondition: itemCondition,
      itemTuning: itemTuning,
      itemDealing: itemDealing,
      itemPrice: itemPrice,
      itemSubtitle: itemSubtitle,
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
  const tempItem = await Item.findAll({
    order: [["id", "DESC"]],
    include: { model: User },
  });
  console.log("get");
  console.log(tempItem);
  console.log("get");
  res.send(tempItem);
});

module.exports = router;
