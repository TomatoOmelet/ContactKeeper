const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User")

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post("/", [
    body("name", "Name is required").notEmpty(),
    body("email", "Email is not valid").isEmail(),
    body("password", "Password needs to have 6 or more characters").isLength({min:6})
], async(req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).json({errors: error.array()})
    }
    //check if account can be created
    const {name, email, password} = req.body

    try{
        //check if email already being used
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg:email + " is already being used."});
        }
        //create new user
        user = new User({
            name, email, password
        })

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        
        //send token to user
        const payload = {
            user:{id: user.id}
        }
        jwt.sign(payload, config.get("jwtSecret"), {expiresIn:3600}, (err, token) => {
            if(err) throw err;
            res.json({token});
        })
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server error")
    }

});



module.exports = router