const express = require("express")
const mongoose = require("mongoose")
const { NoteModel } = require("../model/NoteModel");
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

noteRouter.use(express.json());

// before any thing doin inside the notes we just need to verify that user is valid/ registeed and login or not
// hence we use middleware to do this taks for each and every one

noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find();
        res.json(notes);
    } catch (error) {
        res.json({ "err": error });
        console.log('Something went wrong');
    }
})

noteRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const data = new NoteModel(payload);
        await data.save();
        res.json("Note has been posted")
    } catch (error) {
        res.json({ "err": error });
        console.log('Something went wrong');
    }
});

noteRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const note = await NoteModel.findOne({_id:id});             // personal unique id of the notes
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;
    try {
        if(userID_in_note != userID_making_req) {
            res.json("You are not authorized");
        }
        else {
            await NoteModel.findByIdAndUpdate({_id : id},data);
            res.json("Updated the Note successfully");
        }
    } catch (error) {
        res.json({ "err": error });
        console.log('Something went wrong');
    }
})

noteRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const note = await NoteModel.findOne({_id:id});             // personal unique id of the notes
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;
    try {
        if(userID_in_note != userID_making_req) {
            res.json("You are not authorized");
        }
        else {
            await NoteModel.findByIdAndDelete({_id : id});
            res.json("Deleted the Note successfully");
        }
    } catch (error) {
        res.json({ "err": error });
        console.log('Something went wrong');
    }
})

module.exports = {
    noteRouter
}