const User = require("../models/User");
const {sendMail} = require("./SendMail");
const bcrypt = require("bcrypt");
const  jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const verifyUser = require("../models/verifyUser");
dotenv.config();








async function InsertVerifyUser(name,email,password){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        const token = generatetoken(email);
        const newUser = new verifyUser({
            name:name,
            email:email,
            password:hashedpassword,
            token:token
        })


        const activationLink = `https://glittering-fairy-e558b7.netlify.app/signup/${token}`;
        const content =`<h4>Hi,There</h4>
        <h5>Welcome to the app</h5><p>Thank you for Signing up.Click on the below link to activate your account</p>
        <a href="${activationLink}">Click here</a>
        <p>Regards</p>
        <p>Team</p>`

        await newUser.save();
        sendMail(email,"VerifyUser",content);

        
    } catch (error) {
        console.log(error);
        
    }
}

function generatetoken(email){
    const token = jwt.sign(email,process.env.Secret_key);
    return token;
}

async function InsertSignUpUser(token){
   try {
    const userVerify = await verifyUser.findOne({token:token});
    if(userVerify){
        const newUser = new User({
            name:userVerify.name,
            email:userVerify.email,
            password:userVerify.password,
            forgotPassword:{}
        });
        await newUser.save();
        await userVerify.deleteOne({token:token});
        const content = `<h4>Registeration Successful</h4>
        <h5>Welcome to the app</h5>
       <p>You are Successfully registered</p>
        <p>Regards</p>
        <p>Team</p>`;
        sendMail(newUser.email,"Registeration Successful",content);
        return `<h4>Hi,There</h4>
        <h5>Welcome to the app</h5>
       <p>You are Successfully registered</p>
        <p>Regards</p>
        <p>Team</p>`;
    }
    return `<h4>Registeration failed</h4>
   <p>Link expired...............</p>
    <p>Regards</p>
    <p>Team</p>`;
    
   } catch (error) {
    console.log(error)
    return `
    <html>
    <body>
    <h4>Registeration failed</h4>
    <p>Link expired...............</p>
     <p>Regards</p>
     <p>Team</p>
     </body>
     </html>`;
    
   }

}

module.exports = {InsertVerifyUser,InsertSignUpUser};