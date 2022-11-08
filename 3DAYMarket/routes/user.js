
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { User } = require("../models/index.js");

router.post("/regist", async (req, res) => {
  console.log(req.body);
    try {
      const tempUser = await User.findOne({ where: { userId: req.body.id } });
      if (tempUser) {
        res.status(500);
        res.send({ message: "exist ID" });
        return;
      }
  
      const { id, pw, name} = req.body;
      await User.create({
        userId: id,
        userPw: Cryptojs.SHA256(pw).toString(),
        name,
        
      });
      res.end();
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });

  router.post("/login", async (req,res)=>{
    try{
        const tempUser = await User.findOne({where:{userId:req.body.id}});
        if(!tempUser){
            res.status(500);
            res.send({message:"no ID"});
            return;
        }
        if (tempUser.userPw == Cryptojs.SHA256(req.body.pw).toString()){
            res.cookie("carrot", jwt.sign({
                id:tempUser.id,
                name:tempUser.name},
            process.env.JWT_KEY,{
                algorithm:"HS256",
                // expiresIn:"30m",ss
                issuer:"jjh",
            }
            )
            );
            res.send({
                name:tempUser.name,
            });
            return;
               
                
            }
            res.status(500);
            res.send({message:"wrongpassword"});
        }catch(error){
          console.log("hi")
            res.status(500);
            res.send(error);
        }
       
        
    });
   
  
  router.post("/cookie",async(req,res)=>{
    console.log("hi"+req.cookies.carrot)
    const data = req.body;
    // jwt.verify(cookie.split("=")[1],process.env.JWT_KEY)
    console.log(jwt.verify(data.cookie.split("=")[1],process.env.JWT_KEY));
    const tempUser = jwt.verify(data.cookie.split("=")[1],process.env.JWT_KEY)
    res.send({
        name:tempUser.name,
    })
  })

  router.post("/logout",(req,res)=>{
    res.clearCookie("carrot");
    res.end();

  })

  module.exports = router;



