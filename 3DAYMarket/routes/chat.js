const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
});

router.post("/sendinfo", async (req, res) => {
  try {
    const tempName = req.query.name;
    console.log(tempName);
    res.send({ name: tempName });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
