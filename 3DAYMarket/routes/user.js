const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { User, Item } = require("../models/index.js");

router.post("/regist", async (req, res) => {
  try {
    const tempUser = await User.findOne({ where: { userId: req.body.id } });
    if (tempUser) {
      res.status(500);
      res.send({ message: "아이디가 존재합니다" });
      return;
    }

    const { id, pw, name, local } = req.body;
    await User.create({
      userId: id,
      userPw: Cryptojs.SHA256(pw).toString(),
      name: name,
      userLocal: local,
    });
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const tempUser = await User.findOne({ where: { userId: req.body.id } });
    if (!tempUser) {
      res.status(500);
      res.send({ message: "아이디가 존재하지 않습니다.!" });
      return;
    }
    if (tempUser.userPw == Cryptojs.SHA256(req.body.pw).toString()) {
      res.cookie(
        "carrot",
        jwt.sign(
          {
            id: tempUser.id,
            name: tempUser.name,
          },
          process.env.JWT_KEY,
          {
            algorithm: "HS256",
            issuer: "jjh",
          }
        )
      );
      res.send({
        name: tempUser.name,
      });
      return;
    }
    res.status(500);
    res.send({ message: "비밀번호가 틀렸습니다." });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
});

router.post("/cookie", async (req, res) => {
  const data = req.body;
  const tempUser = jwt.verify(data.cookie.split("=")[1], process.env.JWT_KEY);
  res.send({
    name: tempUser.name,
  });
});
router.post("/userdisplay", async (req, res) => {
  try {
    const tempUser = await User.findOne({ where: { name: req.body.name } });
    res.send(tempUser);
  } catch (err) {
    console.error(err);
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("carrot");
  res.end();
});

router.post("/mypage", async (req, res) => {
  tempName = req.body.name;

  try {
    const userInfo = await User.findOne({ where: { userId: req.body.id } });
    res.send(userInfo);
  } catch (err) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
});

router.put("/update", async (req, res) => {
  const tempName = req.body.editInput;
  const tempLocal = req.body.editInput2;
  const data = req.body;
  const tempUser = jwt.verify(data.cookie.split("=")[1], process.env.JWT_KEY);
  await User.update(
    {
      name: tempName,
      userLocal: tempLocal,
    },
    {
      where: {
        Id: tempUser.id,
      },
    }
  );
  await Item.update(
    {
      seller_id: tempName,
    },
    {
      where: {
        seller_id: tempName,
      },
    }
  );
  const tempNewUser = await User.findOne({ where: (id = tempUser.id) });
  res.cookie(
    "carrot",
    jwt.sign(
      {
        id: tempNewUser.id,
        name: tempNewUser.name,
      },
      process.env.JWT_KEY,
      {
        algorithm: "HS256",
        issuer: "jjh",
      }
    )
  );
  res.send({
    name: tempNewUser.name,
  });
  return;
});

module.exports = router;
