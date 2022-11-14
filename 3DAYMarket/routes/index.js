const router = require("express").Router();
const user = require("./user.js");
const item = require("./item.js");
const chat = require("./chat.js");
const search = require("./search.js");

router.use("/item", item);

router.use("/user", user);
router.use("/chat", chat);
router.use("/search", search);

module.exports = router;
