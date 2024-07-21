const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");


const bcrypt= require('bcrypt')//bcrypt or bcryptjs
const jwt = require('jsonwebtoken');
const jwtSecret = "mynameIsRamanMakingamernproject$%"



router.post(
  "/createuser",
  [
    body("email").isEmail(),
    //password must be 8chars
    body("password", "Incorrect Password ").isLength({ min: 8 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password,salt)

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//To find the user from DataBase if already exist
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    //password must be 8chars
    body("password", "Incorrect Password ").isLength({ min: 8 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try Loggin with Correct Credentials" });
      }
      const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try Loggin with Correct Credentials" });
      }
      //if comparison is true send a authorisation token to user
      const data = {
        user:{
          id:userData.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret) //to authorise and give a token-> First parameter
      // is data and second is the blue one signature
      return res.join({ success: true,authToken:authToken })``;
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
