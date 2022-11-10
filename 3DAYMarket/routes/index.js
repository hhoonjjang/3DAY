const router = require("express").Router();
const user = require("./user.js");
const item = require("./item.js");



router.use("/item",item);
router.use("/user", user);
module.exports = router;

