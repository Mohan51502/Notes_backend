const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();



const redisClient = () =>{
return redis.createClient()
}

const client = redisClient()
client.on("error",(err) =>{
    console.log(err)
})

client.on("Connect",() =>{
    console.log("Connected to redis")
})

client.on("end",() =>{
    console.log("Redis connection ended")
})

client.on("SIGQUIT",() =>{
client.quit()
})

module.exports = client;