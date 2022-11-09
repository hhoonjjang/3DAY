
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const {User,Item} = require("../models/index.js")


// router.use("/",(req,res,next)=>{
//     global.userName= "";
//     try{
//         const tempUserInfo =jwt.verify(req.cookies.carrot,process.env.JWT_KEY);
//         global.userName = tempUserInfo.name;
//         console.log("hi"+global.userName);
//         next();
//     }catch(err){
//         console.error(err);
//     }
// })



router.post("/add",async (req,res)=>{
    try{
    //   const tempUser = await User.findOne({
    //     where:{
    //         name: global.name  
    //     },
    //   });
      const {itemTitle,itemCategories,itemCondition,itemTuning,itemDealing,itemPrice,itemSubtitle} =req.body;
      await Item.create({
        itemTitle:itemTitle,
        itemCategories :itemCategories,
        itemCondition :itemCondition,
        itemTuning : itemTuning,
        itemDealing : itemDealing,
        itemPrice :itemPrice,
        itemSubtitle :itemSubtitle
      })
    //   console.log("hi"+req.body);
      res.end();
    }catch(err){
        console.log(err);
    }
})

module.exports = router;
