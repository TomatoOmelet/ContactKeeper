const express = require("express");
const router = express.Router();

//@route    Get api/auth
//@desc     Get logged in user
//@access   Private
router.get("/", (req, res) => {
    res.send("Get logged in user")
});

//@route    Post api/auth
//@desc     Auth a user and get token
//@access   Public
router.post("/", (req, res) => {
    res.send("Log in")
});


module.exports = router