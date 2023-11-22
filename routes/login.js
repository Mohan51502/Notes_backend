const express = require("express");
const { AuthenticateUser } = require("../controllers/login");
//const client = require("../redis");
const router = express.Router();

// client.connect()
// .then(() =>{
//     console.log("Redis Connected");
// })
// .catch((error) =>{
//     console.log(error);
// })


router.post("/",async(req,res) =>{
    const {email,password} = await req.body;
const logincredientials=await AuthenticateUser(email,password);
console.log(logincredientials);
if(logincredientials === "Invalid Username or Password" ){
res.status(200).send("Invalid Username or Password");
} else if(logincredientials === "Server Busy"){
    res.status(200).send("Server Busy");

} else{
    res.status(200).json({token:logincredientials.token})
}
})

module.exports = router;