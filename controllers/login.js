const User = require("../models/User");
const bcrypt = require("bcrypt");
const  jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
const client = require("../redis");
const { json } = require("express");
dotenv.config();



async function CheckUser(email){
    try {
        const user =await User.findOne({email :email});
        if(user){
            return true;
        } 
            return false;
        
        
    } catch (error) {
        console.log(error);
        return "Server Busy"
        
    }
}


async function AuthenticateUser(email,password){
    try {
        const userCheck = await User.findOne({email:email});
        console.log("Usercheck",userCheck);
        console.log(password);
        const validpassword = await bcrypt.compare(password,userCheck.password)
        console.log("Validpassword",validpassword);
        if(validpassword){
            const token = jwt.sign({email},process.env.login_secret_key)
            const response = {
                id : userCheck._id,
                name : userCheck.name,
                email: userCheck.email,
                token:token,
                status :true
            }
            await client.set(`key-${email}`,JSON.stringify(response))
            await User.findOneAndUpdate({email:userCheck.email},{$set:{token:token}},{new:true})
            return response;
        } 
        return "Invalid Username or Password"
        
    } catch (error) {
        console.log(error);
        return "Server Busy";
    }

}

async function AuthorizeUser(token){
    try {
        const decoded_token = jwt.verify(token,process.env.login_secret_key);
        if(decoded_token){
            const email = decoded_token.email;
            const auth = await client.get(`key-${email}`);
            if(auth){
                const data = JSON.parse(auth);
                return data;
            } else{
                const data = User.findOne({email:email});
                return data;
            }
        }
        return false;
        
    } catch (error) {
console.log(error);
    }
}
module.exports = {CheckUser,AuthenticateUser,AuthorizeUser};