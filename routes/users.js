const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const user = require("../models/User")

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post("/", [
    body("name", "Name is required").notEmpty(),
    body("email", "Email is not valid").isEmail(),
    body("password", "Password needs to have 6 or more characters").isLength({min:6})
],(req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).json({errors: error.array()})
    }
    res.send("passed")
});

module.exports = router