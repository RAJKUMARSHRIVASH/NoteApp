
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {noteRouter} = require("./routes/notes.route");
const {userRouter} = require("./routes/user.route");
const {connection} = require("./config/db")
require("dotenv").config();
const {authenticate} = require("./middleware/authentication")
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);

// we need to verify the user before creating any notes so we will use the authentication middleware
app.use(authenticate);
app.use("/notes",noteRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log('connected to DB');
    } catch (error) {
        console.log({'something went wrong':error});
    }
    console.log(`server is running in the port ${process.env.port}`);
})


   
// "title" : "Backend",
// "note" : "I have to learn backened now as my frontend is completed",
// "category" : "daily tasks"


// "email" : "shubham@gmail.com",
// "pass" : "shubham"