const express = require("express")
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {type : String, required : true},
    age : Number,
    email : {type : String, required : true},
    pass : {type : String, required : true}
})

const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}