const express = require("express");
const connectdb = require("./db");
const cors = require("cors")
const app = express();
const port = 4000;
connectdb();
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const homeRoughter = require("./routes/home");
const notesrouter = require("./routes/notes")
app.use(express.json());
app.use(cors({origin:"*"}));

app.get("/" ,(req,res) =>{
    res.send("hello world");
});

app.get("/all" ,(req,res) =>{
    res.send("All is Well");
});

app.use("/signup",signupRouter);
app.use("/login",loginRouter);
app.use("/home",homeRoughter);
app.use("/notes",notesrouter);

app.listen(port,() =>{
    console.log(`Server Started on port ${port}`);
});