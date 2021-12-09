const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "Surumerababuhai";
let success =false;

//Route 1: create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //Check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPas = await bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPas,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
       success =true
      res.json({ success,authToken });
      
    } catch (error) {
      console.log(error.message);
      success = false
      res.status(500).send(success, "Some error occured");
    }
  }
);

//Route 2: Authenticate a User: POST "api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
    
  ],
   async (req, res) => {
    //If there are error return bad request and the error
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success =false
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "Sorry User doesn't exist" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        
        return res.status(400).json({ success, error: "Sorry Password doesn't exist" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      success = false
      res.status(500).send(success,"Internal Server error occured");
    }
  }
);

//Route 3: Get loged in  User details: POST "api/auth/getuser". login  required
router.post(
  "/getuser",fetchuser, async (req, res) => {
try{
  let userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)

}catch(error){
  console.log(error.message);
  res.status(500).send(success, "Internal Serverrr error occured");
}
});

module.exports = router; 
