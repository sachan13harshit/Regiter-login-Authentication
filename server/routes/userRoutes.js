const express = require("express");
const User = require("../models/userModel");

const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const userExists = await User.findOne({email:req.body.email});

        if(userExists){
            return res.send({
                success : false,
                message : "User Already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
       const hashedPassword =  await bcrypt.hash(req.body.password , salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json('User Created');
    }
    catch(error){
        res.json(error);
    }
});
router.post("/login", async (req, res) => {
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.send({
            success : false,
            message : "User not found"
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.send({
            success : false,
            message : "Invalid Password"
        })
    }
    res.send({
        success : true,
        message : "User Logged In"
    })
  
});


module.exports = router;