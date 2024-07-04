const express = require("express");
const user = require("../models/userModel");
const { generateToken, jwtMiddleWare } = require("../jwt");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password Does not Match" });
    }

    const userExists = await user.findOne({ userName });

    if (userExists) {
      return res.status(400).json({ error: "UserName already exists" });
    }

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new user({
      fullname: fullName,
      username: userName,
      password: password,
      gender: gender,
      profilePic: gender === "male" ? boyProfile : girlProfile,
    });

    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error in Signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const userInDb = await user.findOne({ username });

    if (!userInDb) {
      res.status(401).json({ error: "Invalid User" });
    } else {
      const passwordMatch = await userInDb.comparePassword(password);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid Password" });
      } else {
        generateToken(userInDb._id, res);
        res.status(200).json(userInDb);
      }
    }
  } catch (error) {
    console.log("Error in Login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  try{
    res.cookie('jwt','',{
      maxAge:0
    });
    res.status(200).json({message:"Logged Out Successfully"})
  }catch(error){
    console.log("Error in Logout", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/',jwtMiddleWare,async(req,res)=>{
  try{
    const loggedInUser = req.user.userId;
    // this is for rest of the users not including ourself
    const allusers = await user.find({_id : {$ne : loggedInUser}});
    // This is Inclusing Ourself
    // const allusers = await user.find();

    res.status(200).json(allusers);

  }catch(err){
    console.log("Error in Fetching Users", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
