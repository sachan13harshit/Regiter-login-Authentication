const express = require("express");
const User = require("../models/userModel");

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
        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json('User Created');
    }
    catch(error){
        res.json(error);
    }

});

router.post("/login", async (req, res) => {
  
});


module.exports = router;