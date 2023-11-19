const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        name :{
            type: String,
            required : true,
        },
        email :{
            type: String,
            required : true,
            unique:true,
        },
        password:{
            type: String,
            required : true,
        },
        joinedon:{
            type:Date,
            default:Date.now()
        },
        forgotPassword:{
            time:Date,
            otp:String,
        },
        token :{
            type: String,
        }
    },
    {
        collection:"User"
    }
);

module.exports = mongoose.model("User",userSchema);