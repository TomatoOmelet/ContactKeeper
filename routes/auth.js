const express = require("express");
const router = express.Router();
const { validationResult, check } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User")

//@route    Get api/auth
//@desc     Get logged in user
//@access   Private
router.get("/", (req, res) => {
    res.send("Get logged in user")
});

//@route    Post api/auth
//@desc     Auth a user and get token
//@access   Public
router.post("/", [
    check("email", "Email account is not a valid email").isEmail(),
    check("password", "Password cannot be empty").exists()
], async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).json({errors: error.array()})
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Account does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({msg:"Password does not match with the account"})
        }

        const payload = {
            user:{id: user.id}
        }
        jwt.sign(payload, config.get("jwtSecret"), {expiresIn:3600}, (err, token) => {
            if(err) throw err;
            res.json({token});
        })
    } catch(error){
        console.error(error.message);
        res.status(500).send("Server error")
    }
});


module.exports = router