const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
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
router.post("/", [auth, [
    check("name", "Name is required").notEmpty()
]] , async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).json({errors: error.array()})
    }
    //check if account can be created
    const {name, email, phone, type} = req.body;
    try {
        const newContact = new Contact({name,email,phone,type,user: req.user.id});
        const contact = await newContact.save();
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }
});

//@route    Put api/contacts/:id
//@desc     Update Contact
//@access   Private
router.put("/:id", auth, async (req, res) => {
    const {name, email, phone, type} = req.body;
    try{
        const contact = {}
        if(name) contact.name = name;
        if(email) contact.email = email;
        if(phone) contact.phone = phone;
        if(type) contact.type = type;

        const old = await Contact.findById(req.params.id);
        if(!old) return res.status(404).json({msg:"Contact Not Found"});
        //make sure contact belongs to this user
        if(old.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg:"Hey you, don't temper others' contacts. That's evil."});
        }

        const newContact = await Contact.findByIdAndUpdate(req.params.id, 
            {$set:contact}, {new:true});
        res.json(newContact);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error")
    }
});

//@route    Delete api/contacts/:id
//@desc     Delete Contact
//@access   Private
router.delete("/:id", (req, res) => {
    res.send("Modify an contact")
});

module.exports = router