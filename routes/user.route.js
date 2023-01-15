const express = require("express")
const mongoose = require("mongoose")
const userRouter = express.Router();
const { UserModel } = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

userRouter.use(express.json());

userRouter.get("/", (req, res) => {
    res.json("Home Page");
})

userRouter.post("/register", async (req, res) => {

    const { email, pass, name, age } = req.body;              // destructuring the object that we are jsoning
    try {
        const isPresent = await UserModel.findOne({ email }); // checking whether is this email already registerd ? or not 
        if (isPresent) {
            res.json("User Email is already registered You can directly login");
        } else {
            bcrypt.hash(pass, Number(process.env.saltRounds), async (err, encryptedPass) => {      // hashing the password (keeping the salRounds into the env file so that it can be more secured)
                if (err) {
                    res.json(err);
                }
                else {
                    const user = new UserModel({ email, pass: encryptedPass, name, age });
                    await user.save();
                    res.json("Registration successfull");
                }
            })
        }
    } catch (error) {
        res.json({ "err": error });
        console.log("Something went wrong");
    }
})

userRouter.post("/login", async (req, res) => {
    const {email,pass} = req.body;
    try {
        const  isPresent = await UserModel.findOne({email});    // checking is this mail id is registered or not
        if(isPresent) {                                         // if user is registered then decrypt the password and generate the token so that he can able to login
            const hashedPassword = isPresent.pass;
            bcrypt.compare(pass,hashedPassword,(err,result)=>{
                if(result) {

                  /*--------------------------------------------------------------------------------------------------------------------------------- */  
                    // const token = jwt.sign({makingNote : 'backend'},'raj',{expiresIn : '1h'});     // creating token for verification 

                    // here the {makingNote : 'backend'} is a randome string so intead of passing this we can pass our userID so that it can be used while
                    // doing anything with the node basically we are developing the Relationship between the usercollection and notesCollection so that we have
                    // if we have to work with any note we could be able to verify the user is valid or not 
                  /*--------------------------------------------------------------------------------------------------------------------------------- */  
                    
                    const token = jwt.sign({userID : isPresent._id, name : isPresent.name},'raj',{expiresIn : '1h'});     // creating token for verification 
                    res.json({"msg" : "Login successfull", "token" : token});
                }
                else {
                    res.json("Wrong password");
                }
            })
        }
        else {
            res.json("Wrong email or Your account doesn't exist Please register first")
        }
    } catch (error) {
        res.json({ "err": error });
        console.log("Something went wrong");
    }
})

module.exports = {
    userRouter
}