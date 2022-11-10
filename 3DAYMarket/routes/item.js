
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const multer = require("multer");

const {User,Item} = require("../models/index.js")

let storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploadedItems')
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}__${file.originalname}`);
    },
});
let upload = multer({dest:'uploadedItems/'})
let uploadWithOriginalFilename = multer({storage:storage});

router.get("",function(req,res){
    console.log("겟하이");
});




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
        files:req.files,
        itemTitle:itemTitle,
        itemCategories :itemCategories,
        itemCondition :itemCondition,
        itemTuning : itemTuning,
        itemDealing : itemDealing,
        itemPrice :itemPrice,
        itemSubtitle :itemSubtitle
      })
    //   console.log("hi"+req.body);
    console.log("에드"+req.files);
      res.end();
    }catch(err){
        console.log(err);
    }
})


router.post('/uploadFiles',uploadWithOriginalFilename.array('img'),function(req,res){
    console.log("멀터");
    // console.log("멀터바디"+req.body);
    console.log(req.files);
  


    res.send({file:null, files:req.files})


})


module.exports = router;
