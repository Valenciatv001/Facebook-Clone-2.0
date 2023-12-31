const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require('bcrypt')

//REGISTER
router.post("/register", async (req,res)=>{

    try{
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        // save user and return responsed
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        const statusCode = err.statusCode || 500;
        const statusMessage = err.message || "An unexpected error occurred";

        // Log the error
        console.log(err);

        // Return an error response
        res.status(statusCode).json({
            message: statusMessage
        });
    }
}); 

// LOGIN
router.post("/login", async(req, res)=>{
    try{
        // check if email or username is valid
        const user =  await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found")

        // check if password is valid
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        // check if both mail and password valid then return user
        res.status(200).json(user)
    } catch(err) {
        const statusCode = err.statusCode || 500;
        const statusMessage = err.message || "An unexpected error occurred";

        // Log the error
        console.log(err);

        // Return an error response
        res.status(statusCode).json({
            message: statusMessage
        });
    }

})

module.exports = router;
