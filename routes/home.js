const express = require("express");
const { AuthorizeUser } = require("../controllers/login");
const router = express.Router();


router.get("/",async(req,res) =>{ 
  try {
    const auth_token =  await req.headers.authorization
    const logincredientials = await  AuthorizeUser(auth_token);
    if(logincredientials === false){
        res.status(200).send("Invalid Token");
    } else{
      console.log(logincredientials);

        res.json(logincredientials);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy")
    
  }

})

module.exports = router;