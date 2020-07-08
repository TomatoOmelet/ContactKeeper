const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require("../middleware/auth");

const User = require("../models/User");
const Contact = require("../models/Contact");

//@route    Get api/contacts
//@desc     Get all user's contacts
//@access   Private
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date:-1});
        res.json(contacts);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }
});

//@route    Post api/contacts
//@desc     Add new contacts
//@access   Private
router.post("/", (req, res) => {
    res.send("Add an contact")
});

//@route    Put api/contacts/:id
//@desc     Update Contact
//@access   Private
router.put("/:id", (req, res) => {
    res.send("Modify an contact")
});

//@route    Delete api/contacts/:id
//@desc     Delete Contact
//@access   Private
router.delete("/:id", (req, res) => {
    res.send("Modify an contact")
});

module.exports = router