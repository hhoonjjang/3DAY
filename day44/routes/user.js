// const Cryptojs = require("crypto-js");
// const router = require("express").Router();
// const { User } = require("../models/user.js");
// router.post("/regist", async (req, res) => {
//   try {
//     const tempUser = await User.findOne({ where: { userId: req.body.id } });
//     if (tempUser) {
//       res.status(500);
//       res.send({ message: "exist ID" });
//       return;
//     }

//     const { id, pw, name, className } = req.body;
//     await User.create({
//       userId: id,
//       userPw: Cryptojs.SHA256(pw).toString(),
//       name,
//       class: className,
//     });
//     res.end();
//   } catch (error) {
//     res.status(500);
//     res.send(error);
//   }
// });
