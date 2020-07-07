const express = require("express");
const router = express.Router();

//@route    Get api/contacts
//@desc     Get all user's contacts
//@access   Private
router.get("/", (req, res) => {
    res.send("Get all contacts")
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