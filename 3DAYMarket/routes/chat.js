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
