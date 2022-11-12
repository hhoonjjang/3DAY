const router = require("express").Router();
const user = require("./user.js");
const item = require("./item.js");
const chat = require("./chat.js");





router.use("/item",item);

router.use("/user", user);
router.use("/chat", chat);

module.exports = router;
